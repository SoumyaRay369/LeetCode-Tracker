import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_GLOBAL_URI)
        console.log(`Successfully established connection to local database`)
    } catch {
        console.log(`Not able to establish connection with local database`)
    }
}

export default connectDB



