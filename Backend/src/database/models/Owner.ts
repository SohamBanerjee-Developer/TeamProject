import {Schema, model, Document, Model} from "mongoose";

export interface IOwner extends Document {
    fullName: string;
    phoneNumber: string;
    addharCard: number;
    email: string;
    address: string;
}

const ownerSchema = new Schema<IOwner>({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    addharCard: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
}, { timestamps: true });

export const Owner:Model<IOwner> = model<IOwner>("Owner", ownerSchema);
