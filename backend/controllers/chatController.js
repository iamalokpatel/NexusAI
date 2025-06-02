// controllers/chatController.js
import stringSimilarity from "string-similarity";
import Message from "../models/messageModel.js";
import { callCohere } from "../services/cohereService.js";

const SIMILARITY_THRESHOLD = 0.5;

export const handleChat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({ error: "Invalid question input" });
    }

    const trimmedQuestion = question.trim();

    const allMessages = await Message.find();
    const allQuestions = allMessages
      .map((msg) => msg.question)
      .filter((q) => typeof q === "string");

    if (allQuestions.length === 0) {
      const answer = await callCohere(trimmedQuestion);
      await Message.create({ question: trimmedQuestion, answer });
      return res.json({ from: "cohere", answer });
    }

    const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(
      trimmedQuestion,
      allQuestions
    );

    if (bestMatch.rating >= SIMILARITY_THRESHOLD) {
      return res.json({
        from: "database",
        answer: allMessages[bestMatchIndex].answer,
      });
    }

    const answer = await callCohere(trimmedQuestion);
    await Message.create({ question: trimmedQuestion, answer });

    res.json({ from: "cohere", answer });
  } catch (err) {
    console.error("Error in chatController:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
