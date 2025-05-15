import React from 'react'
import {IShowcae} from "@/app/_utils";

const Card = ({data} :{data:IShowcae}) => {
    return (
        <div className="w-full relative overflow-hidden  border-2 border-gray-600 rounded-lg py-8 px-5 bg-gray-800 flex flex-col gap-7">
            <h1 className="header-font text-2xl underline font-[700]">
                {data.heading}
            </h1>
            <h2 className="description-font text-lg font-bold">
                {
                    data.description
                }
            </h2>
        </div>
    )
}
export default Card
