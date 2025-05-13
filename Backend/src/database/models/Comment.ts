import {Schema, model, Document, Model} from "mongoose";

export interface IComment extends Document {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    postModel: "PGPost" | "Store" | "POST";
    comment: string;

}

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
        enum: ["PGPost", "Store", "POST"]
    },

    comment: { type: String, required: true },

}, {timestamps: true});

export const Comment:Model<IComment> = model<IComment>("Comment", commentSchema);
