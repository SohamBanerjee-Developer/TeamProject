import {Schema, model, Document, Model} from "mongoose";

export interface IReview extends Document {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    postModel: "PGPost" | "Store" | "POST";
    rating: number;
}

const reviewSchema = new Schema<IReview>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, required: true,   refPath: "postModel" },
    postModel: { type: String, required: true, enum: ["PGPost", "Store", "POST"] },
    rating: { type: Number, required: true },
});

export const Review:Model<IReview> = model<IReview>("Review", reviewSchema);
