import stringSimilarity from "string-similarity";
import Message from "../models/message.js";
import { callCohere } from "../services/cohereService.js";

const SIMILARITY_THRESHOLD = 0.8;

// Handle message for a specific chat
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

    // Get previous messages for the chat
    const allMessages = await Message.find({ chatId });
    const allQuestions = allMessages
      .map((msg) => msg.question?.toLowerCase())
      .filter(Boolean);

    // If no messages yet, generate answer and save
    if (allQuestions.length === 0) {
      const answer = await callCohere(trimmedQuestion);
      const savedMessage = await Message.create({
        chatId,
        question: trimmedQuestion,
        answer,
      });
      return res.json({ from: "cohere", message: savedMessage });
    }

    const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(
      trimmedQuestion,
      allQuestions
    );

    // If similar question exists, return existing answer
    if (bestMatch.rating >= SIMILARITY_THRESHOLD) {
      return res.json({
        from: "database",
        message: allMessages[bestMatchIndex],
      });
    }

    // If not found, call Cohere and save new message
    const answer = await callCohere(trimmedQuestion);
    const savedMessage = await Message.create({
      chatId,
      question: trimmedQuestion,
      answer,
    });

    res.json({ from: "cohere", message: savedMessage });
  } catch (err) {
    console.error("Error in handleMessage:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all messages for a specific chat
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
