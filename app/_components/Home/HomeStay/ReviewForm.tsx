'use client'

import { useState } from 'react'
import FormButton from "@/app/_components/FormButton";

interface ReviewFormProps {
    setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReviewForm({ setOpenForm }: ReviewFormProps) {
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Message:', message)

    }

    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* The overlay covers the whole parent */}
            <div className="w-full max-w-md mx-4 p-6 bg-white rounded-2xl shadow-md relative">
                <h2 className="text-xl font-semibold mb-4 text-center text-black">Submit Feedback</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-slate-700"
                            rows={4}
                            placeholder="Enter your message here"
                            required
                        />
                    </div>

                    <FormButton
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    />
                </form>

                <button
                    type="button"
                    onClick={() => setOpenForm(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none text-2xl leading-none cursor-pointer"
                    aria-label="Close form"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}
