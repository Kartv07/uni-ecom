import cart from "@/app/cart/page";
import connectDB from "@/libs/connectDB";
import Cart from "@/modals/cart.model";
import { NextResponse } from "next/server";

export const DELETE = async (req: any) => {
    await connectDB();
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        const itemId = req.nextUrl.searchParams.get("itemId");
        const existingCart = await Cart.findOne({ userId: userId });

        if (existingCart) {
            const foundItem = existingCart.itemsData.filter((item:any)=>(item.itemId != itemId));
            await Cart.updateOne({userId : userId}, {$set : {itemsData : foundItem}})
        }
        return NextResponse.json({ msg: "Item Deleted !" }, { status: 202 });
    } catch (error) {
        return NextResponse.json({ err: "Error while adding item." }, { status: 500 })
    }
}