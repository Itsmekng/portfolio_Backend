import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { jwtDecode } from "jwt-decode"


const authorizeRoles = (...roles) => {
    return async (req,_,next) => {    
        const token = req.cookies.token;  // Assuming token is stored under 'token' key

        
    
        if (!token) {
            return next(new ApiError(401, "Please login to access this resource"));
        }
    
      
        const decode = jwtDecode(token)
        req.user = await User.findById(decode.id);

        

     if(!roles.includes(req.user.role)){
        return next(
        new ApiError(403,`Role: ${req.user.role} is not allowed to access this resource !!! `));
     }


    next();
    }
};

export { authorizeRoles }