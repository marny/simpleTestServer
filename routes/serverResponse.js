
/*
 * GET serverResponse listing.
 */

exports.ok = function(db){
  return function(req, res) {
    var id = req.params.id || req.body.id;;
    readDb(id, "ok", res, db, req);
  };
};

exports.notOk = function(db){
  return function(req, res) {
  var id = req.params.id  || req.body.id;
  console.log(req.body);
  readDb(id, "notOk", res, db, req);
};
};

exports.delay = function(db){
  return function(req, res) {
    var id = req.params.id  || req.body.id;
  var delay = req.params.delay  || req.body.delay;
  var timeout = delay || 5000; 
  setTimeout(function(timeoutObj) {
      readDb(id, "delay", res, db, req);
  }, timeout);
};
};


function readDb(serverId, type, res, db, req) {
  var collection = db.get('servers');
  collection.findOne({serverid: serverId, type: type}).on('success', function(doc) {
    if (doc != null) {
      callback(type, serverId, req.ip, true);  
      res.send(doc.response);
    } else {
      callback(type, serverId, req.ip, false);
      res.send(404, "id and type not found");       
    }
    
  });
} 

function callback(type, serverId, ip, status) {
    if (!stop) {
      iosocket.sockets.emit("log", {'type': type, 'id': serverId, 'caller': ip, 'status': status, 'action': 'request'});
      iosocket.sockets.emit("graph", {'type': type, 'id': serverId, 'caller': ip, 'status': status, 'action': 'request'});
    }
}


exports.info = function(req, res){
  console.log(req.headers);
  console.log(req.body);  
  iosocket.sockets.emit("info", {'body': req.body, 
                                  'header': req.header, 
                                  'ip': req.ip, 
                                  'contentType': req.get('Content-type'),
                                  'userAgent' : req.get('User-Agent'),
                                  'origin' : req.get('Origin'),
                                  'accept' : req.get('Accept')
                                });
  res.send("OK");
};