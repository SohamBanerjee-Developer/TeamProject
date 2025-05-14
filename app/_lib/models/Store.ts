import {Schema, model, Document, Model} from "mongoose";

export interface IStore extends Document {
    tittle: string;
    caption: string;
    thumbnail: string;
    photos: string[];
    details: string;
    location: string;
    validation: string;
    ownerId: Schema.Types.ObjectId;
    createdAt: Date;
}

const storeSchema = new Schema<IStore>({
    tittle: { type: String, required: true },
    caption: { type: String, required: true },
    thumbnail: { type: String, required: true },
    photos: [
        {type: String}
    ],
    details: { type: String , required: true},
    location: { type: String , required: true},
    validation: { type: String , required: true},
    ownerId: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
});

export const Store:Model<IStore> = model<IStore>("Store", storeSchema);
