import { shortUrlService } from "../services/shorturl.service.js";
import urlSchema from "../models/shorturl.models.js"

export const createUrl = async (req, res) => {
  const { url } = req.body;
  const shortUrl = await shortUrlService(url);
  res.send(shortUrl).status(200);
};

export const redirectShortUrl = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Looking for:", id);

    const url = await urlSchema.findOne({ short_url: id });

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