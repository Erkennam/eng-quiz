import express from 'express';
import Level from '../schemas/level.js';
import User from '../schemas/user.js';

const router = express.Router();

router.get('/',async (req,res)=>{
    try{
        const levels = await Level.find({});
        res.json(levels);
    } catch (err) {
        console.log(err);
    }
})

router.get('/:level',async (req,res)=>{
    try{
        const {level} = req.params;
        const findLevel = await Level.findOne({level});
        if(!findLevel){
            res.status(404).json({message: 'ошибка загрузки уровня'});
            return
        }
        res.json({level: findLevel});
    } catch (err) {
        console.log(err);
    }
})

router.patch('/nextLevel',async (req,res)=>{
    try{
        const {id} = req.body;
        if(!id){
            res.status(400).json({message: 'ошибка'});
            return
        }
        const user = await User.findById(id);
        user.level++;
        user.save();
        res.json(user);
    } catch (err){
        console.log(err);
    }
})

export default router;