import {Schema, model, Document, Model, models} from "mongoose";

export interface IComment extends Document {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    postModel: "Home" | "Store" | "POST" | "Comment";
    body: string;

}

const commentSchema = new Schema<IComment>({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},

    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "postModel"
    },
    postModel: {
        type: String,
        required: true,
        enum: ["Home", "Store", "POST", "Comment"]
    },

    body: {type: String, required: true},

}, {timestamps: true});

export const CommentModel: Model<IComment> = models.Comment || model<IComment>("Comment", commentSchema);
