const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

/* 
*@requiring routers
*/
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.route")

// Using Routers 
// Creating APIs

app.use("/api/auth",authRouter)
app.use("/api/post",postRouter)
app.use("/api/users",userRouter)

module.exports = app