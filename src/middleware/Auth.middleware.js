import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { jwtDecode } from "jwt-decode"

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {

 
    const token = req.cookies.token

    if (!token) {
        return next(new ApiError(401, "Please login to access this resource !!!"));
    }

    try {
       
        // const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const decode = jwtDecode(token)
       
       req.user = await User.findById(decode.id);
    
        next();
    } catch (error) {
        // Handle JWT verification errors
        console.log(error)
        return next(new ApiError(401, "please Login !!!"));
    }
});



export { isAuthenticatedUser};