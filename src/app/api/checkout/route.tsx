import connectDB from "@/libs/connectDB";
import Cart from "@/modals/cart.model";
import { NextResponse } from "next/server";
import Item from "@/modals/items.model";
import User from "@/modals/user.model";

export const POST = async (req: any) => {
    await connectDB();
    try {
        const { userId, disCountCpn } = await req.json();
        const cart = await Cart.findOne({ userId: userId });
        if (cart) {
            let totalPrice = 0;
            const itemPromises = cart.itemsData.map(async (item:any, index:any) => {
                const itemDetail = await Item.findOne({ _id: item.itemId });
                if (itemDetail && itemDetail.itemPrice) {
                    totalPrice += itemDetail.itemPrice * item.itemQuantity;
                }
            });
            
            await Promise.all(itemPromises);
            
            let finalPrice = totalPrice;
            const userDetails : any = await User.findOne({_id : userId});
            const currOrder = userDetails.orderCount + 1;;
            await User.updateOne(
                { _id: userId },
                {
                  $set: {
                    orderCount : currOrder,
                  }
                }
              );
              
            if(userDetails.disCountCpn == disCountCpn && disCountCpn != ""){
                finalPrice = finalPrice*10;
                finalPrice = totalPrice - (finalPrice / 100);
                await User.updateOne(
                    { _id: userId },
                    {
                      $set: {
                        disCountCpn : "",
                      }
                    }
                  );
                return NextResponse.json({msg : "Congratulation you get 10% off.", totalPrice : totalPrice, finalPrice : finalPrice}, {status : 202});
            }
            return NextResponse.json({msg : "Your Coupon code is invalid", totalPrice : totalPrice, finalPrice : finalPrice}, {status : 202});

        } else {
            return NextResponse.json({ msg: "Cart doesn't Exist !" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ err: "Error while Checking out." }, { status: 500 })
    }
}

