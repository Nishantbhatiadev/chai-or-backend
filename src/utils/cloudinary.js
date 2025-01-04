import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
        const response = cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file hass been uploaded successfully
        console.log("File uploaded successfully on cloudinary", response.url);
        return response.url;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the localy saced temporary file as the upload option failed
        return null;
    }
}


export default uploadOnCloudinary;
