import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // User will also have his personal details but for now i am not defining in my modal that is irrelavent to the assignment.
    orderCount : {
        type : Number,
        required : true
    },
    disCountCpn : {
        type : String,
    }
}, {timestamps : true})

const User = mongoose.model("User", userSchema);
export default User;