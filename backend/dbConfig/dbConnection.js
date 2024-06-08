import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/Paytm-clone");
        console.log(
            `Database connected ${connect.connection.host} ${connect.connection.name}`
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}