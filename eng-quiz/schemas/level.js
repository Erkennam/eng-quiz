import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const word = new Schema({
    english: {type: String, required: true},
    russian: {type: String, required: true},
})

const LevelSchema = new Schema({
    level: {type: Number,required: true},
    words: [word],
})

const Level = mongoose.model('Level', LevelSchema);

export default Level;