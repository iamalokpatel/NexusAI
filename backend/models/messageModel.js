import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export default mongoose.model("Message", messageSchema);
