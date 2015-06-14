Meteor.startup(function() {
  var herman, antoine;
  if (!Authors.findOne()){
    herman = Authors.insert({
      name: "Herman Melville",
      death: 1981
    });
    antoine = Authors.insert({
      name: "Antoine de Saint-Exupéry",
      death: 1944
    });
  }
  if (!Books.findOne()){
    Books.insert({
      name: "Moby Dick",
      desc: "Ishmael narrates the monomaniacal quest of Ahab, captain of the " +
      "whaler Pequod, for revenge on Moby Dick, a white whale which on a " +
      "previous voyage destroyed Ahab's ship and severed his leg at the knee.",
      author: herman
    });
    Books.insert({
      name: "Le Petit Prince",
      desc: "The Little Prince is a poetic tale, with watercolour " +
      "illustrations by the author, in which a pilot stranded in the desert " +
      "meets a young prince fallen to Earth from a tiny asteroid.",
      author: antoine
    })
  }
});
