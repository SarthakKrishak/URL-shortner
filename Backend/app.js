import dotenv from "dotenv";
dotenv.config();
import urlSchema from "./src/models/shorturl.models.js"
import express from 'express'
import connectDB from './src/config/mongo.config.js';
import shortUrlRoute from "./src/routes/shortUrl.route.js";
import { redirectShortUrl } from "./src/controller/shortUrl.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Home page");
})

app.use("/api", shortUrlRoute);

app.get("/:id", redirectShortUrl)

app.listen(process.env.PORT || 5000, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
