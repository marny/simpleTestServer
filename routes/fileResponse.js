
/*
 * GET fileResponse listing.
 */

exports.ok = function(req, res){
  var id = req.params.id;
  readFile(id + '.ok.txt', res);
};


exports.notOk = function(req, res){
  var id = req.params.id;
  readFile(id + '.not.ok.txt', res);
};

exports.delay = function(req, res){
    var id = req.params.id;
  var delay = req.params.delay;
  var timeout = delay || 5000; 
  setTimeout(function(timeoutObj) {
      readFile(id + '.delay.txt', res);
  }, timeout);
};


function readFile(fileName, res) {
  fs.readFile(path.join(__dirname, 'static')+fileName, 'utf-8', function(err, data) {
    if (err) res.send(404, 'Sorry, response could not be found!');
      res.send(data);
   });
} 
