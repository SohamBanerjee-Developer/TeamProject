import {v2 as cloudinary} from 'cloudinary';
import {AppError} from "@/app/_utils";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export const imageUploader = async (imagePath: string): Promise<{ url: string, publicId: string }> => {
    try {
        const res = await cloudinary.uploader.upload(imagePath, {
            folder: "homeStay"
        })
        return {
            url: res.secure_url,
            publicId: res.public_id,
        };
    } catch (e: unknown) {
        const err = e as Error;
        throw new AppError(err.message, 500)
    }
}

export const imageDeleter = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: "image",
                invalidate: true,
            }
        );


    } catch (e: unknown) {
        const err = e as Error;
        throw new AppError(err.message, 500)
    }
}