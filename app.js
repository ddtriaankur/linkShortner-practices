//NOTES
// process.argv[2] = Name of the Database
// process.argv[3] = Name of the Collection
// process.argv[4] = Operation CRUD name
// process.argv[5] = _id of the document to be removed in delete mode, name of the doc to be 'updated' mode
// process.argv[6] = new document name

//

var mongo = require('mongodb').MongoClient
var option = process.argv[4] ;  // read, insert

/*
	READ DOCUMENTS
*/

var mongo = require('mongodb').MongoClient;

// node app myproject link read
if(option === 'read') {
	mongo.connect('mongodb://localhost:27017/'+ process.argv[2], function(err, db) {
	        if(err) throw err;
					// console.log('Connected correctly to server');

	        // var collection = db.collection('link');
	        var collection = db.collection(process.argv[3]);

	        collection.find({}, {"_id": "0", "name": "1"})
	        .toArray(function(err, docs) {
	            if(err) throw err;

	            console.dir(docs);
	            db.close();
	        });
	});

}

/*
	INSERT DOCUMENTS
*/

// node app myproject link insert 
if (option === 'insert') {
  mongo.connect('mongodb://localhost:27017/'+ process.argv[2], function(err, db) {
      if(err) throw err;

      var collection = db.collection(process.argv[3]),
          obj = {_id: '2gGW7z', name: 'Inspected' };

      collection.insert(obj);

      console.log(JSON.stringify(obj));
      db.close();
	});

}

// node app myproject link delete 2gGw7z
if(option === 'delete' ){
	mongo.connect('mongodb://localhost:27017/'+ process.argv[2], function(err, db) {
	  	if(err) throw err;

	    var collection = db.collection(process.argv[3]);

	    collection.remove({
	        _id: process.argv[5]
	    }, function(err) {
	        if (err) throw err
	        db.close()
	    });
	});
}

// node app myproject link update oldName NewName
if(option == "update"){
	mongo.connect('mongodb://localhost:27017/' + process.argv[2], function(err, db) {
		    if(err) throw err;
		    var collection = db.collection(process.argv[3]);
	
		    collection.update({
		        name: process.argv[5]
		    },{
		        $set:{
		            name: process.argv[6]
		      }
		    }, function(err) {
		        if (err) throw err
		        console.log('done')
		        db.close()
		    });
		});
}

// complete all cases above
if(option === 'help') {

	// for(var i = 0; i<3 ; i++)console.log('try harder');

	console.log(' reading = node app myproject link read');
	console.log(' inserting = node app myproject link insert') 
	console.log(' deleting = node app myproject link delete 2gGw7z')
	console.log(' deleting = node app myproject link update oldName NewName')

}




