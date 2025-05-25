import React from 'react'
import Link from "next/link";
import {IUniversity} from "@/app/_lib/models/University";
import Image from "next/image";

const SearchCard = ({item}: { item: IUniversity }) => {
    return (
        <Link href={`/home/university/${item._id}`}>
            <div
                className="h-48 w-full rounded-md bg-white shadow-md mb-4 flex overflow-hidden cursor-pointer transition hover:shadow-lg">
                <div className="h-full w-1/3 relative">
                    <Image
                        src={item.coverImage}
                        alt={`${item.name} cover`}
                        className=" object-cover"
                        fill
                    />
                </div>
                <div
                    className="p-4 flex flex-col justify-between w-2/3 h-full overflow-x-hidden overflow-y-scroll scrollbar-hide">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                        <p className="text-sm text-gray-500 mb-1">{item.location}</p>
                        <p className="text-gray-700 text-sm line-clamp-3">{item.description}</p>
                    </div>
                    <div className="mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Affiliated by: {item.afflitatedBy}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchCard;
