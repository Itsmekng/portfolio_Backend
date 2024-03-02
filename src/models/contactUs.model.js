import { mongoose } from "mongoose";

const contactUsSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true,"name is required !!!"],
    },

   userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },

    email:{
        type: String,
    },

    desc:{
        type: String,
        required: true

    }





},{timestamps: true,})

export const  ContactUs = mongoose.model("ContactUs",contactUsSchema)