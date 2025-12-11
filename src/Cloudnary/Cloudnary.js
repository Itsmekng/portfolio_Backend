import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME || "dcroyhzxk" , 
  api_key: process.env.API_KEY || '565472262434835', 
  api_secret: process.env.API_SECRET || 'GvbDnNYcyTC8GwsSpl0v_u2TO9I'
});



const uploadCloudnary = async (localFilePath) => {

    try {
        if (!localFilePath) {
        } else{
          const response = await cloudinary.uploader.upload(localFilePath , {resource_type: "auto"})
            console.log( response.url ,"File Upload !!!")
            fs.unlinkSync(localFilePath)
            return response
        }   
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error, "error here !!!")
        return null
    }
}

export { uploadCloudnary }