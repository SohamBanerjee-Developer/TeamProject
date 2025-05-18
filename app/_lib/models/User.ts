import {Schema, model, Document} from "mongoose";

export interface IUser extends Document {
    fullName: string;
    phoneNumber: string;
    addharCard: string;
    address: string;
    userImage: string;
    email: string;

}

const userSchema = new Schema<IUser>({
    fullName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    addharCard: {type: String, required: true},
    address: {type: String, required: true},
    userImage: {type: String},
    email: {type: String, required: true, unique: true},

}, {timestamps: true});

export const User = model<IUser>("User", userSchema);
