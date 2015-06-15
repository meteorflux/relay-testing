// These publications are needed to be able to control the data in the client
// side. Of course, a different approach is needed for private data.
for (var i = 1; i < 10; i++) {
  Meteor.publish("Books" + i, function(params, options){
    return Books.find(params, options);
  });
  Meteor.publish("Authors" + i, function(params, options){
    return Authors.find(params, options);
  });
}
