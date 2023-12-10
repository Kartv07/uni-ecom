import connectDB from "@/libs/connectDB";
import item from "@/modals/items.model";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    await connectDB();
    try {
        const { itemName, itemDescription, itemPrice } = await req.json();
        if (!itemName || !itemDescription || !itemPrice) {
            return NextResponse.json({ msg: "Incomplete Data" }, { status: 400 });
        }
        const foundItem = await item.findOne({ itemName: itemName, itemPrice: itemPrice, itemDescription: itemDescription });
        if (foundItem) return NextResponse.json({ msg: "Item already exist" }, { status: 202 });
        const newItem = new item({
            itemName: itemName,
            itemDescription: itemDescription,
            itemPrice: itemPrice,
        })
        await newItem.save();
        return NextResponse.json({ msg: "Item added successfully !" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ err: "Error while adding item." }, { status: 500 })
    }
}