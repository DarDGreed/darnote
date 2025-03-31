import mongoose from "mongoose"

export const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI as string)
    console.log(`Mongoose connected: ${conn.connection.host}`)
  }catch(error: any){
    console.log("Connection Error", error.message)
    process.exit(1)
  }
}

export default connectDB
