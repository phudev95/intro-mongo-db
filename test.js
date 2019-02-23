const mongoose = require('mongoose');

// connect
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatever121212')
};

// create a schema
const student = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    }
});

const school = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [String]
});

// register schema as a collection called student
// it returned as a model that we can interract with inside or our application
const Student = mongoose.model('student', student);
const School = mongoose.model('school', school);

connect()
    .then(async connection => {
        const school = await School.create({ name: 'mlk elementry' });

        console.log('\r\n-------------------------');
        console.log(await mongoose.connection.dropDatabase());
        console.log('-------------------------\r\n');

        /* const school1 = {
            name: 'mlk def',
            openSince: 2009,
            students: 1000,
            isGreat: true,
            staff: ['a', 'b', 'c']
        };

        const school2 = {
            name: 'larry def',
            openSince: 1980,
            students: 600,
            isGreat: false,
            staff: ['v', 'b', 'z']
        };
 */
        //        const schools = await School.create([school1, school2]);
        /* const match = await School.find({
            //            students: {
            //                $gt: 500,
            //                $lt: 800
            //            }
            staff: {
                $in: ['v', 'a']
            }
        })
            .sort({
                openSince: 1
            })
            .exec();

        console.log('===========');
        console.log(match); */

    })
    .catch(e => console.error(e));

Student.f



//connect()
//    .then(async connection => {
//        const school = await School.create({name: 'mlk elementry'});
//        const student = await Student.create({firstName: 'Phu', school: school.id});
//        
//        const match = await Student.findById(student.id).populate('school').exec();
//
//        console.log('-===', match);
//    })
//    .catch(e => console.error(e));
