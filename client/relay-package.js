
// A reactive variable to store all the fields needed for each collection
var fields  = new ReactiveObj({});

// A variable to control the number of times a GetList has been called.
// We use it to create a different subscription each time, so they don't
// compite with each other.
var subscriptionNumbers = {};
var subscriptionCollections = {};

// Adds a field to a collection
var addField = function (collection, field) {
  fields.set([collection, field], 1);
};

// This global helper retrieves a list of items to be consumed in an #each loop.
// For now, the collection and the subscription need to have the same name.
Template.registerHelper("GetList", function (kw) {

  var data = kw.hash, // Extract the data we pass to the helper.
      collection = data.listCollection,
      subscription = null,
      selector = {},
      optionsClient = {},
      optionsServer = {};


  // Create a new subscription for this GetList.
  if (!subscriptionNumbers[data.listName]) {
    subscriptionCollections[collection] =
      subscriptionCollections[collection] + 1 || 1;
    subscriptionNumbers[data.listName] =
      subscriptionCollections[collection];
  }
  subscription = collection + subscriptionNumbers[data.listName];

  // Extract each key and add check what to do with it.
  for (var key in _.omit(data, ['listName', 'listCollection'])) {
    // First we check if it's one of the mongo options.
    if (key === "limit"){
      optionsClient[key] = data[key];
      optionsServer[key] = data[key];
    } else if(key === "skip"){
      optionsServer[key] = data[key];
    } else if(key === "sortAsc"){
      optionsClient.sort = {};
      optionsClient.sort[data[key]] = 1;
      optionsServer.sort = {};
      optionsServer.sort[data[key]] = 1;
    } else if(key === "sortDesc"){
      optionsClient.sort = {};
      optionsClient.sort[data[key]] = -1;
      optionsServer.sort = {};
      optionsServer.sort[data[key]] = -1;
    } else {
      // If it is not, we add it to the selector.
      selector[key] = data[key];
      // And add it as a field to be able to do the "find" in the client.
      addField(collection, key);
    }
  }

  console.log(optionsServer);

  // Add all the fields (reactively).
  optionsClient.fields = fields.get(collection);
  optionsServer.fields = fields.get(collection);

  // Subscribe to the collection.
  Template.instance().subscribe(subscription, selector, optionsServer);

  // Return the same data.
  return window[collection].find(selector, optionsClient);
});

// This global helper adds a field to the subscription and return its value.
Template.registerHelper("GetListItem", function (collection, field) {
  addField(collection, field);
  var subfields = field.split(".");
  var result = Template.currentData();
  for (var i = 0; i < subfields.length; i++) {
    result = result[subfields[i]];
  }
  return result;
});
