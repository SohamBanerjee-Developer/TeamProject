import {Schema, models, Document, Model, model} from "mongoose";

export interface IOwner extends Document {
    fullName: string;
    phoneNumber: string;
    addharCard: string;
    address: string;
    userImage: string;
    email: string;
    password: string;
    verificationCode: string;
    expiryTime: Date;
    refreshToken: string;
    accessToken: string;
}

const ownerSchema = new Schema<IOwner>({
    fullName: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    addharCard: {type: String, required: true},
    address: {type: String, required: true},
    userImage: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    refreshToken: {type: String},
    accessToken: {type: String},
    expiryTime: {type: Date},
    verificationCode: {type: String}
}, {timestamps: true});

export const Owner: Model<IOwner> = models.Owners || model<IOwner>("Owner", ownerSchema);
