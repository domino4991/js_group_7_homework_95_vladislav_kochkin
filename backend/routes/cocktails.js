const router = require('express').Router();
const config = require('../config');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Cocktail = require('../models/Cocktail');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const cocktails = await Cocktail
            .find()
            .populate('user', 'displayName username role -_id');
        if(cocktails.length === 0) return res.status(404).send({error: 'Нет ни одного рецепта коктеля'});
        return res.send(cocktails);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.get('/users', [auth], async (req, res) => {
    try {
        const cocktails = await Cocktail
            .find({user: req.user._id})
            .populate('user', 'displayName username role -_id');
        if(cocktails.length === 0) return res.status(404).send({error: 'У вас нет ни одного добавленного коктейля'});
        return res.send(cocktails);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id).populate('user', 'displayName role -_id');
        if(!cocktail) return res.status(404).send({error: 'Коктель не найден'});
        return res.send(cocktail);
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.post('/', [auth, upload.single('cocktailImage')], async (req, res) => {
    try {
        const cocktail = new Cocktail({
            user: req.user._id,
            cocktailName: req.body.cocktailName,
            recipe: req.body.recipe,
            ingredients: JSON.parse(req.body.ingredients)
        });
        if(req.file) cocktail.cocktailImage = req.file.filename;
        await cocktail.save();
        return res.send({message: 'Коктель будет добавлен после модерации'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.put('/:id/score', auth, async (req, res) => {
    try {
        const cocktail = await Cocktail
            .findById(req.params.id);
        if(!cocktail) return res.status(404)
            .send({error: 'Коктейль не найден'});
        const scoreIndex = cocktail.rating
            .findIndex(score => score.user === req.user.username);
        if(scoreIndex === -1) {
            cocktail.rating.push(req.body)
        } else {
            cocktail.rating[scoreIndex].score = req.body.score ?
                req.body.score : cocktail.rating[scoreIndex].score;
        }
        await Cocktail.findOneAndUpdate({_id: req.params.id}, cocktail);
        return res.send({message: 'Спасибо за Ваш голос!'});
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

router.put('/:id/publish', [auth, permit('admin')], async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        cocktail.isPublished = !cocktail.isPublished;
        await cocktail.save();
        return res.send({message: `Коктель ${cocktail.cocktailName} ${cocktail.isPublished ? 'опубликован' : 'cнят с публикации'}`});
    } catch (e) {
        return res.status(422).send(e);
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const cocktail = await Cocktail.findOneAndRemove({_id: req.params.id}, {new: true});
        if(!cocktail) return res.status(404).send({error: 'Коктель не найден'});
        return res.send({message: `Коктель ${cocktail.cocktailName} удалён`});
    } catch (e) {
        return res.status(500).send({error: 'Eternal Server Error'});
    }
});

module.exports = router;