db.test.find({})
    .projection({})
    .sort({ _id: -1 })
    .limit(0)


db.test.find({ age: { $gte: 18, $lte: 30 } }).projection({ age: 1, name: 1 })

db.test.find({ age: { $gte: 18, $lte: 30 } }).project({ age: 1, name: 1 }).sort({ age: 1 })

//? implicit $and
db.test.find({ gender: "Female", age: { $gte: 18, $lte: 30 } }, { age: 1, gender: 1 }).sort({ age: 1 })

db.test.find({ gender: "Female", age: { $nin: [18, 20, 22, 24] } }, { age: 1, gender: 1 }).sort({ age: 1 })

db.test.find({ gender: "Female", age: { $in: [18, 20, 22, 24, 26] } }, { age: 1, gender: 1 }).sort({ age: 1 })


db.test.find({ gender: "Female", age: { $nin: [18, 20, 22, 24, 26] }, interests: { $in: ["Cooking", "Gaming"] } }, { age: 1, gender: 1, interests: 1 }).sort({ age: 1 })

//? Explicit $and
db.test.find({
    $and: [
        { gender: "Female" },
        { age: { $ne: 15 } },
        { age: { $lte: 30 } }

    ]
}).project({
    age: 1,
    gender: 1
}).sort({ age: 1 })

//? Explicit $or
db.test.find({
    $or: [
        // { gender: "Female" },
        // { age: { $ne: 15 } },
        // { age: { $lte: 30 } }
        { interests: "Traveling" },
        { interests: "Cooking" }

    ]
}).project({
    //? age: 1,
    //? gender: 1
    interests: 1
}).sort({ age: 1 })


db.test.find({
  "skills.name" : {$in: ["JAVASCRIPT", "PYTHON"]}
}).project({
    //? age: 1,
    //? gender: 1
    skills: 1
}).sort({ age: 1 })


db.test.find({company: {$exists: true}})


db.test.find({ age: { $type: "number" } })
db.test.find({ friends: { $type: "array" } })

db.test.find({ company: { $type: "null" } })

db.test.find({ friends: { $size: 0 } }).project({friends: 1, name: 1})



db.test.find({
    interests: {$all: ["Cooking", "Gaming", "Reading"]}
}).projection({interests: 1})


db.test.find({
    skills: { $elemMatch: {
        name: "JAVASCRIPT",
        level: "Intermidiate"
    } }
}).project({skills: 1})



//? Updte Related Query

db.test.updateOne({
    _id: ObjectId("6406ad63fc13ae5a40000069")
}, {
    $set: {
        age: 80
    }
}, {

})

db.test.updateOne({
    _id: ObjectId("6406ad63fc13ae5a40000069")
}, {
    $addtoSet: {
        interests: "Travelling"
    }
}, {

})

db.test.updateOne({
    _id: ObjectId("6406ad63fc13ae5a40000069")
}, {
    $addtoSet: {
        interests: { $each: ["Travelling", "Driving"] }
    }
}, {

})


//? remove a field with update mehtod 

db.test.updateOne({_id: ObjectId("6406ad65fc13ae5a400000c7")},{$unset:{birthday: ""}})

//? remove a element from an array (by pop system) --- value 1 means last item poping and -1 means first item poping 

db.test.updateOne({_id: ObjectId("6406ad65fc13ae5a400000c7")},{$pop:{friends: 1}})

//? using pull system for remove a specific item from an array

db.test.updateOne({_id: ObjectId("6406ad65fc13ae5a400000c7")},{$pull:{friends: "Fahim Ahmed Firoz"}})

//? multiple pulling system

db.test.updateOne({_id: ObjectId("6406ad65fc13ae5a400000c7")},{$pullAll:{friends: ["Fahim Ahmed Firoz", "Mir Hussain"]}})

db.test.updateOne({ _id: ObjectId("6406ad65fc13ae5a400000c7") }, { $set: {
    "address.city" : "dhaka",
    "address.country": "bangladesh"
} })

db.test.updateOne({ _id: ObjectId("6406ad65fc13ae5a400000c7"), "education.major" : "Philosophy" }, { $set: {

} })


db.test.updateOne({ _id: ObjectId("6406ad65fc13ae5a400000c7") }, { $inc: {
  age: 1
} })


//? start learning delete method

//? delete a object from a collection

db.test.deleteOne({_id: ObjectId("6406ad65fc13ae5a400000c7")})

//? create a new collection
db.createCollection("posts")

//? delete a collection form db
db.posts.drop()



db.test.find({age: {$gt: 30}})
    .projection({name: 1, email: 1})
    .sort({_id:-1})
    .limit(0)

db.test.find({favoutiteColor: {$in: ["Maroon", "Blue"]}})

db.test.find({"skills.name": {$all: ["JAVASCRIPT", "JAVA"]}}, {"skills.name": 1})

db.test.find({email: "amuccurry3@cnet.com"})

db.test.updateOne({email: "ammuccurry3@cnet.com"}, {$addToSet: {skills: {"name": "Python", "level": "Beginner", "isLearning": true}}})





