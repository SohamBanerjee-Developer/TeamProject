'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-red-600">{error.message}</h1>
            <button
                onClick={() => reset()}
                className="mt-4 bg-orange-600 text-white px-5 py-2 rounded-md"
            >
                Retry
            </button>
        </div>
    )
}
