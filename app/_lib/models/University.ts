// models/University.ts
import {Schema, Document, models, model, Model} from 'mongoose';

export interface IUniversity extends Document {
    name: string;
    location: string;
    coverImage: string;
    description: string;
    governmentId: string;
    afflitatedBy: string;
}

const UniversitySchema: Schema<IUniversity> = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        coverImage: { type: String, required: true },
        description: { type: String, required: true },
        governmentId: { type: String, required: true },
        afflitatedBy: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const univerSity:Model<IUniversity> =   models.University || model<IUniversity>('University', UniversitySchema);
