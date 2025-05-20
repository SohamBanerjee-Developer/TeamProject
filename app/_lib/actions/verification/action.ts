"use server"

import {getToken} from "@/app/_utils/helper";


export const verifyUser =  async (data:  { otp: string}):Promise<void> => {
    const id = await getToken();
    const res  = await fetch("https://team-project-livid.vercel.app/api/auth/user/verify",{
        method: "POST",
        body: JSON.stringify({
            otp: data.otp,
            userId: id,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const resData = await res.json();

    if (!resData.flag) {
        throw new Error(resData.message);
    }
}

export const resendOtp = async ():Promise<void> => {
    const id = await getToken();
    const res  = await fetch("https://team-project-livid.vercel.app/api/auth/user/resendotp",{
        method: "POST",
        body: JSON.stringify({
            userId: id,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const resData = await res.json();

    if (!resData.flag) {
        throw new Error(resData.message);
    }

}