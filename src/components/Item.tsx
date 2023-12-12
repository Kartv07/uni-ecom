'use client'
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
    itemId: any;
    itemName: String;
    itemDes: String;
    itemPrice: number;
}

const Item = (props: Props) => {
    const [isAdd, setIsAdd] = useState(false);
    //Checking item exist in the cart or not
    useEffect(()=>{
        const handleCheck = async () =>{
            try {
                const response = await axios.post("/api/items/get", {
                    userId : "65775cc555a472c7f4988746",
                    itemId : props.itemId
                })
                if(response.status === 200){
                    setIsAdd(true);
                }
            } catch (error) {
                
            }
        }

        handleCheck();
    },[])

    const handleAddCart = async () => {
        try {
            const response = await axios.post("/api/cart/add", {
                itemId: props.itemId,
                userId: "65775cc555a472c7f4988746", // For now we are adding the item to the specific user we can add the items for different users if they exist.
                quantity: 1
            })
            if(response.status === 201){
                setIsAdd(true);
            }
        } catch (error) {
            console.log("Error while adding items to the cart !");
        }
    }
    return (
        <div className="border flex px-4 py-2 justify-between items-center rounded-md">
            <div className="flex gap-4">
                <div> {`->`} </div>
                <div className="flex flex-col gap-1">
                    <div className="text-lg ">{props.itemName}</div>
                    <div className="text-sm">{props.itemDes}</div>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="text-sm font-medium text-teal-500">{props.itemPrice} ₹</div>
                {!isAdd ? <button onClick={handleAddCart} className="bg-teal-400 rounded-md p-2 hover:bg-teal-300 text-white font-medium">Add to cart</button>
                    // : <div className="flex gap-1">
                    //     <button className="p-1 rounded-md bg-teal-400 text-white">+</button>
                    //     <div>{qty}</div>
                    //     <button className="p-1 rounded-md bg-teal-400 text-white">-</button>
                    // </div>
                    : <button className="bg-teal-400 rounded-md p-2 hover:bg-teal-300 text-white font-medium">Added</button>

                }
            </div>
        </div>
    )
}

export default Item;