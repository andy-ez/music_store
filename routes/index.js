var path = require('path'),
    Album = require(path.resolve(path.dirname(__dirname), "local_modules/album_node_module"));

/* GET home page. */
module.exports = function(router){
  router.get('/', function(req, res, next) {
    res.render('index', { albums: Album.get() });
  });
};

