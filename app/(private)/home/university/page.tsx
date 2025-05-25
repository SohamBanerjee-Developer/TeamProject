"use client"

import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import List from "@/app/_components/List";
import UniversityCard from "@/app/_components/Home/UniversityCard";
import {IUniversity} from "@/app/_lib/models/University";
import Loading from "@/app/_components/Loading";


const Universities = () => {
    const [{page, limit}, setState] = useState<{ page: number, limit: number }>({page: 1, limit: 5});
    const [universities, setUniversities] = useState<IUniversity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const abort = new AbortController();

        async function fetchData() {
            setLoading(true);
            try {

 
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/university/getalluniversities?page=${page}&limit=${limit}`, {signal: abort.signal});


                const resData = await res.json();

                if (!resData.flag) {
                    toast.error(resData.message);
                    setUniversities([]);
                    return
                }

                setUniversities(resData.data.universities);
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
        <div className="h-full w-full relative overflow-x-hidden p-8 md:p-12 lg:flex lg:items-center lg:justify-center">

            <div className="hero flex-column gap-2  lg:w-1/2 relative">
                <div
                    className="absolute bottom-0 left-1/2 z-10 h-16 w-2/3 -translate-x-1/2  flex justify-between items-center px-4 rounded-md capitalize header-font font-medium backdrop-blur-md">
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
                    </div> : <List data={universities}
                                   className="w-full overflow-x-hidden overflow-y-scroll flex-column gap-5 scrollbar-hide"
                                   render={(item) => <UniversityCard university={item} key={item.governmentId}/>}/>
                }
            </div>
        </div>
    )
}
export default Universities
