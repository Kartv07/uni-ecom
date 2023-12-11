import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    noOfItems : {
        type : Number,
        require : true
    },
    totalPurchaseAmount : {
        type : Number,
        require : true
    },
    totalDiscountAmount : {
        type : Number,
        require : true,
    },
    discountCoupon : [{type : String}]

}, {timestamps:true});


const PurchaseHistory = mongoose.models.PurchaseHistory ||  mongoose.model("PurchaseHistory", purchaseSchema);

export default PurchaseHistory;

