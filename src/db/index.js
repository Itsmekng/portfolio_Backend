import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\n Mongodb connect !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongodb connection error !!!", error);
        process.exit(1)
    }

}

export default connectDB