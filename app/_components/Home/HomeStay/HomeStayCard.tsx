import React from 'react'
import Link from 'next/link'
import Image from "next/image";

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
};

interface HomeStayCardProps {
    item: HomeStayItem;
}

const HomeStayCard: React.FC<HomeStayCardProps> = ({item}) => {
    return (
        <Link href={`/homestay/${item._id}`} className="block">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer">
                <div className="w-full h-48 object-cover">
                    <Image
                        src={item.thumbnail.url}
                        alt={item.tittle}
                        fill
                    />
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{item.tittle}</h3>
                    <p className="text-sm text-gray-600 mb-1">{item.caption}</p>
                    <p className="text-sm text-gray-600 mb-1">{item.university}</p>
                    <p className="text-sm text-blue-700 font-semibold mb-2">₹{item.rent}/month</p>
                    <p className="text-xs text-gray-500">Owner: {item.ownername}</p>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500">▲</span>
                        <span className="text-sm">{item.upvoteCount}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default HomeStayCard;
