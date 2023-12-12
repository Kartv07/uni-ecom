"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";

interface itemStructure {
    itemId: {
        _id: any;
        itemName: String;
        itemDescription: String;
        itemPrice: number;
    }
    itemQuantity: number;
}

const Cart = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<itemStructure[]>();

    const handleCartDetails = async () => {
        try {
            const response = await axios.get("/api/cart/get", {
                params: { userId: "65775cc555a472c7f4988746" }
            });
            console.log(response);
            if (response.status === 202) {
                console.log(response.data);
                setCartItems(response.data.itemsData);
            }
        } catch (error) {
            console.log("Error finding the cart details !");
        }
    }

    useEffect(() => {
        handleCartDetails();
    }, [])
    return (
        <div className="p-4 flex flex-col gap-4 rounded-md shadow-md">
            <div className="flex gap-2 justify-between">
                <button className="cursor-pointer" onClick={() => router.push("/")}>{`<--`}</button>
                <div className="text-lg font-medium">Your Cart</div>
            </div>
            {cartItems?.map((item, index) => {
                return <CartItems key={index} itemName={item.itemId.itemName} itemDescription={item.itemId.itemDescription}
                 itemId={item.itemId._id} itemPrice={item.itemId.itemPrice} itemQuantity={item.itemQuantity} handleCartDetails={handleCartDetails} />
            })}

        </div>
    )
}

export default Cart;