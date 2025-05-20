"use client"

import React from 'react'
import FormDiv from "@/app/_components/FormDiv";
import Lable from "@/app/_components/Lable";
import Input from "@/app/_components/Input";
import Link from "next/link";
import FormButton from "@/app/_components/FormButton";
import {userSignup} from "@/app/_lib/actions/Authentication/action";

const Page = () => {
    return (
        <div className="h-full flex-center bg-[#0B192C] text-[#FFFDF6] px-5">
            <div className="max-w-xl w-full space-y-6  bg-gray-800 py-3 px-6 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>

                <form className="space-y-2" action={ userSignup}>
                    {/* Full Name */}
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Full Name:"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="text" id="fullName"
                            name="fullName"
                            required/>
                    </FormDiv>
                    {/* Phone Number */}
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Phone Number:"/>
                        <Input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                        />
                    </FormDiv>

                    {/* Aadhar Card */}
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Addhar Card Number:"/>
                        <Input
                            type="text"
                            id="addharCard"
                            name="addharCard"
                            required
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                        />
                    </FormDiv>

                    {/* Email */}
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Email"/>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                        />
                    </FormDiv>
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Password"/>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                        />
                    </FormDiv>
                    {/* Address */}
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Address"/>
                        <textarea
                            id="address"
                            name="address"
                            rows={4}
                            required
                            className="w-full px-4 py-2 rounded-md bg-transparent border border-[#FFFDF6]/40 focus:outline-none focus:ring-2 focus:ring-[#FFFDF6]/70 resize-none"
                        ></textarea>
                    </FormDiv>
                    {/*move back to user signup*/}
                    <p className="font-medium description-font">Want to create host account? <Link href="/auth/signup/host" className="header-font text-blue-500"> Host</Link></p>
                    {/* Submit Button */}
                    <FormButton
                        className="py-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl cursor-pointer transition duration-150"/>
                </form>
            </div>
        </div>
    )
}
export default Page
