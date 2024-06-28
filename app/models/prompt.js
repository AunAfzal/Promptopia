import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  authorEmail: {
    type: String,
    required: true,
    validate: {
      validator: (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: 'Invalid email format',
    },
  },
  promptText: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
});

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', promptSchema);
export default Prompt;
