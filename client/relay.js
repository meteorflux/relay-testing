
// A reactive variable to store all the fields needed for each collection
var fields  = new ReactiveObj({});

// This global helper retrieves a list of items to be consumed in an #each loop.
// For now, the collection and the subscription needs to have the same name.
Template.registerHelper("GetList", function (collection) {
  var options = { fields: fields.get(collection) };
  Template.instance().subscribe(collection, {}, options);
  return window[collection].find({}, options);
});

// This global helper adds a field to the subscription and return its value.
Template.registerHelper("GetItem", function (collection, field) {
  fields.set([collection, field], 1);
  return Template.currentData()[field];
});
