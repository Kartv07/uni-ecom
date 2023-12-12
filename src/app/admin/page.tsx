"use client"
import { useState, useEffect } from "react";
import axios from "axios";

interface user {
    userId: String;
    noOfItems: number;
    totalPurchaseAmount: number;
    totalDiscountAmount: number;
    discountCoupon: [String];

}
const admin = () => {
    const [user, setUser] = useState<user>();

    useEffect(() => {
        const handleFetchUser = async () => {
            try {
                const response = await axios.get("/api/admin/getPurchaseHistory", {
                    params: { userId: "65775cc555a472c7f4988746" }
                });
                if (response.status === 202) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Error while adding users !")
            }
        }

        handleFetchUser();
    }, [])
    return (
        <div className="max-w-5xl shadow mx-auto flex flex-col gap-4 p-4">
            <div className="flex justify-between text-left items-center p-4 border border-[#DADADA] rounded-md">
                <div> {`->`} </div>
                <div className="text-sm text-left">User Id : {user?.userId}</div>
                <div className="text-sm text-left">Number of Items Ordered : {user?.noOfItems}</div>
            </div>
            <div className="flex justify-between text-left items-center p-4 border border-[#DADADA] rounded-md">
                <div> {`->`} </div>
                <div className="text-sm text-left">Total Amount Purchased : {user?.totalPurchaseAmount}</div>
                <div className="text-sm text-left">Total Discount Amount : {user?.totalDiscountAmount}</div>
            </div>
            <div className="flex justify-between text-left items-center p-4 border border-[#DADADA] rounded-md">
            <div className="text-sm text-left min-w-[260px]">Discount Cooupons :  </div>
                <div className="flex flex-wrap gap-4">
                {user?.discountCoupon.map((cpn,index)=>(<>
                    <div key={index} className="text-sm p-2 bg-gray-100 rounded-md text-left">{cpn}</div>
                    </>
                ))}
                </div>
            </div>


        </div>
    )
}

export default admin;