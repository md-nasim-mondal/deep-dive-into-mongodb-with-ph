// ? aggregate learning start
db.test.aggregate([
  // stage-1
  { $match: { gender: "Male", age: { $lt: 30 } } },
  // stage - 2
  { $project: { name: 1, age: 1, gender: 1 } },
]);

db.test.aggregate([
  // stage-1
  { $match: { gender: "Male" } },
  // stage-2
  { $addFields: { course: "level-2", eduTech: "Programming Hero" } },
  // stage-3
  { $project: { course: 1, eduTech: 1 } },
  // stage-4
  // {$out: "course-students"}
  { $merge: "test" },
]);

//? grouping system start

db.test.aggregate([
  // stage - 1
  { $group: { _id: "$gender" } },
]);

db.test.aggregate([
  // stage - 1
  { $group: { _id: "$address.country" } },
]);

db.test.aggregate([
  // stage - 1
  { $group: { _id: "$age", count: { $sum: 1 } } },
]);

db.test.aggregate([
  // stage - 1
  { $group: { _id: "$address.country", amakeDekhaoName: { $push: "$name" } } },
]);

db.test.aggregate([
  // stage - 1
  { $group: { _id: "$address.country", fullDoc: { $push: "$$ROOT" } } },
  // stage - 2
  {
    $project: {
      "fullDoc.name": 1,
      "fullDoc.email": 1,
      "fullDoc.phone": 1,
    },
  },
]);

db.test.aggregate([
  // stage - 1
  {
    $group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
      maxSalary: { $max: "$salary" },
      minSalary: { $min: "$salary" },
      avgSalary: { $avg: "$salary" },
    },
  },
  // stage - 2
  {
    $project: {
      totalSalary: 1,
      maxSalary: 1,
      minSalaray: 1,
      averageSalary: "$avgSalary",
      rangeBetweenMaxAndMin: { $subtract: ["$maxSalary", "$minSalary"] },
    },
  },
]);

//? group is not work on an array so we should use unwind

db.test.aggregate([
  //stage - 1
  {
    $group: { _id: "$friends" },
  },
]);

//? start learning about unwind

db.test.aggregate([
  // stage -1
  { $unwind: "$friends" },
  //stage - 2
  {
    $group: { _id: "$friends", count: { $sum: 1 } },
  },
]);

db.test.aggregate([
  // stage - 1
  {
    $unwind: "$interests",
  },
  //  stage - 2
  {
    $group: {
      _id: "$age",
      interestsPerAge: {
        $push: "$interests",
      },
    },
  },
]);

//? start learning about bucket in mongodb

db.test.aggregate([
  // stage - 1
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [20, 40, 60, 80],
      default: "80 up people",
      output: {
        count: { $sum: 1 },
        kekeAche: { $push: "$name" },
        fullInfoOfPeople: { $push: "$$ROOT" },
      },
    },
  },

  // stage - 2
  {
    $sort: { count: -1 },
  },
  // stage - 3
  {
    $limit: 2,
  },
  // stage - 4
  {
    $project: { count: 1 },
  },
]);
