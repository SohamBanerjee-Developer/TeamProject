'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IUniversity } from "@/app/_lib/models/University";
import vercelSvg from '@/public/vercel.svg'; // Assuming this is your placeholder image

export default function UniversityCard({ university }: { university: IUniversity }) {
    return (
        <Link href={`/home/university/${university._id}`} className="block">
            <div
                className="w-full relative overflow-hidden  border-2 border-gray-600 rounded-lg py-8 px-5 bg-gray-800 flex flex-col gap-7"
            >
                <div className="relative max-h-[15rem] sm:max-h-[18rem] md:max-h-[20rem] w-full overflow-hidden p-2 border-2 border-gray-600 rounded-lg">
                    <Image
                        src={university.coverImage} // Use actual coverImage if available, fallback to vercelSvg
                        alt={university.name}
                        className="w-full h-40 sm:h-48 md:h-52 object-cover relative" // Responsive height for the image
                        width={400} // Add appropriate width and height for Next/Image optimization
                        height={300}
                        priority // Consider adding priority if this image is above the fold
                    />
                </div>
                <div className="p-2 sm:p-3 md:p-4">
                    <h2 className="header-font text-2xl underline font-[700]">{university.name}</h2>
                    <p className="font-medium text-gray-200 mb-1 sm:mb-2">{university.location}</p>
                     <p className="text-[.9rem] sm:text-sm text-gray-300 mb-1 sm:mb-2 line-clamp-2">{university.description}</p>
                    <p className="text-[.9rem] text-gray-300 font-bold">Govt ID: {university.governmentId}</p>
                    <p className="text-[.9rem] text-gray-300 font-bold">Affiliated by: {university.afflitatedBy}</p>
                </div>
            </div>
        </Link>
    );
}