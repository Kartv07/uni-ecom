"use client"
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";
import { TbShoppingCartPlus } from "react-icons/tb";
import { useRouter } from "next/navigation";

interface itemStructure {
    _id: any;
    itemName: String;
    itemDescription: String;
    itemPrice: number;
}

const Home = () => {
    const [allItems, setAllItems] = useState<itemStructure[]>();
    const router = useRouter();
    // Finding the items
    useEffect(() => {
        const handleFindItems = async () => {
            try {
                const response = await axios.get("/api/items/getAll");
                console.log(response);
                if (response.status === 200) {
                    setAllItems(response.data);
                }
            } catch (error) {
                console.log("Error while fetch item details !");
            }
        }
        handleFindItems();
    }, [])

    return (
        <div className="mx-auto ">
            <div className=" p-4 flex flex-col gap-4 rounded-md shadow-md">
                <div className="flex justify-between">
                    <div className="text-lg font-medium">All Items</div>
                    <div onClick={(e)=>router.push("/cart")} className="flex text-sm p-2 cursor-pointer hover:bg-teal-100 hover:rounded-md gap-1">
                    <TbShoppingCartPlus size={20} /> Cart
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    {allItems?.map((item, index) => (
                        <Item key={index} itemName={item.itemName} itemDes={item.itemDescription} itemPrice={item.itemPrice} itemId={item._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;