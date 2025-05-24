'use client';

import {useState} from 'react';
import Image from 'next/image';
import FormDiv from '@/app/_components/FormDiv';
import Lable from '@/app/_components/Lable';
import Input from "@/app/_components/Input";
import FormButton from "@/app/_components/FormButton";
import {CldUploadButton} from "next-cloudinary";

export interface CloudinaryUploadResult {
    asset_id?: string;
    public_id: string;
    version: number;
    version_id?: string;
    signature: string;
    width: number;
    height: number;
    format: string; // e.g. "jpg", "png"
    resource_type: string; // e.g. "image", "video"
    created_at: string; // ISO timestamp
    tags: string[];
    bytes: number;
    type: string; // e.g. "upload"
    etag?: string;
    placeholder?: boolean;
    url: string; // HTTP URL
    secure_url: string; // HTTPS URL (most used)
    original_filename: string;
    access_mode?: string; // e.g. "public"
};

export default function PostForm() {
    const [thumbnailPreview, setThumbnailPreview] = useState<{ url: string, public_id: string } | null>(null);
    console.log(thumbnailPreview)


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form data handling logic here
    };

    return (
        <div className="relative h-full w-full flex-center px-5 py-1">
            <div
                className="w-full max-w-md bg-gray-800 py-4 px-6 rounded-xl shadow-md h-full overflow-x-hidden overflow-y-scroll   ">
                <h2 className="text-2xl font-bold text-center text-white mb-4">Create PG Post</h2>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Title:"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="text" name="title" id="title" placeholder="Home Stay"/>
                    </FormDiv>

                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Caption:"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="text" name="caption" id="caption" placeholder="For students"/>
                    </FormDiv>

                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Thumbnail Image:"/>
                        <CldUploadButton
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font cursor-pointer"
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                            onSuccess={(results) => {
                                if (results.event === "success") {
                                    const res = results.info as CloudinaryUploadResult;
                                    setThumbnailPreview({url: res.secure_url, public_id: res.public_id});
                                }
                            }}
                        />
                        {thumbnailPreview && (
                            <Image
                                src={thumbnailPreview.url}
                                alt="Thumbnail Preview"
                                width={100}
                                height={100}
                                className="mt-2 rounded-xl border border-gray-300"
                            />
                        )}
                    </FormDiv>


                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Max Rooms:"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="number" name="maxRoom" id="maxRoom" placeholder="4"/>
                    </FormDiv>

                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Rent (₹):"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="number" name="rent" id="rent" placeholder="2000"/>
                    </FormDiv>

                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Details:"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="text" name="details" id="details" placeholder="Include amenities, restrictions etc."/>
                    </FormDiv>

                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="Location (lat, lng):"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="text" name="location" id="location" placeholder="{ lat: 1234, lng: 234 }"/>
                    </FormDiv>

                    <FormDiv>
                        <Lable className="block text-sm font-medium text-gray-200" value="University:"/>
                        <Input
                            className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                            type="text" name="associatedUniversity" id="associatedUniversity" placeholder="MAKAUT"/>
                    </FormDiv>

                    <FormButton
                        className="py-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition duration-150"/>
                </form>
            </div>
        </div>
    );
}
