import connectDB from "@/libs/connectDB";
import Cart from "@/modals/cart.model";
import { NextResponse } from "next/server";
import Item from "@/modals/items.model";
import User from "@/modals/user.model";
import PurchaseHistory from "@/modals/purchasedHistory.model";

export const POST = async (req: any) => {
  await connectDB();
  try {
    const { userId, disCountCpn } = await req.json();
    const cart = await Cart.findOne({ userId: userId });
    if (cart) {
      let totalPrice = 0;
      // Check this user makes payment earlier or not
      const foundHistory = await PurchaseHistory.findOne({ userId: userId });
      let historyItemQuantity = 0;
      let historyTotalPrice = 0;
      let historyTotalDiscount = 0;
      let currentCartItemsQuantity = 0;
      let couponCodes: any[] = [];
      if (foundHistory) {
        historyItemQuantity += foundHistory.noOfItems;
        historyTotalPrice += foundHistory.totalPurchaseAmount;
        historyTotalDiscount += foundHistory.totalDiscountAmount;
        couponCodes = foundHistory.discountCoupon;
      }
      const itemPromises = cart.itemsData.map(async (item: any, index: any) => {
        const itemDetail = await Item.findOne({ _id: item.itemId });
        if (itemDetail && itemDetail.itemPrice) {
          totalPrice += itemDetail.itemPrice * item.itemQuantity;
          currentCartItemsQuantity += item.itemQuantity;
        }
      });

      await Promise.all(itemPromises);

      let finalPrice = totalPrice;
      const userDetails: any = await User.findOne({ _id: userId });
      const currOrder = userDetails.orderCount + 1;
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            orderCount: currOrder,
          }
        }
      );
      if (foundHistory) {
        await PurchaseHistory.updateOne({ userId: userId }, {
          $set: {
            noOfItems: historyItemQuantity + currentCartItemsQuantity,
            totalPurchaseAmount: historyTotalPrice + totalPrice

          }
        })
      }
      else{
        const newPurchase = new PurchaseHistory({
          userId : userId,
          noOfItems : currentCartItemsQuantity,
          totalPurchaseAmount : totalPrice,
          totalDiscountAmount : 0,
          discountCoupon : []
        })

        await newPurchase.save();
      }
      await Cart.deleteOne({userId : userId});
      if (userDetails.disCountCpn == disCountCpn && disCountCpn != "") {
        let discountPrice = finalPrice * 10;
        discountPrice = discountPrice / 100;
        finalPrice = totalPrice - (discountPrice);
        await User.updateOne(
          { _id: userId },
          {
            $set: {
              disCountCpn: "",
            }
          }
        );
        couponCodes.push(disCountCpn);
        await PurchaseHistory.updateOne({ userId: userId }, {
          $set: {
            totalDiscountAmount: historyTotalDiscount + discountPrice,
            discountCoupon: couponCodes
          }
        })

        return NextResponse.json({ msg: "Congratulation you get 10% off.", totalPrice: totalPrice, finalPrice: finalPrice }, { status: 202 });
      }
      return NextResponse.json({ msg: "Your Coupon code is invalid", totalPrice: totalPrice, finalPrice: finalPrice }, { status: 200 });

    } else {
      return NextResponse.json({ msg: "Cart doesn't Exist !" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ err: "Error while Checking out." }, { status: 500 })
  }
}

