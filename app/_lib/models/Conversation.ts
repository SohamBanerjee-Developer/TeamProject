import {Schema, model, Document, Model} from "mongoose";

export interface IComment extends Document {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    postModel: "PGPost" | "Store" | "POST" | "Comment";
    comment: string;

}

interface post extends IComment{
    universityId: Schema.Types.ObjectId
}

const postSchema = new Schema<post>({
    universityId: {type: Schema.Types.ObjectId, ref: "university"},
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "postModel"
    },
    postModel: {
        type: String,
        required: true,
        enum: ["PGPost", "Store", "POST", "Comment"]
    },

    comment: { type: String, required: true },

}, {timestamps: true});

const commentSchema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "postModel"
    },
    postModel: {
        type: String,
        required: true,
        enum: ["PGPost", "Store", "POST", "Comment"]
    },

    comment: { type: String, required: true },

}, {timestamps: true});

export const Post:Model<post> = model<post>("Posts", postSchema )
export const Comment:Model<IComment> = model<IComment>("Comment", commentSchema);
