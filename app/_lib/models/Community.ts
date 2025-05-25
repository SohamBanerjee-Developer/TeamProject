import {Schema, model, Document, Model} from "mongoose";
import { string } from "zod";
import { databaseConnection } from "../db/database";

databaseConnection()
export interface IComment extends Document {
    userId: Schema.Types.ObjectId;
    commentId: Schema.Types.ObjectId;
    commentModel: "PGPost" | "Store" | "POST" | "Comment";
    comment: string;

}

export interface post{
    userId: String;
    universityId: Schema.Types.ObjectId;
    title: String;
    body: String;
    documentUrl: String;
    hashtags: String;
}

export interface hashtag{
    hashtag: String
}


const postSchema = new Schema<post>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    universityId: { type: Schema.Types.ObjectId, ref: "University", required: true },
    title: {type: String},
    body: {type: String},
    documentUrl: {type: String},
    hashtags: {type: string, ref: "Hashtag" }//suggest hashtags while posting

},{
    timestamps: true,
})

export const hashtagSchema = new Schema<hashtag>({
    hashtag: {type: String, unique: true }
})

const commentSchema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    commentId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "commentModel"
    },
    commentModel: {
        type: String,
        required: true,
        enum: ["PGPost", "Store", "Post", "Comment"]
    },

    comment: { type: String, required: true },

}, {timestamps: true});

export const Comment:Model<IComment> = model<IComment>("Comment", commentSchema);
export const Post:Model<post> = model<post>("Post", postSchema);
export const Hashtag:Model<hashtag> = model<hashtag>("Hashtag", hashtagSchema);
