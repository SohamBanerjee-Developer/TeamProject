import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import badeg from "@/public/badge.png"

// If using TypeScript, define the prop type:
type HomeStayItem = {
    _id: string;
    tittle: string;
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
};

interface HomeStayCardProps {
    item: HomeStayItem;
}

const HomeStayCard: React.FC<HomeStayCardProps> = ({item}) => {

    return (
        <Link href={`/home/homestay/${item._id}`} className="block">
            <div className="w-full relative overflow-hidden border-2 border-gray-600 rounded-lg py-6 px-4 bg-gray-800  flex flex-col gap-5 cursor-pointer transition-shadow hover:shadow-xl">
                {item.ownerVerified && (
                    <div className="absolute top-5 right-[4.8] z-10 h-8 w-8 overflow-hidden">
                        <Image
                            src={badeg}
                            alt="verified"
                            className="w-full h-40 sm:h-32 md:h-28 object-cover relative"
                            fill
                        />
                    </div>
                )}
                <div className="relative max-h-[15rem] sm:max-h-[13rem] md:max-h-[12rem] w-full overflow-hidden p-2 border-2 border-gray-600 rounded-lg">
                    <Image
                        src={item.thumbnail.url}
                        alt={item.tittle}
                        className="w-full h-32 sm:h-24 md:h-20 object-cover relative"
                        width={400}
                        height={300}
                        priority
                    />
                </div>
                <div className="p-2 sm:p-2 md:p-3 text-gray-300">
                    <h3 className="text-xl sm:text-lg md:text-base underline font-[700]">{item.tittle}</h3>
                    <p className="font-medium mb-1 sm:mb-1 text-sm sm:text-xs">{item.caption}</p>
                    <p className="font-medium mb-1 sm:mb-1 text-sm sm:text-xs">{item.university}</p>
                    <p className="text-lg sm:text-base md:text-sm font-bold text-blue-400 mb-2">₹{item.rent}/month</p>
                    <p className="text-sm font-bold mb-2">Owner: {item.ownername}</p>
                    <div className="flex items-center justify-center mt-2 text-yellow-400 bg-gray-700 h-8 w-8 rounded-full text-sm sm:text-xs">
                        <span>▲</span>
                        <span className="ml-1">{item.upvoteCount}</span>
                    </div>
                </div>
            </div>
        </Link>

    );
};

export default HomeStayCard;
