import {Schema, model, Document, Model, models} from "mongoose";

export interface IReview extends Document {
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
}

const reviewSchema = new Schema<IReview>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, required: true, ref: "Home" },
});

export const Upvote:Model<IReview> = models.Upvote || model<IReview>("Upvote", reviewSchema);
