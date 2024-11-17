import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  url: { type: String, required: true },
  fname: { type: String, required: true },
  mimetype: { type: String, required: true }
});

export default mongoose.model('File', fileSchema);
