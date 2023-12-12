import connectDB from "@/libs/connectDB";
import Cart from "@/modals/cart.model";
import { NextResponse } from "next/server";

export const GET = async (req: any) => {
    await connectDB();
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const existingCart = await Cart.findOne({ userId: userId }).populate("itemsData.itemId");
        if(existingCart){
            return NextResponse.json(existingCart,{status : 202});
        }
        return NextResponse.json({ msg: "Cart Cannot exist !" }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ err: "Error while detching cart details." }, { status: 500 })
    }
}