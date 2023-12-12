'use client'
import React from "react";
import { useState } from "react";

interface Props {
    itemName: String;
    itemDes: String;
    itemPrice: Number;
}

const Item = (props: Props) => {
    const [qty, setQty] = useState(0);
    return (
        <div className="border flex px-4 py-2 justify-between items-center rounded-md">
            <div className="flex gap-4">
                <div> {`->`} </div>
                <div className="flex flex-col gap-1">
                    <div className="text-lg ">{props.itemName}</div>
                    <div className="text-sm">{props.itemDes}</div>
                </div>
            </div>

            {qty === 0 ? <button className="bg-teal-400 rounded-md p-2 hover:bg-teal-300 text-white font-medium">Add to cart</button>
                : <div className="flex gap-1">
                    <button className="p-1 rounded-md bg-teal-400 text-white">+</button>
                    <div>{qty}</div>
                    <button className="p-1 rounded-md bg-teal-400 text-white">-</button>
                </div>
            }
        </div>
    )
}

export default Item;