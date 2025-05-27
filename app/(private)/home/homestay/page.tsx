"use client"

import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import Loading from "@/app/_components/Loading";
import List from "@/app/_components/List";
import HomeStayCard from "@/app/_components/Home/HomeStay/HomeStayCard";

export interface HomeStayItem {
    _id: string;
    title: string;
    caption: string;
    thumbnail: {
        url: string;
        publicId: string;
    };
    rent: number;
    university: string;
    ownername: string;
    upvoteCount: number;
    ownerVerified: boolean;
}

const HomeStay = () => {
    const [homeStay, setHomeStay] = useState<HomeStayItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [{page, limit}, setState] = useState<{ page: number, limit: number }>({page: 1, limit: 12});

    useEffect(() => {
        const abort = new AbortController();

        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homestay/public/getallhomeStay?page=${page}&limit=${limit}`, {signal: abort.signal});

                const resData = await res.json();

                if (!resData.flag) {
                    toast.error(resData.message);
                    setHomeStay([]);
                    return
                }

                setHomeStay(resData.data.Homestays);
            } catch (error: unknown) {
                const err = error as Error;
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    toast.error(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        return () => {
            abort.abort()
        }
    }, [page, limit])

    return (
        <div className="w-full h-full relative md:grid md:grid-cols-5 md:grid-rows-5 md:gap-2">
            <div className="hidden md:block bg-red row-span-5"></div>
            <div className="w-full h-full flex flex-col items-center px-5 overflow-hidden md:col-span-4 md:row-span-5 ">
                <div className="w-full relative flex-column py-1">
                    <h1 className="text-4xl font-[700] header-font mb-2">PGs & Hotels</h1>
                </div>
                <div className="h-[calc(100%-36px)] w-full gap-2   relative  pb-7">
                    <div
                        className="absolute bottom-15 left-1/2 z-10 h-16 w-2/3 -translate-x-1/2  flex justify-between items-center px-4 rounded-md capitalize header-font font-medium backdrop-blur-md">
                        <button
                            className="w-1/4 h-10 bg-green-500 hover:bg-green-700 rounded-md cursor-pointer flex items-center justify-center"
                            onClick={() => setState({page: page + 1, limit: limit})}>
                            P+
                        </button>
                        <p className="text-white">curr page: {page}</p>
                        <button
                            className="w-1/4 h-10 bg-red-500 hover:bg-red-700 rounded-md cursor-pointer flex items-center justify-center"
                            onClick={() => {
                                if (page === 1) return;
                                setState({page: page - 1, limit: limit})
                            }
                            }>
                            P-
                        </button>
                    </div>

                    {
                        // ⚠️ fix later
                        loading ? <div className="w-full h-full flex justify-center items-center"
                                       onClick={() => setState({page: 1, limit: 10})}>
                            <Loading/>
                        </div> : <List
                            data={homeStay}
                            className="
    w-full h-full
    overflow-x-hidden overflow-y-scroll
    flex flex-col items-center gap-5
    scrollbar-hide


    md:grid md:grid-cols-3 md:auto-rows-min md:gap-5 md:items-start
  "
                            render={(item) => <HomeStayCard item={item} key={item._id}/>}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
export default HomeStay
