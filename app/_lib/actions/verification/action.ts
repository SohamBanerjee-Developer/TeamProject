"use server"

import axios from "axios";
import {getToken} from "@/app/_utils/helper";


export const verifyUser =  async (data:  { otp: string}):Promise<void> => {
    try {
       const id = await getToken();
        const res  = await axios({
            method: "POST",
            url:"http://localhost:3000/api/auth/user/verify",
            data: {
                otp: data.otp,
                userId: id
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(res.data)

    }catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data?.message || "Something went wrong");
        } else {
            console.error("Unknown Error:", e);
            throw e;
        }
    }
}

export const resendOtp = async ():Promise<void> => {
    try{
        const id = await getToken();
         await axios({
            method: "POST",
            url:"http://localhost:3000/api/auth/user/resendotp",
            data: {
                userId: id
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
    }catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data?.message || "Something went wrong");
        } else {
            console.error("Unknown Error:", e);
            throw e;
        }
    }
}