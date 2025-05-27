"use client";
import Link from "next/link";
import React from "react";

export default function universitynav({ params }: any) {
  return (
    <div className="flex flex-center">
      <div className=" w-2/4 p-2 flex justify-between">
        <Link
          href={{
            pathname: `/home/university/${params}/community`,
          }}
          className="bg-red-600 p-2 rounded-md"
        >
          community
        </Link>
        <Link href="">pg</Link>
        <Link href="">homestay</Link>
      </div>
    </div>
  );
}
