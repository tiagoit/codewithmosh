const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Cannot connect to MongoDB: ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    // return await Course
    //     .find({ isPublished: true, tags: 'backend' })
    //     .sort({ name: 1 }) 
    //     .select({ name: 1, author: 1 });

    // return await Course
    //     .find({ isPublished: true })
    //     .or([{tags: 'backend'}, {tags: 'frontend'}])
    //     .sort({ price: -1 }) 
    //     .select({ name: 1, author: 1 });

    // return await Course
    //     .find({ isPublished: true, tags: { $in: ['frontend', 'backend']} })
    //     .sort({ price: -1 }) 
    //     .select({ name: 1, author: 1 });

    return await Course
        .find({ isPublished: true})
        .or([ { price: { $gte: 15} }, { name: /.*by.*/i }]);
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();