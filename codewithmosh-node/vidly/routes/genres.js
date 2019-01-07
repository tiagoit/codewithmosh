const express = require('express');
const router = express.Router();
const {Genre, validate} = require('../models/genres');

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id)
        if(!genre) return res.status(404).send("Genre with this ID not found");
        res.send(genre);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.post('/', async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    })

    try {
        const result = await genre.save();
        console.log('INSERTED: ', result);
        return res.send(genre);
    } catch (ex) {
        for(field in ex.errors) {
            console.log(ex.errors[field]);
        }
        return res.status(404).send(ex.errors);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);    
        genre.set({ name: req.body.name });
        genre.save();
        return res.send(genre);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findOneAndDelete({ _id: req.params.id });
        if(!genre) return res.status(404).send('The genre with the given ID was not found.');
        return res.send(genre);
    } catch (error) {
        return res.status(404).send(error);
    }
});

module.exports = router;