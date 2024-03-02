import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; 
import { ContactUs } from "../models/contactUs.model.js";




const Text = asyncHandler( async (req, res ) => {
    res.status(200).json({
        success: true
    })

})

const CreateMessage = asyncHandler( async (req , res , next) =>{

     const {name , email , desc }  = req.body;
 
  

     if (!(name && desc && email)) {
        return next(new ApiError(400 , "Name or desc is required !!!"))
        }

   await ContactUs.create({
    name, email , desc 
   })

        res.status(200).json({
            success: true
        })

        

})

const ReadMessage = asyncHandler( async ( req , res , next) =>{
   
    const contactus = await ContactUs.find().populate("userid");

    if (!contactus) {
        return next(new ApiError(404 , "No Message Found !!!"));
    };

    res.status(200).json({
        success: true,
        contactus
    });

});

const DeleteMessage = asyncHandler(async (req , res , next) =>{

    const messageid =  await ContactUs.findById(req.params.id);


    if (!messageid) {
        return next(new ApiError(404 , "something went wrong , wrong request"));
    };

    await messageid.deleteOne();

    res.status(201).json({
        success: true
    })

})

export { Text , CreateMessage ,ReadMessage , DeleteMessage };