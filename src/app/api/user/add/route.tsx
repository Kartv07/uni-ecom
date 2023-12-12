import connectDB from "@/libs/connectDB";
import User from "@/modals/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    await connectDB();
    try {
        // Here we need to first check that user already exist or not.
        // For that we will either use email registration or phone registration.
        // For now i am simply adding a single user for the purpose of this assignment.

        //For more robust we can use authentication when we create user using token verification.
        const newUser = new User({
            orderCount: 0,
            disCountCpn: ""
        })
        await newUser.save();
        return NextResponse.json({ msg: "User added successfully !"}, { status: 201 });
    } catch (error) {
        return NextResponse.json({ err: "Error while adding user." }, { status: 500 })
    }
}