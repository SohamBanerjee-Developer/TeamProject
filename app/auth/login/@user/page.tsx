"use client"

import React from 'react'
import FormDiv from "@/app/_components/FormDiv";
import Input from "@/app/_components/Input";
import Lable from "@/app/_components/Lable";
import Error from "@/app/_components/Error";
import Link from "next/link";

const Page = () => {
    return (
        <div className=" relative h-full w-full flex items-center justify-center">
            <div className="w-full max-w-md bg-gray-800 py-3 px-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center  header-font base-tex mb-2t">Login to User Account</h2>
                <form className="relative w-full space-y-2">
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Email or username:"/>
                        <div className="w-full">
                            <Input className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font" type="text"/>
                            <Error className="text-red-500 header-font text-sm font-[700] mt-1" message="Invalid email or password"/>
                        </div>
                    </FormDiv>
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Password:"/>
                        <div className="w-full">
                            <Input className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font" type="text" />
                            <Error className="text-red-500 header-font text-sm font-[700] mt-1" message="Invalid  password"/>
                        </div>
                        <Link href="#" className="text-orange-400 hover:underline">Forgot password?</Link>
                    </FormDiv>
                </form>
                <p className="mt-6 text-center text-sm text-gray-200">
                    Don’t have an account? <Link href="#" className="text-blue-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>

    )
}
export default Page
