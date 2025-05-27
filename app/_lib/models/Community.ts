import {Schema, model, Model, models} from "mongoose";
// import { string } from "zod";
import { databaseConnection } from "../db/database";

databaseConnection()


export interface post{
    userId: Schema.Types.ObjectId;
    universityId: Schema.Types.ObjectId;
    body: string;
    documentUrl: string;
    documentType: "video"|"poll"|"image";
    hashtags: string;
}

export interface hashtag{
    hashtag: string
}


const postSchema = new Schema<post>({
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true, trim: true },
    universityId: { type: Schema.Types.ObjectId, ref: "University", required: true, trim: true },
    body: {type: String},
    documentUrl: {type: String},
    documentType: {type: String, enum:["video", "poll", "image"]},
    hashtags:[ {type: Schema.Types.ObjectId, ref: "Hashtag" }]//suggest hashtags while posting

},{
    timestamps: true,
})

export const hashtagSchema = new Schema<hashtag>({
    hashtag: {type: String, unique: true, Trim: true }
})




export const postModel:Model<post> = models.CommunityPost || model<post>("CommunityPost", postSchema);
export const hashtagModel:Model<hashtag> = models.Hashtag || model<hashtag>("Hashtag", hashtagSchema);
