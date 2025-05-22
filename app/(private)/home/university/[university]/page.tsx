import React from 'react'
import Image from "next/image";

type University = {
    _id: string;
    name: string;
    location: string;
    coverImage: string;
    description: string;
    governmentId: string;
    afflitatedBy: string;
};

const Page = async ({params}: { params: Promise<{ university: string }> }) => {

    const {university} = await params;
    const res = await fetch(
        `https://team-project-xi-two.vercel.app/api/university/getuniversitybyid?identifier=${encodeURIComponent(university)}`,
    )

    const resData = await res.json();
    if (!resData.flag) throw new Error(resData.message);
    const resUniversity = resData.data as University;

    return (
        <article
            key={resUniversity._id}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-6 md:flex md:items-center"
        >
            <Image
                src={resUniversity.coverImage}
                alt={`${resUniversity.name} cover`}
                className="w-full h-48 object-cover md:w-64 md:h-full"
                loading="lazy"
            />
            <div className="p-6 md:flex-1">
                <h2 className="text-2xl font-semibold mb-2 text-gray-900">{resUniversity.name}</h2>
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Location:</strong> {resUniversity.location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Government ID:</strong> {resUniversity.governmentId}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                    <strong>Affiliated By:</strong> {resUniversity.afflitatedBy}
                </p>
                <p className="text-gray-700 text-base">{resUniversity.description}</p>
            </div>
        </article>
    )
}
export default Page
