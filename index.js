import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import postRouter from "./routes/postRouter.js"
import bodyParser from "body-parser";
import cors from "cors"

const app = express()
app.use(cors());

dotenv.config()

const port = process.env.PORT
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`connected to mongoDb at ${port}`))
    .catch((error) => console.log(error))

app.listen(port, () => console.log(`post listen at ${port}`))

// using router

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/post", postRouter)



