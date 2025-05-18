import React from 'react'
import  Link from "next/link"

const Signup = () => {
    return (
        <div className="w-full h-full flex-center relative px-5 flex-center">
            <div className="space-y-3 w-full md:w-1/2  relative text-center font-bold capitalize">
                <h1 className="text-4xl  header-font">Create your account</h1>
                <p className="text-2xl font-bold">As A </p>
                <div className="relative flex-between px-12 text-xl ">
                    <Link href="/auth/signup/host" className="px-5   py-2 bg-blue-400 hover:bg-blue-500 transition rounded-lg">Host</Link>
                    <Link href="/auth/signup/user" className="px-5   py-2 bg-green-400 hover:bg-green-500 transition rounded-lg">User</Link>
                </div>
            </div>
        </div>
    )
}
export default Signup
