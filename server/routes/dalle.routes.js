import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai"; // Adjust the import path based on your version

dotenv.config();

const router = express.Router();

// Initialize OpenAI client with the correct API version
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Use correct OpenAI method for generating images
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1, // Generate one image
      size: "1024x1024", // Image size
      response_format: "b64_json", // Return base64-encoded image
    });

    const image = response.data[0].b64_json; // Get the image from the response

    res.status(200).json({ photo: image }); // Send image back to client
  } catch (error) {
    console.error("Error generating image:", error);
    console.error("Error occurred during image generation:", error);

    // Check if error is from OpenAI API
    if (error.response) {
      console.error("OpenAI API responded with error:", error.response.data);
      return res.status(500).json({
        message: "OpenAI API error",
        error: error.response.data,
      });
    }

    // Other errors (network issues, etc.)
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});

export default router;
