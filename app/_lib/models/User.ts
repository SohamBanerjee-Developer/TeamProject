import { Schema, model, Document, Model, models } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    phoneNumber: string;
    addharCard: string;
    address: string;
    userImage: string;
    email: string;
    password: string;
    verificationCode: string;
    expiryTime:Date;
    refreshToken: string;
    accessToken: string;
}

const userSchema = new Schema<IUser>({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    addharCard: { type: String, required: true },
    address: { type: String, required: true },
    userImage: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    accessToken: { type: String },
    expiryTime: { type: Date },
    verificationCode: { type: String }
}, { timestamps: true });



export const User: Model<IUser> = models.Users || model<IUser>("Users", userSchema);
