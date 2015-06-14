// These publications are needed to be able to control the data in the client
// side. Of course, a different approach is needed for private data.
Meteor.publish("Books", function(params, options){
  return Books.find(params, options);
});
Meteor.publish("Authors", function(params, options){
  return Authors.find(params, options);
});
