import {Schema, model, Model} from "mongoose";
// import { string } from "zod";
import { databaseConnection } from "../db/database";

databaseConnection()


export interface post{
    userId: Schema.Types.ObjectId;
    universityId: Schema.Types.ObjectId;
    title: string;
    body: string;
    documentUrl: string;
    hashtags: string;
}

export interface hashtag{
    hashtag: string
}


const postSchema = new Schema<post>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, trim: true },
    universityId: { type: Schema.Types.ObjectId, ref: "University", required: true, trim: true },
    title: {type: String},
    body: {type: String},
    documentUrl: {type: String},
    hashtags:[ {type: String, ref: "Hashtag" }]//suggest hashtags while posting

},{
    timestamps: true,
})

export const hashtagSchema = new Schema<hashtag>({
    hashtag: {type: String, unique: true, Trim: true }
})




export const postModel:Model<post> = model<post>("Post", postSchema);
export const hashtagModel:Model<hashtag> = model<hashtag>("Hashtag", hashtagSchema);
