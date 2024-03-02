import { Router } from "express"; 
import { authorizeRoles } from "../middleware/AuthoUser.middleware.js";
import { isAuthenticatedUser } from "../middleware/Auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { CreateMessage, DeleteMessage, ReadMessage, Text } from "../controllers/contactUs.controller.js";

const router = Router()


router.route("/test").get(Text);

router.route("/CreateMessage").post( CreateMessage);

router.route("/ReadMessage").get( isAuthenticatedUser ,authorizeRoles("Admin"),ReadMessage);

router.route("/DeleteMessage/:id").delete( isAuthenticatedUser,authorizeRoles("Admin"),DeleteMessage);

export default router; 