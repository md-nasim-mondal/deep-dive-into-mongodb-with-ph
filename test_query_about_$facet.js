db.test.aggregate([
  {
    $facet: {
      // pipline - 1
      friendsCount: [
        // stage -1
        {
          $unwind: "$friends",
        },
        // stage - 2
        {
          $group: { _id: "$friends", count: { $sum: 1 } },
        },
      ],
      // pipeline - 2
      educattionCount: [
        // stage -1
        {
          $unwind: "$education",
        },
        // stage - 2
        {
          $group: { _id: "$education", count: { $sum: 1 } },
        },
      ],
      // pipeline - 3
      skllsCount: [
        // stage -1
        {
          $unwind: "$skills",
        },
        // stage -2
        {
          $group: { _id: "$skills", count: { $sum: 1 } },
        },
      ],
    },
  },
]);
