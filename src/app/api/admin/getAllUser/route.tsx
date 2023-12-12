import connectDB from "@/libs/connectDB";
import User from "@/modals/user.model";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
    await connectDB();
    try {
        const findUser = await User.find();
        return NextResponse.json(findUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: "Error while fetching users." }, { status: 500 })
    }
}