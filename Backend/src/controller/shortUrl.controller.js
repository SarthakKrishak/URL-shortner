import { shortUrlService } from "../services/shorturl.service.js";
import urlSchema from "../models/shorturl.models.js"

export const createUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const shortUrl = await shortUrlService(url);

    if (!shortUrl) {
      throw new Error("Short URL not found");
    }
    res.status(200).send(shortUrl);
  } catch (error) {
    next(error)
  }
};

export const redirectShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Looking for:", id);

    //we are incrementing the clicks directly here.
    const url = await urlSchema.findOneAndUpdate({ short_url: id }, { $inc: { clicks: 1 } });

    if (url) {
      let redirectUrl = url.full_url;

      // ("VVIMP") Ensure the URL has http or https
      if (!/^https?:\/\//i.test(redirectUrl)) {
        redirectUrl = 'https://' + redirectUrl;
      }

      console.log("Redirecting to:", redirectUrl);
      res.redirect(redirectUrl);
    } else {
      console.log("URL not found for ID:", id);
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error during URL redirection:", error.message);
    res.status(500).send("Internal Server Error");
  }
};