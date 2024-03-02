import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; 
import { SendToken } from "../utils/JwtToken.js"; 
import { uploadCloudnary } from "../Cloudnary/Cloudnary.js";


// resister a user

const Resister = asyncHandler( async (req,res , error) => {
   

   
  const {name , email , password} = req.body;
 
  
  const existedUser =  await User.findOne({email})

  if (existedUser ) {
    throw new ApiError(409,"user with email already exist")
  }
   
if (!req.files[0].path) {
  throw new ApiError(500 , "avatar not Found !!!");
}

    const avatar = await uploadCloudnary(req.files[0].path)

   

    if (!avatar) {
      console.log("here is the problem")
    }



  const user = await User.create({
    name , email , password ,
    avatar:{
        public_id: avatar.public_id,
        url:avatar.url,
    }
  })

  SendToken( user,201,res);

});

const LoginUser = asyncHandler(async (req, res,next) => {
 
  const { email , password } = req.body;
  

  if (!email || !password) {
     return next( new ApiError(400, "Please Enter Email and Password"));
  }

  const user = await User.findOne({email}).select("+password");
  
 
  if (!user) {
    return next(new ApiError("Invalid Email and Password !!!"));
    
  }

  const isPasswordCorrect = await user.compairePassword(password);


  if (!isPasswordCorrect) {
    return next(new ApiError(400,"Invalid Email and Password"));
  }

 
 
SendToken(user , 200 ,res)
 });
    

const LogoutUser = asyncHandler(async (req,res , next) => {

  res.cookie("token",null,{
    expire: new Date(Date.now()),
    httpOnly: true, 
  })

  res.status(200).json({
    success: true,
    message: "logout successfully !!!"
});
});

// const ForgetPassword = asyncHandler( async (req,res,next) => {

//   const user = await User.findOne({email:req.body.email});
  

//   if (!user) {
//     return next(new ApiError(404 , "user not found"));
    
//   }

//   const resetToken =  user.ResetPassword();

 
//   await user.save({validateBeforeSave: false}); 


//   const resetPasswordURL = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;


//   const message = `your password reset token is :- \n\n ${resetPasswordURL} \n\n if you have not requested this email then please ignore it `;

//   // try {
   
//     await sendEmail({
//       email:user.email,
//       subject:"Fanscart password recovery",
//       message,
//     });
  
//     res.status(200).ApiResponse(`E mail send to ${user.email} successfully send`);
  

//   // } catch (error) {
//   //   user.resetPasswordToken = undefined;
//   //   user.resetPasswordExpire= undefined;

//   //   await user.save({validateBeforeSave: false});
  
//   //   return next (new ApiError(error,500))
    
//   // }
     
  
   
// });



// Get user Details

const GetUserDetails = asyncHandler(async (req, res,next) => {

   const  user = await User.findById(req.user._id);
  


    res.status(200).json({
      success:true,
      user
    })

  });
   
const ResetPassword = asyncHandler(async (req,res,next) =>{

 
   const  user = await User.findById(req.user.id).select("+password");

   const isPasswordCorrect = await user.compairePassword(req.body.oldPassword);

   if (!isPasswordCorrect) {
    
    return next(new ApiError(400,"old Password is incorrect !!!"));
   }

   if(req.body.newPassword !== req.body.confirmPassword){
     
    return next(new ApiError(400,"Password does not match"));
   }

   user.password = req.body.newPassword;

   await user.save();

   SendToken(user , 200 ,res);

})

const UpdateUserProfile = asyncHandler(async (req,res,next) => {

 

   const UpdateUser = {
    name: req.body.name,
    email: req.body.email,
   }

   const  user = await User.findByIdAndUpdate(req.user.id, UpdateUser, { new: true, runValidators:true ,useFindAndModify: false});
   res.status(200).json({
    success: true
   })


});

const AllUsers = asyncHandler(async(req,res) => {

  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  })
})

const FindUser = asyncHandler(async (req ,res ) =>{

  const user = await User.findOne({ email: req.params.email });
 


  res.status(200).json({
    success: true,
    user
  })
})

const updateRole = asyncHandler(async (req , res) =>{ 
  const newUser = {name: req.body.name,
  role: req.body.role
}



const user = await User.findByIdAndUpdate(req.params.id, newUser, {
  new: true,
  runValidators: true,
  useFindAndModify: false
});

  res.status(200).json({
    success: true,
    user
  });
});


const DeleteUser = asyncHandler(async (req,res , next) => {

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  
  await user.deleteOne(); // Use deleteOne() instead of remove()
  
  res.status(200).json({
    success: true,
  });
});



export { Resister , LoginUser ,LogoutUser, GetUserDetails , ResetPassword , UpdateUserProfile , AllUsers , FindUser ,DeleteUser , updateRole };