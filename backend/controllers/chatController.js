import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  try {
    const { title = "Untitled Chat", userId = null } = req.body;

    const chat = await Chat.create({ title, userId });

    res.status(201).json({ chat: chat._id });
  } catch (err) {
    console.error("Error creating chat:", err);
    res.status(500).json({ error: "Failed to create chat" });
  }
};
