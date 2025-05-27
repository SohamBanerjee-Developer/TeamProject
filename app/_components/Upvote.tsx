'use client';

export  default function UpvoteButton({ count=0 }: {count:number}) {

    return (
        <button

            className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold transition w-10"
        >
            <svg width="20" height="20" fill="currentColor" className="inline">
                <path d="M10 2l4 8h-3v8h-2v-8H6l4-8z" />
            </svg>
            <span>{count}</span>
        </button>
    );
}