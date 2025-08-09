// db.getCollection("massive-data").createIndex({email: 1})
// db.getCollection("massive-data").createIndex({about: "text"})

db.getCollection("massive-data")
  .find({ $text: { $search: "dolor" } })
  .project({ about: 1 });
