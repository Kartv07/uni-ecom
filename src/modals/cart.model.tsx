import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    // The user field will corresponds to user data model for now i am keeping it a normal field.
    userId : {
        type : String,
        required : true,
        default : "usr000"
    },
    itemsData : [{
        itemId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Item",
            required : true,
        },
        itemQuantity : {
            type : Number,
            required : true
        }
    }]
}, {timestamps: true});

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;