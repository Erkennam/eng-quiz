import express from 'express';
import User from '../schemas/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

router.post('/register', async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        const exist = await User.findOne({email});
        if(exist){
            return res.status(400).json({mesage: 'this user is exist'});
        }
        const hash = await bcrypt.hash(password,10);
        const user = new User({
            username,
            email,
            password:hash,
            score: 0,
            level: 1,
            endless: 0,
            image: '',
        });
        await user.save();
        res.json({message: 'пользователь успешно зарегистрирован'});
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: 'ошибка авторизаций' });
        }
        const compare = bcrypt.compare(password,user.password);
        if(!compare){
            return res.status(400).json({message: 'ошибка авторизаций'})
        }
        const token = jwt.sign({ _id: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

router.patch('/record', async (req, res) => {
    try {
        const { id, score, endless } = req.body;
        
        if (!id || (!score && !endless)) {
            return res.status(400).json({ message: 'ошибка данных' });
        }

        const updateData = {};
        if (score) updateData.score = score;
        if (endless) updateData.endless = endless;

        const update = await User.findByIdAndUpdate(id, updateData, { new: true });

        res.json({ message: 'новый рекорд', user: update });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/leaders', async(req,res)=>{
    try{
        const {id,score} = req.headers;
        const leaders = await User.find().limit(100).sort({score: -1});
        const higherRankedPlayers = await User.find({ 
            $or: [
              { score: { $gt: score } },
              { score: score, id: { $lt: id } }
            ]
        }).countDocuments();
        const yourRank = higherRankedPlayers + 1;
        if(!leaders){
            return res.status(400).json({message: 'ошибка'});
        }
        res.json({leaders,yourRank});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

router.patch('/setImage/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const {image} = req.body;
        if(!id || !image){
            return res.status(400).json({message: 'ошибка'});
        }
        const update = await User.findByIdAndUpdate(id,{image});
        if(!update){
            return res.status(400).json({message: 'ошибка профиль не найден'});
        }
        res.json({message: 'успешно измененно',update});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

export default router;