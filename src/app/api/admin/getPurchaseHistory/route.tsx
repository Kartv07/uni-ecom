import PurchaseHistory from "@/modals/purchasedHistory.model";
import connectDB from "@/libs/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
    await connectDB();
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const userHistory = await PurchaseHistory.findOne({userId : userId});
        if(userHistory){
            return NextResponse.json(userHistory, {status : 202});
        }
        return NextResponse.json({msg : "User doesn't make any order"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ err: "Error while fetching user order's history." }, { status: 500 })
    }
}