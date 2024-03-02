import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
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