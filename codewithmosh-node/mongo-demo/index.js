const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Cannot connect to MongoDB: ', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    subcategory: {
        type: String,
        required: true,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.lenght > 0;
                    callback(result);
                }, 3000);
            },
            message: 'Subcategory does not exist.'
        }
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                const ret = v && v.length > 0;
                return ret;
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        category: 'web',
        tags: ['backend', 'frontend'],
        isPublished: true,
        // subcategory: '',
        price: 20
    });
    
    try {
        const result = await course.save();
        console.log('INSERTED: ', result);
    } catch (ex) {
        for(field in ex.errors) {
            console.log(ex.errors[field]);
        }
    }
}

async function getCourses() {
    // ############################# SIMPLE QUERY ################
    // const courses = await Course.find();
    // const courses = await Course.find({ author: 'Mosh' });
    // const courses = await Course.find({ author: 'Mosh', isPublished: true });
    // const courses = await Course
    //     .find({ author: 'Mosh' })
    //     .limit(10)
    //     .sort({ name: 1 }) // 1 = ascending order | -1 = descending order // .sort('name') || .sort('-name')
    //     .select({name: 1, tags: 1}); // .select('name tags')

    // ############################# COMPARISON QUERY OPERATORS ################
    // eq = equal (=)
    // ne = not equal (!=)
    // gt = greater than (>)
    // gte = greater than or equal to (>=)
    // lt = less than (<)
    // lte = less than or equal to (<=)
    // in
    // nin = not in

    // const courses = await Course.find({ price: { $gte: 10, $lte: 15} });
    // const courses = await Course.find({ price: { $in: [10, 15, 20]} });

    // ############################# LOGICAL QUERY OPERATORS ################
    // const courses = await Course.find().or([{ author: 'Mosh' }, { isPublished: true }]); // or
    // const courses = await Course.find().and([{ author: 'Mosh' }, { isPublished: true }]); // and

    // ############################# QUERY WITH REGULAR EXPRESSIONS ################
    // const courses = await Course.find({ author: /^Mosh/}); // Starts with Mosh
    // const courses = await Course.find({ author: /Hamedani$/}); // Ends with Hamedani
    // const courses = await Course.find({ author: /Hamedani$/i}); // Ends with Hamedani + case insenditive
    // const courses = await Course.find({ author: /.*Mosh.*/}); // Contains Mosh

    // ############################# COUNTING ################
    // const courses = await Course.find({ author: 'Mosh'}).count();

    // ############################# PAGINATION ################
    const pageNumber = 2;
    const pagesize = 10;

    const courses = await Course
        .find({ author: 'Mosh'})
        .skip((pageNumber -1 ) * pagesize)
        .limit(pagesize);

    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    // course.isPublished = true;
    // course.author = 'Another author';
    
    course.set({
        isPublished: true,
        author: 'Another author'
    });
    
    const result = await course.save();
    console.log(result);
}

async function directlyUpdateCourse(id) {
    // const result = await Course.update(
    //     { _id: id },
    //     { $set: {
    //         name: 'NodeJS Course Updated',
    //         isPublished: false
    //     }
    // });
    
    const result = await Course.findByIdAndUpdate(id, { 
        $set: {
            author: 'Jack',
            isPublished: false
        }
    }, { new: true });
    console.log(result);
}

async function deleteCourse(id) {
    // const result = await Course.deleteOne({ _id: id});
    // console.log(result);
    
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

// getCourses();
createCourse();
// updateCourse('5baf7e8969b2ec33088cec2a');
// directlyUpdateCourse('5baf7e8969b2ec33088cec2a');
// deleteCourse('5baf7e8969b2ec33088cec2a');