import React from 'react'
import Link from "next/link";

const MobileNav = () => {
    return (
        <div className="h-full w-full relative bg-[#0B124C] flex-between
        px-5">
            <div className="relative h-full flex-center">
                <h1 className="text-5xl header-font font-bold">SENV</h1>
            </div>
            <div className="relative h-full flex-center">
                <Link href="/login">login</Link>
            </div>
        </div>
    )
}
export default MobileNav
