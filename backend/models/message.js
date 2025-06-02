import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export default mongoose.model("Message", messageSchema);
