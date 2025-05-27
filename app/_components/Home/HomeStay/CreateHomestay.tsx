"use client";

import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Image from "next/image";
import {CldUploadButton} from "next-cloudinary";
import FormDiv from "@/app/_components/FormDiv";
import Lable from "@/app/_components/Lable";
import Input from "@/app/_components/Input";
import FormButton from "@/app/_components/FormButton";
import {CloudinaryUploadResult} from "@/app/(private)/home/uploadpg/page";
import {toast} from "react-toastify";
import {createPg, HomeStayData, pgUpdate, updatePg} from "@/app/_lib/actions/Edit/action";
import {useRouter} from "next/navigation";
import {HomeStayItem} from "./Edit";


interface Thumbnail {
    url: string;
    publicId: string;
}

type FormData = {
    title: string;
    caption: string;
    maxRoom: number;
    rent: number;
    details: string;
    location: string;
    associatedUniversity: string; // assuming this is an ID string
    houseNumber: string;
    thumbnail: Thumbnail;
    postId?: string,
    _id?: string | unknown
};


interface University {
    _id: string;
    name: string;
}

const CreateHomeStay = ({item, isEditing}: { item?: HomeStayItem; isEditing: boolean }) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue
    } = useForm<FormData | HomeStayData>({
        defaultValues: isEditing && item ? { title: item.title,
            caption: item.caption,
            maxRoom: item.maxRoom,
            rent: item.maxRoom,
            details: item.details,
            location: item.location,
            associatedUniversity: String(item.university._id),
            houseNumber: item.houseNumber
        } : {
            title: "",
            caption: "",
            maxRoom: 0,
            rent: 0,
            details: "",
            location: "",
            associatedUniversity: "",
            houseNumber: "",
        },
    });

    const router = useRouter();

    const [universities, setUniversities] = useState<University[]>([]);
    const [thumbnailPreview, setThumbnailPreview] = React.useState<{ url: string; public_id: string } | null>(null);

    // Fetch universities on mount
    useEffect(() => {
        async function fetchUniversities() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/university/getuniversitites`);
                if (!response.ok) throw new Error("Failed to fetch universities");
                const resData = await response.json();
                if (!resData.flag) {
                    toast.error(resData.message);
                    setUniversities([]);
                    return;
                }
                setUniversities(resData.data.universities);
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        }

        fetchUniversities();
    }, []);

    // Reset form values when editing item changes
    useEffect(() => {
        if (isEditing && item) {
            reset(item);
        }
    }, [item, isEditing, reset]);

    const submit = async (data: FormData) => {

        if (isEditing && item) {
            if (!data.thumbnail) {

            }
        } else {
            if (!thumbnailPreview?.url) {
                toast.error("thumbnail is required");
                return;
            }

            const response = await createPg(data);

            if (response?.error === "login") {
                // router.push("/auth/login")
                toast.error("Please login to create a post");
            }

            if (!response?.flag) {
                toast.error(response?.error);
                return;
            }

            if (!response.flag) {
                router.push("/home/homestay")
            }
        }
    };

    return (
        <form className=" absoulte h-full w-full inset-0 space-y-3" onSubmit={handleSubmit(submit)}>
            <FormDiv>
                <Lable className="block text-sm font-medium text-gray-200" value="Title:"/>
                <Input
                    {...register("title", {required: "Title is required"})}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                    type="text"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </FormDiv>

            <FormDiv>
                <Lable className="block text-sm font-medium text-gray-200" value="Caption:"/>
                <Input
                    {...register("caption", {required: "Caption is required"})}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                    type="text"
                />
                {errors.caption && <p className="text-red-500 text-sm">{errors.caption.message}</p>}
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
                            setValue("thumbnail", {url: res.secure_url, publicId: res.public_id});
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
                    {...register("maxRoom", {
                        required: "Max Rooms is required",
                        valueAsNumber: true,
                        min: {value: 1, message: "Minimum 1 room"},
                    })}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                    type="number"
                />
                {errors.maxRoom && <p className="text-red-500 text-sm">{errors.maxRoom.message}</p>}
            </FormDiv>

            <FormDiv>
                <Lable className="block text-sm font-medium text-gray-200" value="Rent (₹):"/>
                <Input
                    {...register("rent", {
                        required: "Rent is required",
                        valueAsNumber: true,
                        min: {value: 0, message: "Rent cannot be negative"},
                    })}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                    type="number"
                />
                {errors.rent && <p className="text-red-500 text-sm">{errors.rent.message}</p>}
            </FormDiv>

            <FormDiv>
                <Lable className="block text-sm font-medium text-gray-200" value="Details:"/>
                <Input
                    {...register("details")}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                    type="text"
                />
            </FormDiv>

            <FormDiv>
                <Lable className="block text-sm font-medium text-gray-200" value="Location (lat, lng):"/>
                <Input
                    {...register("location")}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                    type="text"
                    id="location"
                />
            </FormDiv>

            {/* University Select Dropdown */}
            <FormDiv>
                <Lable className="block text-sm font-medium text-gray-200" value="University:"/>
                <select
                    {...register("associatedUniversity", {required: "Please select a university"})}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font dark-bg"
                    defaultValue=""
                    id="associatedUniversity"
                >
                    <option value="" disabled>
                        Select a university
                    </option>
                    {universities.map((uni) => (
                        <option key={uni._id} value={uni._id}>
                            {uni.name}
                        </option>
                    ))}
                </select>
                {errors.associatedUniversity && (
                    <p className="text-red-500 text-sm">{errors.associatedUniversity.message}</p>
                )}
            </FormDiv>

            {/* House Number Field */}
            <FormDiv>
                <Lable className="block text-sm font-medium text-gray-200" value="House Number:"/>
                <Input
                    {...register("houseNumber")}
                    className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-xl shadow-sm outline-0 text-lg description-font"
                    type="text"
                />
            </FormDiv>

            <FormButton
                type="submit"
                className="py-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition duration-150"
                value="Submit"
            />
        </form>
    );
};

export {CreateHomeStay};