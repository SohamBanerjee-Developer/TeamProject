import {Schema, model, Document, Model} from "mongoose";

export interface IHome extends Document {
    tittle: string;
    caption: string;
    thumbnail: string;
    photos: string[];
    maxCapcity: number;
    rent: number;
    details: string;
    location: string;
    validation: string;
    ownerId: Schema.Types.ObjectId;

}

const pgPostSchema = new Schema<IHome>({
    tittle: { type: String, required: true },
    caption: { type: String, required: true },
    thumbnail: { type: String, required: true },
    photos: [
        {type: String}
    ],
    maxCapcity: { type: Number , required: true},
    rent: { type: Number , required: true},
    details: { type: String , required: true},
    location: { type: String , required: true},
    validation: { type: String , required: true},
    ownerId: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
}, {timestamps: true});

export const HomeStay: Model<IHome> = model<IHome>("Home", pgPostSchema);
