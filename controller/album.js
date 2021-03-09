const client = require("../lib/mongolib");
const ObjectId = require("mongodb").ObjectID;

function Album() {
  const album = {};

  const connection = client
    .connect()
    .then((result) => result.db("vynils").collection("albums"));

  album.findAll = () => {
    return connection.then((c) => c.find({}).toArray());
  };

  album.findOne = (id) => {
    return connection.then((c) => c.findOne({ _id: ObjectId(id) }));
  };

  album.insertOne = (data) => {
    return connection.then((c) => c.insertOne(data));
  };

  album.replaceOne = (id, data) => {
    return connection.then((c) => c.replaceOne({ _id: ObjectId(id) }, data));
  };

  album.deleteOne = (id) => {
    return connection.then((c) => c.deleteOne({ _id: ObjectId(id) }));
  };

  return album;
}

module.exports = Album();
