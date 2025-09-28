import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    question: { type: String },
    answer: { type: String },
    role: {
      type: String,
      enum: ["user", "cohere", "database", "error"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
