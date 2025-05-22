import React from 'react'
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="h-full w-full dark-bg flex-center">
            <div className="w-full flex-column ">
                <h1>404 | NOT FOUND | RETURN TO</h1>
                <Link href="/home">Home</Link>
            </div>
        </div>
    )
}
export default NotFound
