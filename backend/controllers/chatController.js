import Chat from "../models/Chat.js";

///////// Create new chat /////////
export const createChat = async (req, res) => {
  try {
    const { title, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const newChat = new Chat({
      title,
      userId,
    });

    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////// Get all chats of a user /////////
export const getChatsByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "UserId query parameter is required" });
    }

    const chats = await Chat.find({ userId });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////// Update chat by id /////////
export const updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////// Delete chat by id /////////
export const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedChat = await Chat.findByIdAndDelete(id);

    if (!deletedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
