'use client'

import React, {useState} from 'react';
import Input from "@/app/_components/Input";
import FormButton from "@/app/_components/FormButton";
import {resendOtp, verifyUser} from "@/app/_lib/actions/verification/action";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";


const Verification = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [resendDisabled, setResendDisabled] = useState(false);
    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');


        try {
            await verifyUser({otp: code});
            router.push('/');
        } catch (error: unknown) {
           const err = error as Error;
           toast.error(err.message);
        }
    };

    const handleResendOtp = async () => {
        setResendDisabled(true);

        try {
           await resendOtp();

        } catch (error: unknown) {
            const err = error as Error;
            toast.error(err.message);
        }
        // Re-enable the button after 30 seconds to prevent spamming
        setTimeout(() => setResendDisabled(false), 30000);
    };

    return (
        <div className="h-full flex items-center justify-center bg-[#0B192C] text-[#FFFDF6] px-8">
            <div className="max-w-md w-full space-y-6 text-center">
                <h1 className="text-3xl font-bold">Verify Your Account</h1>
                <p className="text-sm text-[#FFFDF6]/80">Enter the 6-digit code sent to your email</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between gap-2">
                        {otp.map((digit, index) => (
                            <Input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                name={`otp-${index}`}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="w-12 h-14 text-center text-2xl border border-[#FFFDF6]/40 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFFDF6]/70 transition"
                            />
                        ))}
                    </div>

                    <FormButton
                        className="w-full py-3 bg-[#FFFDF6] text-[#0B192C] font-semibold rounded-md hover:bg-opacity-90 transition cursor-pointer"
                    />

                </form>

                {/* Resend OTP button */}
                <button
                    onClick={handleResendOtp}
                    disabled={resendDisabled}
                    className={`mt-4 text-sm underline text-[#FFFDF6]/80 hover:text-[#FFFDF6] transition ${resendDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    Resend OTP
                </button>

            </div>
        </div>
    );
};

export default Verification;
