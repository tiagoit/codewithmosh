const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
]

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id)

    if(!course) return res.status(404).send('The course with the given ID was not found.');

    res.send(course);
});

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
    if(error === null) {
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
    
        courses.push(course);
    
        res.send(course);
    } else return res.status(404).send(error.details[0].type);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');

    const { error } = validateCourse(req.body);
    if(error === null) {
        course.name = req.body.name
        res.send(course);
    } else return res.status(404).send(error.details[0].type);
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

module.exports = router;