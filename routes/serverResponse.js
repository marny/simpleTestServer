
/*
 * GET serverResponse listing.
 */

exports.ok = function(db){
  return function(req, res) {
    var id = req.params.id || req.body.id;;
    readDb(id, "ok", res, db);
  };
};

exports.notOk = function(db){
  return function(req, res) {
  var id = req.params.id  || req.body.id;
  readDb(id, "notOk", res, db);
};
};

exports.delay = function(db){
  return function(req, res) {
    var id = req.params.id  || req.body.id;
  var delay = req.params.delay  || req.body.delay;
  var timeout = delay || 5000; 
  setTimeout(function(timeoutObj) {
      readDb(id, "delay", res, db);
  }, timeout);
};
};


function readDb(serverId, type, res, db) {
  var collection = db.get('servers');
  collection.findOne({serverid: serverId, type: type}).on('success', function(doc) {
    if (doc != null) {
      res.send(doc.response);      
    } else {
      res.send(404, "id and type not found");      
    }
    
  });
} 


