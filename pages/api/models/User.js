import mongoose, { Schema } from "mongoose";

const userSchemas = new Schema({
    name: String,
    age: Number,
})
mongoose.models = {};
export const User = mongoose.model("User",userSchemas);