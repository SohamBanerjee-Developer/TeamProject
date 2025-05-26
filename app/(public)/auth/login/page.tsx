"use client"

import React from 'react'
import FormDiv from "@/app/_components/FormDiv";
import Input from "@/app/_components/Input";
import Lable from "@/app/_components/Lable";

import Link from "next/link";
import FormButton from "@/app/_components/FormButton";
import {userLogin} from "@/app/_lib/actions/Authentication/action";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useAuthSeesion} from "@/app/_components/context/AuthSession";


const Page = () => {
   const router = useRouter();
   const {dispatch} = useAuthSeesion();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        const getRes = await userLogin(data);
        
        if (getRes?.error) {
          toast.error(getRes.error);
          return;
        }
        dispatch({type: "SET_AUTHENTICATED", payload: true});
        router.push("/")
    }

    return (
        <div className=" relative h-full w-full flex-center">
            <div className="w-full max-w-md bg-gray-800 py-3 px-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center  header-font base-tex mb-2t">Login to User Account</h2>
                <form className="relative w-full space-y-1" onSubmit={handleSubmit}>
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Email or username:"/>
                        <div className="w-full">
                            <Input
                                className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                                type="text" name="identifier" id="identifier"/>

                        </div>
                    </FormDiv>
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Password:"/>
                        <div className="w-full">
                            <Input
                                className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                                type="password" name="password" id="password"/>

                        </div>
                        <Link href="#" className="text-orange-400 hover:underline">Forgot password?</Link>
                    </FormDiv>
                    <FormButton
                        className="py-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl cursor-pointer transition duration-150"/>
                </form>
                <p className="mt-6 text-center text-sm text-gray-200">
                    Don’t have an account? <Link href="#" className="text-blue-600 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    )
}
export default Page
