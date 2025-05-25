import React from 'react'
import Link from "next/link";
import {cookies} from "next/headers";


const HomeNav = async () => {
    const cookieStore = await cookies();
    const whoIam = cookieStore.get("role")?.value;

    return (
        <nav className="bg-blue-900 text-white h-12">
            <div className="max-w-7xl mx-auto px-4 py-3 flex space-x-8">
                <Link href="/" className="hover:text-blue-300 font-semibold">
                    Home
                </Link>
                <Link href="/home/about" className="hover:text-blue-300 font-semibold">
                    About
                </Link>
                {
                    whoIam === "owner" &&   <Link href="/home/uploadpg" className="hover:text-blue-300 font-semibold">
                        For PG Owners
                    </Link>
                }
                <Link href="/community" className="hover:text-blue-300 font-semibold">
                    Contact Us
                </Link>
            </div>
        </nav>
    )
}
export default HomeNav
