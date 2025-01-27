import mongoose from "mongoose";
interface ConnectionError extends Error {
    message: string
}
const connectDB = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected to MongoDB");
        return
    }
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('Connection string is not defined');
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        const typeError = error as ConnectionError;
        console.log("Error connecting to MongoDB: ", typeError.message);
    }
}
export default connectDB