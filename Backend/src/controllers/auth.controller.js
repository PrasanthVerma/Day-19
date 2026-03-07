const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
    const { username, email, password, bio, profileImg } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already Exists" + (isUserAlreadyExist.email == email ? " Email Already Exists" : " username already exists")
        })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImg
    })
    const token = jwt.sign({
        id: user._id,
        username : user.username
    }, process.env.JWT_SECRET, { expiresIn: "1hr" })

    res.cookie("token", token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })

    res.status(200).json({
        message: "User created successfully",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImg: user.profileImg
    })
}

async function loginController(req, res) {
    // console.log("LOGIN ATTEMPT - req.body:", req.body);
    const { username, email, password } = req.body

    const rawLoginId = username || email || "";
    const loginId = rawLoginId.trim();
    // console.log("LOGIN ATTEMPT - loginId:", loginId);

    if (!loginId || !password) {
        return res.status(400).json({
            message: "Username/Email and password are required"
        })
    }

    try {
        const user = await userModel.findOne({
            $or: [
                { username: loginId },
                { email: loginId }
            ]
        }).select("+password") // include password field in the result

        if (!user) {
            return res.status(401).json({
                message: "User does not exists"
            })
        }

        const isPswdValid = await bcrypt.compare(password, user.password)

        if (!isPswdValid) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({
            id: user._id,
            username:user.username
        }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.cookie("token", token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })

        return res.status(200).json({
            message: "user Logged in successfully",
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImg: user.profileImg,
            userId:user._id
        })
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Internal server error during login"
        })
    }
}



async function getmeController(req, res) {

    const user = await userModel.findById(req.userId)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImg: user.profileImg
    })
}

module.exports = {
    registerController,
    loginController,
    getmeController

}