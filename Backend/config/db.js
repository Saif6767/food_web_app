import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Test:test1234@cluster0.xu4e2.mongodb.net/Food-FrenzyDB')
    .then(() => console.log('DB CONNECTED'))
}