import {Schema, model, Document, Model, models} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

type IThumbnail = {
    url: string;
    publicId: string;
};

// type ILocation = {
//     lat: number;
//     lng: number;
// };

export interface IHome extends Document {
    tittle: string;
    caption: string;
    thumbnail: IThumbnail;
    photos?: IThumbnail[];
    maxRoom: number;
    rent: number;
    details: string;
    // location: ILocation;
    houseNumber: string;
    location:string;
    ownerId: Schema.Types.ObjectId;
    associateUniversity: Schema.Types.ObjectId;
}


const ThumbnailSchema = new Schema<IThumbnail>({
    url: { type: String, required: true },
    publicId: { type: String, required: true }
}, { _id: false });

// const LocationSchema = new Schema<ILocation>({
//     lat: { type: Number, required: true },
//     lng: { type: Number, required: true }
// }, { _id: false });

const pgPostSchema = new Schema<IHome>({
    tittle: { type: String, required: true },
    caption: { type: String, required: true },
    thumbnail: { type: ThumbnailSchema, required: true },
    photos: { type: [ThumbnailSchema]},
    maxRoom: { type: Number, required: true },
    rent: { type: Number, required: true },
    details: { type: String, required: true },
    location: { type: String, required: true },
    houseNumber: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    associateUniversity: { type: Schema.Types.ObjectId, ref: "University", required: true },
}, { timestamps: true });

pgPostSchema.plugin(aggregatePaginate);

export const HomeStay: Model<IHome> = models.Home || model<IHome>("Home", pgPostSchema);
