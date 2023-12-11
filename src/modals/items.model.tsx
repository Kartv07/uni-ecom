import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName : {
        type : String,
        require : true
    },
    itemDescription : {
        type : String,
        require : true
    },
    itemPrice : {
        type : Number,
        require : true
    }
}, {timestamps : true});

const item = mongoose.models.Item || mongoose.model("Item",itemSchema);
export default item;