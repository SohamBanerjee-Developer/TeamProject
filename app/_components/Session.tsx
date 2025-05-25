"use client"

import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {getCookie} from "cookies-next/client";

const Session =  () => {
    const [session, setSession] = useState<boolean>(false)

    return (
        <div className="relative">
            <Link
                href="/login.html"
                className="block py-2 md:py-1 bg-white text-blue-900 font-semibold px-4 rounded-md hover:bg-blue-100 transition md:ml-5 w-40 my-2 md:my-0 text-center"
            >
                Login
            </Link>
        </div>
    )
}
export default Session
