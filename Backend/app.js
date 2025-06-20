import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import connectDB from './src/config/mongo.config.js';
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { redirectShortUrl } from "./src/controller/shortUrl.controller.js";
import {errorHandler} from "./src/utils/errorHandler.js"
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use("/api", shortUrlRoute);

app.get("/:id", redirectShortUrl)

app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
