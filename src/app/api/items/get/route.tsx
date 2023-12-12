import connectDB from "@/libs/connectDB";
import item from "@/modals/items.model";
import { NextResponse } from "next/server";
import Cart from "@/modals/cart.model";

export const POST = async (req: any) => {
    await connectDB();
    try {
        const {itemId, userId} = await req.json();
        const existingCart = await Cart.findOne({ userId: userId });

        if (existingCart) {
            const foundItem = existingCart.itemsData.findIndex((item:any) => item.itemId.equals(itemId));
            if(foundItem !== -1)
            return NextResponse.json({msg : "item exist inside the cart"}, {status : 200});
        }

        return NextResponse.json({msg : "Cart Doesn't Exist"}, {status : 404});
    } catch (error) {
        return NextResponse.json({ err: "Error while adding item." }, { status: 500 })
    }
}