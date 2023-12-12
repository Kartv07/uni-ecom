import connectDB from "@/libs/connectDB";
import Cart from "@/modals/cart.model";
import { NextResponse } from "next/server";

export const PUT = async (req: any) => {
    await connectDB();
    try {
        const { itemId, quantity, userId } = await req.json();
        const existingCart = await Cart.findOne({ userId: userId });

        if (existingCart) {
            const foundItem = existingCart.itemsData.findIndex((item:any) => item.itemId.equals(itemId));
            existingCart.itemsData[foundItem].itemQuantity = quantity;
            await existingCart.save();
        }
        return NextResponse.json({ msg: "Item Updated !" }, { status: 202 });
    } catch (error) {
        return NextResponse.json({ err: "Error while updating cart item." }, { status: 500 })
    }
}