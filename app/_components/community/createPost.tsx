"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldUploadButton } from 'next-cloudinary';
import MediaPreviewer from './mediaPreviewer';
import { CloudinaryUploadResult } from '@/app/(private)/home/uploadpg/page';
import axios from 'axios';
// import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

interface documentInfo{
    url: string,
    type: "image"|"video"|"poll"
}

export default function createPost() {
    const [documentInfo, setDocumentInfo] = useState<documentInfo>()
    const [isUrl, setIsUrl] = useState(false)
    const searchParams = useParams()
    const bodyRef = useRef<HTMLTextAreaElement>(null)  
    const {university} = searchParams
    // console.log(university);
    

    
    
    async function insertPost() {
        
        if(bodyRef?.current?.value.match(/#\w+/g)?.length){await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Community/post`,{
            "body": bodyRef.current?.value,
            "documentUrl": documentInfo?.url,
            "documentType": documentInfo?.type,
            "hashtags": bodyRef?.current?.value.match(/#\w+/g)},{
             headers:{
                'universityId': university
            }
        })}else{
           await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Community/post`,{
            "body": bodyRef.current?.value,
            "documentUrl": documentInfo?.url,
            "documentType": documentInfo?.type},{
            headers:{
                'universityId': university
            }
        })
        setIsUrl(false)
        }
    }
  return (<>
  <div className="post-card rounded-2xl shadow-xl px-4 py-6 mb-10 ">
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <i className="fas fa-user text-white text-lg"></i>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 text-xl">Create a new post</h3>
                    <p className="text-gray-500 text-sm">Share what's on your mind</p>
                </div>
            </div>

            <div className="space-y-4">
                <textarea 
                    id="postCaption" 
                    placeholder="What's happening?" 
                    className="w-full p-4 border-2 text-black border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-base resize-none"
                    // rows= "3"  
                    ref={bodyRef} 
                ></textarea>

                <div className="flex items-center justify-between">
                    
                    <CldUploadButton 
                    className='flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl cursor-pointer' 
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_COMMUNITY_PRESET_NAME}
                    onSuccess={(results) => {
                                                    if (results.event === "success") {
                                                        const res = results.info as CloudinaryUploadResult;
                                                       setDocumentInfo({
                                                        url: res.secure_url,
                                                        type: res.resource_type as "image"|"video"|"poll"
                                                       });
                                                        setIsUrl(true)
                                                    }
                                                }}
                    />
                    
                    <button 
                        id="createPostBtn" 
                        className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        onClick={insertPost}
                    >
                        <i className="fas fa-paper-plane mr-2"></i>
                        Post
                    </button>
                </div>

                {/* <!-- Media Preview --> */}
                {isUrl && <MediaPreviewer documentType={documentInfo?.type} documentUrl={documentInfo?.url}/>}
            </div>
        </div>

 </> )
}
