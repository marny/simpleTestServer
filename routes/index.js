
exports.index = function(req, res){
  res.render('index', { title: 'Simple Test Server' });
};

exports.serverList = function(db) {
    return function(req, res) {
        var collection = db.get('servers');
        collection.find({}, {sort: {serverid: 1, servertype: 1}}, function(e, docs){
            res.render('serverList', {
                serverList : docs, title: "List servers"
            });
        });
    };
};

exports.newServer = function(req, res){
  res.render('editServer', { title: 'Add New Server', 
  							server: {respones:"", 
										serverid:"", 
										serverType:"ok",
										description:""},
							action:"/addserver"});
};

exports.editServer = function(db) {
	return function(req, res){
		var id = req.params.id;
	
		 var collection = db.get('servers');
		  collection.findById(id).on('success', function(doc) {
		    if (doc != null) {
		    	console.log(doc.serverid);
		      res.render('editServer', { title: "Edit Server", 
		      							server: doc, 
		      							action:"/updateserver"});      
		    } else {
		      res.send(404, "Server not found");      
		    }
		  });
	};
};


exports.updateServer = function(db) {
    return function(req, res) {
        var serverId = req.body.serverid;
        var serverResponse = req.body.response;
        var serverType = req.body.serverType;
        var description = req.body.description;
    	if (serverId == null || serverType == null) {
    		res.status(404).end("missing id or server type");
    	} 
    	var collection = db.get("servers");
    	collection.findAndModify({query: {serverid: serverId, type: serverType},
    							update: {"response" : serverResponse,
    									 "serverid" : serverId,
    									 "type" : serverType,
            							"description" : description}});
        res.location("serverlist");
        res.redirect("serverlist");


    };
};

exports.deleteServer = function(db) {
	return function(req, res) {
		var serverId = req.params.id;
		var collection = db.get("servers");
		collection.remove({_id: serverId});
        res.location("serverlist");
        res.redirect("serverlist");
	};
};

exports.addServer = function(db) {
    return function(req, res) {
        var serverId = req.body.serverid;
        var serverResponse = req.body.response;
        var serverType = req.body.serverType;
        var description = req.body.description;

        if (serverId == null || serverType == null) {
        	res.status(404).end("missing id or server type");
        } else {
	        var collection = db.get('servers')
	        collection.findOne({serverid: serverId, type: serverType}).on('success', function(doc) {
	        	if (doc != null) res.status(404).end("id and type exist");
	        	else {
			        collection.insert({
			            "serverid" : serverId,
			            "response" : serverResponse,
			            "type" : serverType,
			            "description" : description
			        }, function (err, doc) {
			            if (err) {
			                res.send("There was a problem adding the information to the database.");
			            }
			            else {
			                res.location("serverlist");
			                res.redirect("serverlist");
			            }
			        }); 		
				}

			});
		}
	}
};