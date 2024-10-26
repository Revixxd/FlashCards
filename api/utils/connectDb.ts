import mongoose from 'mongoose';
import dotenv from 'dotenv';
const connectDb = async () => {
    dotenv.config();
    const { DATABASE_USERNAME, DATABASE_PASSWORD  } = process.env;
    try {
        await mongoose.connect(`mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@flashcardscluster.dbfi1.mongodb.net/flashcards?retryWrites=true&w=majority&appName=FlashcardsCluster`);
        console.log('MongoDB connected successfully');
        
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
export default connectDb;