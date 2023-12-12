"use client"
import item from "@/modals/items.model";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
interface Props {

    itemId: any;
    itemName: String;
    itemDescription: String;
    itemPrice: number;
    itemQuantity: number;
    handleCartDetails: React.Dispatch<SetStateAction<void | undefined>>;
}

const CartItems = (props: Props) => {
    const [itemQuantity, setItemQuantity] = useState(props.itemQuantity)

    const upDateItem = async (qty: number) => {
        if (qty === 0) {
            try {
                const response = await axios.delete("/api/cart/delete", {
                   params : { userId: "65775cc555a472c7f4988746", itemId: props.itemId}
                })

                if (response.status === 202) {
                    // setItemQuantity(qty);
                    props.handleCartDetails();
                }
            } catch (error) {

            }
        }
        else {
            try {
                const response = await axios.put("/api/cart/update", {
                    userId: "65775cc555a472c7f4988746",
                    itemId: props.itemId,
                    quantity: qty
                })

                if (response.status === 202) {
                    setItemQuantity(qty);
                    props.handleCartDetails();
                  
                }
            } catch (error) {

            }
        }
    }

    return (
        <div className="border flex px-4 py-2 justify-between items-center rounded-md">
            <div className="flex gap-4">
                <div> {`->`} </div>
                <div className="flex flex-col gap-1">
                    <div className="text-lg ">{props.itemName}</div>
                    <div className="text-sm">{props.itemDescription}</div>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <div className="text-sm font-medium text-teal-500">{props.itemPrice * props.itemQuantity} ₹</div>
                <div className="flex gap-1">
                    <button onClick={() => { upDateItem(itemQuantity - 1) }} className=" rounded-full w-6 h-6 bg-teal-400 text-white">-</button>
                    <div className="px-2">{itemQuantity}</div>
                    <button onClick={() => { upDateItem(itemQuantity + 1) }} className="rounded-full w-6 h-6 bg-teal-400 text-white">+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems;