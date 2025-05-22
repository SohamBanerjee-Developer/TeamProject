import React from 'react'
import Link from "next/link";

const Hero = () => {
    return (
        <section className="bg-blue-50 py-20 text-center">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
                    Find PGs, Hotels & Student Communities Nearby
                </h1>
                <p className="text-gray-700 text-lg mb-6">
                    Your trusted student housing and travel companion — all in one place.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center max-w-2xl mx-auto mb-6">
                    <input
                        type="text"
                        placeholder="Enter city, area, or landmark..."
                        className="w-full sm:flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition">
                        Search
                    </button>
                </div>
                <Link href="/pg-hotel" className="text-blue-700 font-semibold underline hover:text-blue-900">
                    Or browse all listings
                </Link>
            </div>
        </section>
    )
}
export default Hero
