import connectDB from "@/libs/connectDB";

export const POST = async () =>{
    await connectDB();
}