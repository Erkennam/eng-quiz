import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserShema = new Schema({
    username: {type: String,required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    score: {type: Number,required: true},
    level: {type: Number, required: true},
    endless: {type: Number, required: true},
    image: {type: String},
})

const User = mongoose.model('User',UserShema);
export default User;