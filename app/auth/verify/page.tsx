'use client'

import React, { useState } from 'react';
import Input from "@/app/_components/Input";

const Verification = () => {

    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let code = '';

        for (const digit of otp) {
            code += digit;
        }
        console.log(code);
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
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="w-12 h-14 text-center text-2xl border border-[#FFFDF6]/40 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-[#FFFDF6]/70 transition"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#FFFDF6] text-[#0B192C] font-semibold rounded-md hover:bg-opacity-90 transition cursor-pointer"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Verification;
