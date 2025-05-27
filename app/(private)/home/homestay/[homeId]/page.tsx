
import React from 'react'
import {redirect} from "next/navigation";
import {toast} from "react-toastify";
import Image from "next/image";
import badeg from "@/public/badge.png";
import UpvoteButton from "@/app/_components/Upvote";
import {HomeStayItem} from "@/app/(private)/home/homestay/page";
import Edit from "@/app/_components/Home/HomeStay/Edit";
import Review from "@/app/_components/Home/HomeStay/Review";


export async function generateStaticParams() {
    const res = await fetch(`https://team-project-xi-two.vercel.app/api/homestay/public/genstaticprop`);

    const resData = await res.json();

    return resData.data.Homestays.map((home: HomeStayItem) => ({
        homeId: String(home._id),
    }));
}

const Page = async ({params}: { params: Promise<{homeId: string }>}) => {
    const {homeId} = await params;
    const res = await fetch(`http://localhost:3000/api/homestay/public/getPostbyId?identifier=${encodeURIComponent(homeId)}`);

    if (!res.ok) {
      redirect('/auth/login');
    }

    const {data, flag, message, totalUpvote} = await res.json();

    if (!flag) {
        toast.error(message);
        redirect("/home/homestay")
    }



    return (
        <main className="max-w-3xl mx-auto p-4 md:p-8  shadow-lg rounded-lg my-8 relative">
            <Edit item={data}/>
            {/* Thumbnail and Title */}
            <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                <div className="relative w-full md:w-64 h-48 max-h-[200px] max-w-[200px] rounded-lg shadow overflow-hidden">
                    <Image
                        src={data.thumbnail.url}
                        alt={data.title}
                        fill
                        style={{ objectFit: 'cover' }} // maintain aspect ratio and cover container
                        priority // optional: for better loading if important image
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{data.title}</h1>
                    <p className="text-gray-600 mb-2">{data.caption}</p>
                    <UpvoteButton
                        count={totalUpvote}
                    />
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <span className="font-semibold">Rent Per Head:</span> ₹{data.rent}
                </div>
                <div>
                    <span className="font-semibold">Max Rooms:</span> {data.maxRoom}
                </div>
                <div>
                    <span className="font-semibold">Location:</span> {data.location}
                </div>
                <div>
                    <span className="font-semibold">University:</span> {data.university.name}
                </div>
            </div>

            {/* Description */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">Details</h2>
                <p className="text-gray-400 description-font font-bold ">{data.details}</p>
            </div>

            {/* Owner Info */}
            <div className="mb-6  border-2 border-gray-400 rounded-md p-4 relative">
                <h3 className="font-semibold mb-1">Owner Information</h3>
                <div className="base-text">
                    <div>
                        <span className="font-semibold header-font">Name:</span> {data.owner.fullName}
                    </div>
                    <div>
                        <span className="font-semibold header-font">Phone:</span> {data.owner.phoneNumber}
                    </div>
                    <div>
                        <span className="font-semibold header-font">Email:</span> {data.owner.email}
                    </div>
                    <div className="absolute top-2 right-6 z-10 h-8 w-8 overflow-hidden">
                        <Image
                            src={badeg}
                            alt="verified"
                            className="w-full h-40 sm:h-32 md:h-28 object-cover relative"
                            fill
                        />
                    </div>
                </div>
            </div>
            <Review review={data.review}/>
        </main>
    );
}
export default Page
