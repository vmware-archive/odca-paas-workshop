collections = require('./mongo').collections;
var ObjectID = require('mongodb').ObjectID;

//constructor
collections = function(database) {	this.database = database};

//get the specified collection from the database and persist it..

collections.prototype.getCollection = function (collectionName, callback)
{
	this.database.collection(collectionName, function(err,mycollection)
	{
		if(err) callback(err);
		else callback(null,mycollection);

	});

};

//get all the objects from the collection...
collections.prototype.findAll = function(collectionName, callback)
{
	this.getCollection(collectionName, function(err,mycollection)
	{
		if (err) callback(err);
		else {
			mycollection.find().toArray(function(err,results)
			{
				if (err) callback(err);
				else callback(null,results);

			});
		}

	});
};

//save new object
collections.prototype.save = function(collectionName, obj, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error)
      else {
        obj.created_at = new Date(); //B
        the_collection.insert(obj, function() { //C
          callback(null, obj);
        });
      }
    });
};

//Set specific Object from the collection.. 
collections.prototype.get = function(collectionName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"); //B
            if (!checkForHexRegExp.test(id)) callback({error: "invalid id"});
            else the_collection.findOne({'_id':ObjectID(id)}, function(error,doc) { //C
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

collections.prototype.delete = function(collectionName, entityId, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
        if (error) callback(error);
        else {
            the_collection.remove({'_id':ObjectID(entityId)}, function(error,doc) { //B
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

exports.collections = collections;
