import React from 'react'
import Link from "next/link";
import Search from "@/app/_components/Home/Search";

const Hero = () => {
    return (
        <section className="bg-blue-50 py-20 text-center text-black">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
                    Find PGs, Hotels & Student Communities Nearby
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                    Your trusted student housing and travel companion — all in one place.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center max-w-2xl mx-auto mb-6">
                    <Search/>
                </div>
                <Link href="/home/university" className="text-blue-700 font-semibold underline hover:text-blue-900">
                    Or browse all listings
                </Link>
            </div>
        </section>
    )
}
export default Hero
