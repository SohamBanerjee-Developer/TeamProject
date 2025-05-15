import mongoose from "mongoose";

let isDatabaseConnected: number = -1;

const databaseConnection = async (): Promise<void> => {
    try {
        if (isDatabaseConnected === 1) {
            console.log("database already connected! ");
            return;
        }
        const res = await mongoose.connect(process.env.MONGO_URI || "");
        isDatabaseConnected = res.connections[0].readyState;
    } catch (e: unknown) {
        console.log(e);
        console.log("database connection error!")
    }
}

export {databaseConnection};