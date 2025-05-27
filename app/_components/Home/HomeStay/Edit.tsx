"use client"

import {useAuthClient} from "@/app/_hooks/helper";
import {useState} from "react";
import {CreateHomeStay} from "@/app/_components/Home/HomeStay/CreateHomestay";

export type Thumbnail = {
    url: string;
    publicId: string;
};

export type Owner = {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    isVerified: boolean;
};

export type University = {
    _id: string;
    name: string;
};

export type HomeStayItem = {
    _id: string;
    title: string;
    caption: string;
    thumbnail: Thumbnail;
    maxRoom: number;
    rent: number;
    details: string;
    location: string;
    houseNumber: string;
    associatedUniversity: string;
    university: University;
    owner: Owner;
    review: any[]; // Replace `any[]` with a Review[] type if known
    totalUpvotes: number;
};


const Edit = ({item}:{item:HomeStayItem}) => {
      const {user} = useAuthClient();
     const [openForm, setOpenForm] = useState<boolean>(false);

      if (user !== item.owner._id) return null;
    return (
        <>
            <div className={`absolute top-0 right-5 flex-center h-10 w-10 bg-gray-600 rounded-full group`} onClick={() => setOpenForm(true)}>
                <button className="cursor-pointer text-sm group-hover:text-lg">✏️</button>
            </div>
            {
                openForm && <CreateHomeStay isEditing={true} item={item}/>
            }
        </>


    )
}
export default Edit
