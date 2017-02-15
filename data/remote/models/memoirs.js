import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MemoirSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    unique: true
  },
  content: {
    type: String,
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  lastModified: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('Memoir', MemoirSchema);
