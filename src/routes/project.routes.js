import { Router } from "express"; 
import { authorizeRoles } from "../middleware/AuthoUser.middleware.js";
import { isAuthenticatedUser } from "../middleware/Auth.middleware.js";
import { AllProject, CreateProject, DeleteProjects, LikeAndDislike } from "../controllers/project.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route("/CreateProject").post( upload.any([{ name: 'projectImg' }])  ,isAuthenticatedUser,authorizeRoles("Admin"),CreateProject);

router.route("/AllProject").get(AllProject);

router.route("/DeleteProject/:id").post( isAuthenticatedUser ,authorizeRoles("Admin") ,DeleteProjects);

router.route("/LikeAndDislike/:id").put( isAuthenticatedUser , LikeAndDislike);

export default router; 