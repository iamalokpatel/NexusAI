import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export default mongoose.model("Message", messageSchema);
