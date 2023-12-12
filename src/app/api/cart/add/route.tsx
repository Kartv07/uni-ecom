import connectDB from "@/libs/connectDB";
import Cart from "@/modals/cart.model";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    await connectDB();
    try {
        const { itemId, userId, quantity } = await req.json();
        const existingCart = await Cart.findOne({ userId: userId });

        if (existingCart) {
            const foundItem = existingCart.itemsData.findIndex((item:any) => item.itemId.equals(itemId));

            if (foundItem !== -1) {
                existingCart.itemsData[foundItem].itemQuantity += quantity;
            } else {
                existingCart.itemsData.push({ itemId: itemId, itemQuantity : quantity });
            }

            await existingCart.save();
        } else {
            const newCart = new Cart({
                userId: userId,
                itemsData: [{ itemId: itemId, itemQuantity : quantity }]
            });
            await newCart.save();
        }
        return NextResponse.json({ msg: "Item added to the Cart !" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ err: "Error while adding item." }, { status: 500 })
    }
}