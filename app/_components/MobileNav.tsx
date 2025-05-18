import React from 'react'
import Link from "next/link";

const MobileNav = () => {
    return (
        <div className="h-full w-full relative bg-[#0B124C] flex-between
        px-5">
            <div className="relative h-full flex-center">
                <h1 className="text-5xl header-font font-bold">
                    <Link href="/">SENV</Link>
                </h1>
            </div>
            <div className="relative h-full flex-gap gap-4 text-lg font-bold description-font">
                <Link href="/auth/login" className="hover:text-orange-400 transition duration-150">Login</Link>
                <Link href="/auth/signup" className="hover:text-orange-400 transition duration-150" >Signup</Link>
            </div>
        </div>
    )
}
export default MobileNav
