"use client"

import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import List from "@/app/_components/List";
import UniversityCard from "@/app/_components/Home/UniversityCard";
import {IUniversity} from "@/app/_lib/models/University";
import Loading from "@/app/_components/Loading";


const Universities = () => {
    const [{page, limit}, setState] = useState<{ page: number, limit: number }>({page: 1, limit: 10});
    const [universities, setUniversities] = useState<IUniversity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const abort = new AbortController();

        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch(`https://team-project-xi-two.vercel.app/api/university/getalluniversities?page=${page}&limit=${limit}`, {signal: abort.signal});

                const resData = await res.json();

                if (!resData.flag) {
                    toast.error(resData.message);
                    setUniversities([]);
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
            <div className="hero flex-column gap-2  lg:w-1/2">
                {
                    // ⚠️ fix later
                    loading ? <div className="w-full h-full flex justify-center items-center" onClick={() =>  setState({page: 1, limit: 10})}>
                        <Loading/>
                    </div> : <List data={universities} className="w-full overflow-x-hidden overflow-y-scroll flex-column gap-5 scrollbar-hide"
                                   render={(item) => <UniversityCard university={item} key={item.governmentId}/>}/>
                }
            </div>
        </div>
    )
}
export default Universities
