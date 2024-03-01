import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Project } from "../models/project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadCloudnary } from "../Cloudnary/Cloudnary.js";


const CreateProject = asyncHandler( async (req , res , next) =>{
  
 
        const { name , desc , url  }  = req.body;

        if (!( name && desc && url)) {
                return next(new ApiError(400, "all details compulsory !!!"));
        };

        if (!req.files[0].path) {
                next(new ApiError(500 , "Project Image not Found !!!"));
              }
              
              
    const ProjectImg = await uploadCloudnary(req.files[0].path)

    if (!ProjectImg) {
        console.log("Project Image is required")
      }

        const project = await Project.create({
                name,
                desc,
                url,
                projectImg:{
                        public_id: ProjectImg.public_id,
                        url: ProjectImg.url,
                    }

        })

        res.status(200).json({
                successs: true,
                project
        })

})

const AllProject = asyncHandler( async ( req , res , next) =>{


        const allproject = await Project.find().populate('likes.users' ,"email");
    

        if (!allproject) {
                return next(new ApiError(400 , "Projects Not Found !!!"));
        }



        res.status(200).json( new  ApiResponse(200, allproject))
})

const DeleteProjects = asyncHandler( async( req , res , next ) =>{

        const project =  await Project.findById(req.params.id);


        if (!project) {
            return next(new ApiError(404 , "something went wrong , wrong request"));
        };
    
        await project.deleteOne();
    
        res.status(201).json({
            success: true
        })
    
})

const LikeAndDislike = asyncHandler( async (req , res , next) =>{
     
     const userId = req.user._id
   


  if (!userId) {
        return next(new ApiError(400 , "Please login to access this source"));
  }

  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Check if the user already liked the project
    const alreadyLiked = project.likes.users.includes(userId);

    

    if (alreadyLiked) {
      // If user already liked, remove the like
      project.removeLike(userId);
    } else {
      // If user didn't like, add the like
      project.addLike(userId);
    }

    // Save the updated project
    await project.save();

    return res.json({ message: 'Like updated successfully', liked: !alreadyLiked });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});





export { CreateProject  , AllProject , DeleteProjects , LikeAndDislike};
