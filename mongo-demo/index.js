const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect', err))


const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    categories: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'node']
    },
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length >0
                    callback(result)
                }, 1000) 
            },
            message: 'The course should have at least one tag.'
        }
    },
    date: {type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished }
    }
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Ang course ',
        author: 'jared',
        categories: '-',
        tags: [],
        isPublished: true,
        price: 10
    })
    
    try {
        const result = await course.save()
        console.log(result)
    } catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field]) 
        }
    }
}

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal)
    // lt, lte
    // in
    // nin (not in)
    
    // /api/courses?pageNumber=2&pageSize=10 (real world endpoint)
    const pageNumber = 2;
    const pageSize = 10;
    

    const courses = await Course
        //.find({ author: 'jared'})
        //.find({ price: {$gt: 10, $lte: 20} })
        //.find({ price: {$in: [10, 15, 20]} })
        //.find().or([{ author: 'jared'  },{ isPublished: true  }])
        //.find().and([{ author: 'jared'  },{ isPublished: true  }])
        
        // Starts with j
        //.find({author: /^j/})

        // ends with d 
        //.find({author: /d$/})

        // ends with d (case insensitive)
        //.find({author: /d$/i})

        // contains jared 
        //.find({author: /.*jared.*/})
        .find()
        .skip((pageNumber - 1)*pageSize) //pagination
        .limit(pageSize)
        .sort({ name: 1})
        //.select({ name: 1, tags: 1}) //filters what is returned
        .count() // counts docs that match this filtering/query

    console.log(courses)
}

createCourse();



async function updateCourse(id) {
    //approach: query first
    // findby id
    // modify props
    // save()

    const course = await Course.findById(id)
    console.log('here')
    if (!course) return
    //set option 1
    //course.isPublished = true;
    //course.author = 'Another Author'
    
    //set option 2
    course.set({
        isPublished: true,
        author: 'Another Author'
    })

    const result = await course.save()
    console.log(result)

    //approach: update first
    // update directly
    // optionally: get the updated doc

    const result2 = await Course.update({ _id: id },{
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    })

    // returns original document before update operation
    const course2 = await Course.findByIdAndUpdate(id,{
        $set: {
            author: 'Jack',
            isPublished: true
        }
    })

    // returns updated document
    const course3 = await Course.findByIdAndUpdate(id,{
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, {new: true})

    console.log(result2)
    console.log(course2)
    console.log(course3)
}

//updateCourse('5bbdac920353b58752ef32c6')


async function removeCourse(id) {
    // deletes only one if query object returns multiple docs
    //const resultR = await Course.deleteOne({ _id: id }) 

    const course = await Course.findByIdAndRemove(id)
    console.log(course)
}

//removeCourse('5bbdac920353b58752ef32c6')