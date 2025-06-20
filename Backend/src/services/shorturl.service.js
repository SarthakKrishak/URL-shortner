import urlSchema from '../models/shorturl.models.js';
import { generateNanoId } from '../utils/helper.js';

export const shortUrlService = async (url) => {
    const shortUrl = generateNanoId(7);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    });
    try {
        await newUrl.save();
        return shortUrl;
    } catch (error) {
        console.error("Error saving to DB:", err);
        return res.status(500).send("Server error");
    }
}