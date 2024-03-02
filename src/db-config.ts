import mongoose from "mongoose";

export default async function connectToDb() {
  try {
    const connect =await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log(process.env.CONNECTION_STRING);
    
    console.log("Connected to Database",connect.connection.host,connect.connection.name);
  } catch (err) {
    console.log("Error while connecting to Database ", err);
    process.exit(1);
  }
}
