"use client"
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Item from "./Item";

interface itemStructure  {
    _id : any;
    itemName : String;
    itemDescription : String;
    itemPrice : Number;
}

const Home = () =>{
    const [allItems, setAllItems] = useState<itemStructure[]>();
    // Finding the items
    useEffect(()=>{
        const handleFindItems = async () =>{
            try {
                const response = await axios.get("/api/items/getAll");
                console.log(response);
                if(response.status === 200){
                    setAllItems(response.data);
                }
            } catch (error) {
                console.log("Error while fetch item details !");
            }
        }
        handleFindItems();
    },[])
    
    return (
        <div className="max-w-5xl mx-auto ">
            <div className="bg-teal-400 px-4 my-8 text-2xl leading-6 text-white font-medium py-8 rounded-md">
                Uni-B : An E-Commerce Platform
            </div>
            <div className=" p-4 flex flex-col gap-4 rounded-md shadow-md"> 
                <div className="text-lg font-medium">
                    All Items
                </div>
                <div>
                    {allItems?.map((item, index)=>(
                        <Item key={index} itemName = {item.itemName} itemDes = {item.itemDescription} itemPrice={item.itemPrice}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;