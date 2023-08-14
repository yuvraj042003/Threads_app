import mongoose from 'mongoose'

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(!process.env.MONGODB_URL) return console.log('MongoDB Url Not Found')
    if(isConnected) return console.log('Already Connected to the Database');

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;

        console.log('Connected to Database');

    } catch (error) {
        console.log(error);
    }
}