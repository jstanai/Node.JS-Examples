const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect', err))

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    tags: [ String ],
    date: Date
})

const Course = mongoose.model('Course', courseSchema)

async function getCourses() {
    const courses = await Course
        //.find({isPublished: true, tags: { $in: ['backend', 'frontend']} })
        .find({isPublished: true})
        .or([
            {price: {$gte: 15} }, 
            {name: /.*by.*/}
        ])
        .sort({ price: -1})
        //.sort('-price') //other syntax
        .select({ name: 1, author: 1, price: 1}) //filters what is returned
        //.select('name author') //other syntax

    return courses
}

async function run() {
    const courses = await getCourses();
    console.log(courses)
}

run()