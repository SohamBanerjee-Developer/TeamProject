import {CreateHomeStay} from "@/app/_components/Home/HomeStay/CreateHomestay";

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


    return (
        <div className="relative h-full w-full flex-center px-5 py-1">
            <div
                className="w-full max-w-md bg-gray-800 py-4 px-6 rounded-xl shadow-md h-full overflow-x-hidden overflow-y-scroll   ">
                <h2 className="text-2xl font-bold text-center text-white mb-4">Create PG Post</h2>
                    <CreateHomeStay isEditing={false}/>
            </div>
        </div>
    );
}
