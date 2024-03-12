import { Router } from "express"; 
import { AllUsers, DeleteUser, FindUser, GetUserDetails, LoginUser, LogoutUser, Resister, UpdateUserProfile, newsletter, updateRole } from "../controllers/user.controller.js";
import { ResetPassword } from "../controllers/user.controller.js";
import { authorizeRoles } from "../middleware/AuthoUser.middleware.js";
import { isAuthenticatedUser } from "../middleware/Auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route("/resister").post(upload.any([{ name: 'avatar' }]),Resister); 

router.route("/LoginUser").post(LoginUser); 

router.route("/LogoutUser").get( isAuthenticatedUser,LogoutUser);

router.route("/GetUserDetails").get( isAuthenticatedUser,GetUserDetails);

router.route("/ChangePassword").post( isAuthenticatedUser,ResetPassword);
    
router.route("/updateDetails").post( isAuthenticatedUser,authorizeRoles("Admin"),UpdateUserProfile);

router.route("/AllUsers").get( isAuthenticatedUser, authorizeRoles("Admin"),AllUsers);

router.route("/FindUser/:email").get(  isAuthenticatedUser,authorizeRoles("Admin"), FindUser);

router.route("/UpdateRole/:id").put( isAuthenticatedUser,authorizeRoles("Admin"), updateRole);

router.route("/DeleteUser/:id").post( isAuthenticatedUser,authorizeRoles("Admin"), DeleteUser);

router.route("/Newletter/:email").post( isAuthenticatedUser,newsletter)

export default router; 