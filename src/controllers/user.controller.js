import { asyncHAndler } from "../utils/asyncHAndler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.models.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

// get user details from frontend
// validation - not empty
// check if user exists: username, email
// file upload: avatar, coverImage
// upload to cloudinarym avtar
// create user object - cretae entry in db
// remove password and refreshToken from response
// check for user creation
// return response to frontend
const registerUser = asyncHAndler(async (req, res) => {

    const { userName, email, fullName, password } = req.body
    console.log("email", email);
    // .................................................................
    if (
        [userName, email, fullName, password].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "Please fill all fields")
    }
    // .................................................................
    const existedUser = User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }
    // .................................................................

    const avtarLocalPath =  req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avtarLocalPath || !coverImageLocalPath) {
        throw new ApiError(400, "Please upload avatar and cover image")
    }
    // .................................................................

    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverimage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar || !coverimage) {
        throw new ApiError(500, "Failed to upload image")
    } 
    //.................................................................

    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        fullName,
        password,
        avatar: avatar.url,
        coverimage: coverimage.url  
    })

    const createdUser =  await User.findById(user._id).select("-password -refreshToken")
    //.................................................................

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user")
    }
    //.................................................................

    res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully") 
    )
})


export { registerUser };