"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import { toast, Toaster } from "react-hot-toast"

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
    const [coupon, setCoupon] = useState("");
    const [findCoupon, setFindCoupon] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [isCheckOut, setIsCheckOut] = useState(false);

    const handleGenerate = async () => {
        try {
            const response = await axios.post("/api/generateDiscountCpn", {
                userId: "65775cc555a472c7f4988746"
            });
            console.log(response);
            setFindCoupon(true);
            if (response.status === 200) {
                toast.error("Coupon Not Available !");
            }
            else if (response.status === 201) {
                toast.success("Congratulation you get a Coupon Code");
                setCoupon(response.data.coupon);
            }
        } catch (error) {

        }
    }

    const handleCheckout = async () => {
        try {
            const response = await axios.post("/api/checkout", {
                userId: "65775cc555a472c7f4988746",
                disCountCpn: coupon
            })

            if (response.status === 202) {
                toast.success(response.data.msg);
            }
            if (response.status === 202 || response.status === 200) {
                setTotalPrice(response.data.totalPrice);
                setFinalPrice(response.data.finalPrice);
                setDiscount(response.data.totalPrice - response.data.finalPrice);
                setIsCheckOut(true);
            }
        } catch (error) {

        }
    }

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
        <>
            <div className="p-4 flex flex-col gap-4 rounded-md shadow-md">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="flex gap-2 justify-between">
                    <button className="cursor-pointer" onClick={() => router.push("/")}>{`<--`}</button>
                    <div className="text-lg font-medium">Your Cart</div>
                </div>
                {cartItems?.map((item, index) => {
                    return <CartItems key={index} itemName={item.itemId.itemName} itemDescription={item.itemId.itemDescription}
                        itemId={item.itemId._id} itemPrice={item.itemId.itemPrice} itemQuantity={item.itemQuantity} handleCartDetails={handleCartDetails} />
                })}
                {!findCoupon &&
                    <div className="items-center justify-end flex">Apply Coupon Code ?  <button className="px-4 ml-4 py-2 rounded-md text-white font-normal bg-teal-400" onClick={handleGenerate}> Generate a coupon code</button></div>}
                {findCoupon && coupon && <div className="justify-end ml-auto items-end flex text-teal-400 font-medium leading-5 border border-[#DADADA] rounded-md w-fit px-4 py-2">Coupon Code Applied</div>}
                {findCoupon && !coupon && <div className="justify-end ml-auto items-end flex text-red-500 font-medium leading-5 border border-[#DADADA] rounded-md w-fit px-4 py-2">Coupon Code Not Available</div>}
            </div>
            <div className="p-4 my-4 flex flex-col gap-4 rounded-md shadow-md">
                <div className="items-center justify-end flex"><button className="px-4 ml-4 py-2 rounded-md text-white font-normal bg-teal-400" onClick={handleCheckout}> Proceed To Checkout</button></div>
                {isCheckOut &&
                    <div className="items-end px-2 text-right justify-end flex flex-col gap-2">
                        <div>Subtotal Price : {totalPrice} ₹</div>
                        <div>Discount : {discount} ₹</div>
                        <div>Total : {finalPrice} ₹</div>
                    </div>}
            </div>
        </>

    )
}

export default Cart;