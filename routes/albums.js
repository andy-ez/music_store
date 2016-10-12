var path = require('path'),
    Album = require(path.resolve(path.dirname(__dirname), "local_modules/album_node_module")),
    _ = require('underscore');

/* GET home page. */
module.exports = function(router){
  router.get('/albums/new', function(req, res, next){
    res.render('new', { albums: Album.get() });
  });

  router.post('/albums', function(req, res){
    var album = req.body,
        albums = Album.get();

    album.id = Album.getLastID();
    albums.push(album);
    Album.set(albums);
    res.json(album);
  });

  router.put('/albums', function(req, res){
    var albums = Album.get(),
        album = _.findWhere(albums, {id: req.body.id});
    for (prop in req.body){
      album[prop] = req.body[prop];
    }
    Album.set(albums);
    res.json(album);
  })

  router.delete('/albums', function(req, res){
    var albums = _.reject(Album.get(), function(album){
      album.id === req.body.id;
    })
    Album.set(albums);
    res.status(200).end();
  })
};

