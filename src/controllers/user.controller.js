import { asyncHAndler } from "../utils/asyncHAndler.js";



const registerUser = asyncHAndler(async (req, res) => {
    res.status(200).json({
        message: "User registered successfully"
    })
})


export { registerUser };