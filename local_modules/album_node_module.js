var fs = require('fs'),
    path = require('path'),
    file_path = path.resolve(path.dirname(__dirname), "data/albums.json");

function getAlbums(){
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function nextID(){
  return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id + 1;
}

function writeAlbums(data){
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

var Album = {
  get: function(){
    return getAlbums();
  },
  set: function(albums_array){
    var id = nextID();
    writeAlbums({last_id: id, data: albums_array});
  },
  getLastID: function(){
    return nextID() - 1; 
  }
}

module.exports = Album;