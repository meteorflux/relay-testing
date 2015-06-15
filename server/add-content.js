Meteor.startup(function() {
  var herman, antoine;
  var date = Date.now();
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
      author: herman,
      tags: [
        "adventure",
        "classic"
      ],
      dates: {
        created: (date - 10000),
        published: date
      }
    });
    Books.insert({
      name: "Le Petit Prince",
      desc: "The Little Prince is a poetic tale, with watercolour " +
      "illustrations by the author, in which a pilot stranded in the desert " +
      "meets a young prince fallen to Earth from a tiny asteroid.",
      author: antoine,
      tags: [
        "classic"
      ],
      dates: {
        created: (date - 10000),
        published: date
      }
    });
    Books.insert({
      name: "Terre des Hommes",
      desc: "Wind, Sand and Stars (French title: Terre des hommes) is a "+
      " memoir by the French aristocrat aviator-writer Antoine de "+
      "Saint-Exupéry, and a winner of several literary awards.",
      author: antoine,
      tags: [
        "unkown"
      ],
      dates: {
        created: (date - 10000),
        published: date
      }
    });
  }
});
