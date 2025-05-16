import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const con = mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB is connected `);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;