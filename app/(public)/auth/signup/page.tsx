"use client"

import React from 'react'
import FormDiv from "@/app/_components/FormDiv";
import Lable from "@/app/_components/Lable";
import Input from "@/app/_components/Input";
import Link from "next/link";
import FormButton from "@/app/_components/FormButton";
import {userSignup} from "@/app/_lib/actions/Authentication/action";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const Page = () => {

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const getRes = await userSignup(data);

        if (getRes?.error) {
           toast.error(getRes.error);
           return;
        }
        router.push("/auth/login");
    }

    return (
        <div className="h-full flex-center bg-[#0B192C] text-[#FFFDF6] p-5 ">
            <div className="max-w-xl  h-full w-full space-y-6 bg-gray-800 py-3 px-6 rounded-xl shadow-md overflow-x-hidden overflow-y-scroll">
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>

                <form className="space-y-1" onSubmit={handleSubmit}>
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
                        <Lable className="block text-sm font-medium text-gray-200" value="Aadhar Card Number:"/>
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

                    {/* Password */}
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

                    {/* Role Selection */}
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Role"/>
                        <select
                            id="role"
                            name="role"
                            required
                            className="mt-1  block w-full px-4 py-2 border border-gray-300 dark-bg rounded-xl shadow-sm outline-0 text-lg description-font"
                        >
                            <option value="user">User</option>
                            <option value="owner">Owner</option>
                        </select>
                    </FormDiv>

                    {/* Link to host signup */}
                    <p className="font-medium description-font">
                        Want to create host account? <Link href="/app/(public)/auth/signup/host" className="header-font text-blue-500"> Host</Link>
                    </p>

                    {/* Submit Button */}
                    <FormButton
                        className="py-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl cursor-pointer transition duration-150"/>
                </form>
            </div>
        </div>
    )
}

export default Page
