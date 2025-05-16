import dotenv from "dotenv";
dotenv.config({ path: "./.env" })

import express from 'express'
import { nanoid } from 'nanoid';
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/models/shorturl.models.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", async (req, res) => {
    const { url } = req.body;
    const shortUrl = nanoid(7);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    });

    try {
        await newUrl.save();
        res.send(shortUrl);
    } catch (err) {
        console.error("Error saving to DB:", err);
        res.status(500).send("Server error");
    }
});


app.get("/:id", async(req, res) => {
    const { id } = req.params;
    console.log("Looking for:", id);
    const url = await urlSchema.findOne({ short_url: id })
    console.log("Result:", url);
    if (url) {
        res.redirect(url.full_url)
    }
    else {
        res.status(404).send("Not found")
    }
})

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on http://localhost:5000");
})