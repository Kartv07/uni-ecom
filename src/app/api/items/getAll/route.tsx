import connectDB from "@/libs/connectDB";
import item from "@/modals/items.model";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
    await connectDB();
    try {
        const findItem = await item.find();
        return NextResponse.json(findItem, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: "Error while adding item." }, { status: 500 })
    }
}