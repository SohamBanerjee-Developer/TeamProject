"use client"

import {useEffect, useState} from "react";
import {IUniversity} from "@/app/_lib/models/University";
import {toast} from "react-toastify";

import List from "@/app/_components/List";
import UniversityCard from "@/app/_components/Home/UniversityCard";
import SearchCard from "@/app/_components/Home/SearchCard";


const Search = () => {

    const [search, setSearch] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IUniversity[]>([]);

    function handelChange(e: React.ChangeEvent<HTMLInputElement>) {
        const currentValue = e.target.value;

        if (currentValue.length < 2) return;
        setSearch(currentValue);
    }

    useEffect(() => {
        if (search.length === 0) return;

        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/university/searchbynameorid?identifier=${encodeURIComponent(search)}`,
                    {signal: controller.signal}
                );
                console.log(res)

                const resData = await res.json();
                if (!resData.flag) throw new Error(resData.message);

                setData(resData.data);
            } catch (error: unknown) {
                const err = error as Error;
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    toast.error(err.message);
                    setData(
                        []);
                }
            } finally {
                setLoading(false);
            }

        }

        fetchData();
        return () => {
            controller.abort();
        }
    }, [search])

    return (
        <div className="w-full flex-column relative overflow-hidden">
            <div className="flex flex-col  items-center gap-4 justify-center max-w-2xl mx-auto mb-6 py-1">
                <input
                    type="text"
                    placeholder="Enter city, area, or landmark..."
                    className="w-full sm:flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handelChange}
                />
                <p>{loading ? "loading..." : "waiting for search"}</p>
            </div>
            <div className="relative w-full p-2 max-h-96 overflow-y-scroll gap-0.5 scrollbar-hide overflow-x-hidden">
                {
                    data.length > 0 && <List data={data} render={(item: IUniversity) => <SearchCard key={item.name} item={item}/>}/>
                }
            </div>
        </div>

    )
}
export default Search
