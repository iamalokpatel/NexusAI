import stringSimilarity from "string-similarity";
import Message from "../models/message.js";
import { callCohere } from "../services/cohereService.js";

const SIMILARITY_THRESHOLD = 0.8;

///////// Handle message for a specific chat /////////
export const handleMessage = async (req, res) => {
  try {
    const { question, chatId } = req.body;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({ error: "Invalid question input" });
    }

    if (!chatId) {
      return res.status(400).json({ error: "chatId is required" });
    }

    const trimmedQuestion = question.trim().toLowerCase();
    const allMessages = await Message.find({});
    const allQuestions = allMessages
      .map((msg) =>
        typeof msg.question === "string" ? msg.question.toLowerCase() : null
      )
      .filter((q) => typeof q === "string" && q.trim() !== "");

    if (allQuestions.length > 0) {
      const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(
        trimmedQuestion,
        allQuestions
      );

      if (bestMatch.rating >= SIMILARITY_THRESHOLD) {
        const reusedAnswer = allMessages[bestMatchIndex].answer;
        const savedMessage = await Message.create({
          chatId,
          question: trimmedQuestion,
          answer: reusedAnswer,
          role: "database",
        });

        return res.json({
          from: "database",
          message: savedMessage,
        });
      }
    }

    const answer = await callCohere(trimmedQuestion);

    const savedMessage = await Message.create({
      chatId,
      question: trimmedQuestion,
      answer,
      role: "cohere",
    });

    res.json({ from: "cohere", message: savedMessage });
  } catch (err) {
    console.error("Error in handleMessage:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//////// Get all messages for a specific chat /////////
export const getMessagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({ error: "chatId parameter is required" });
    }

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error in getMessagesByChat:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
