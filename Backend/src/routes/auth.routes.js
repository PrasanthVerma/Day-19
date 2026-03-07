const express = require("express")
const authRouter = express.Router()
const controllers = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")


authRouter.post("/register", controllers.registerController)
authRouter.post("/login", controllers.loginController)
authRouter.get("/getme", identifyUser, controllers.getmeController)



module.exports = authRouter