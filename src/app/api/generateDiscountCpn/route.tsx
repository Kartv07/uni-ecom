import connectDB from "@/libs/connectDB";
import User from "@/modals/user.model";
import { NextResponse } from "next/server";
import {v4} from "uuid";

export const POST = async (req: any) => {
    await connectDB();
    try {
        const {userId} = await req.json();
        const userDetails = await User.findOne({ _id: userId });

        if (userDetails) {
            const orderCount = userDetails.orderCount;
            const nthOrder = 2; // Let us say user will get 10% discount for every 2 orders cycle.
            if((orderCount + 1) % nthOrder === 0){
                const disCountCpn = v4();
                const updateUser = await User.updateOne(
                    { _id: userId }, 
                    { $set: { disCountCpn: disCountCpn } }
                  );
                return NextResponse.json({msg : "Discount Coupon generated Successfully !", coupon : disCountCpn}, {status : 201});                  
            }
            return NextResponse.json({msg : "Coupon Not available !"}, {status : 400})

        } else {
            return NextResponse.json({msg : "Invalid User or User doesn't exitst !"}, {status : 404});
        }
    } catch (error) {
        return NextResponse.json({ err: "Error while generating the coupon." }, { status: 500 })
    }
}

  