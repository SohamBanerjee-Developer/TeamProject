'use client'

import {startTransition, useEffect} from 'react'
import {useRouter} from "next/navigation";


export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])
    const router = useRouter();

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-red-600">Something Wents Wrong here</h1>
            <button
                onClick={
                    () => {
                        startTransition(() => {
                            router.refresh();
                            reset();
                        })
                    }
                }
                className="mt-4 bg-orange-600 text-white px-5 py-2 rounded-md"
            >
               Try Again
            </button>
        </div>
    )
}
