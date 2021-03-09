const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri, { useUnifiedTopology: true });

const testConnection = () => {
  client.connect().then((connection) => {
    connection
      .db("admin")
      .command({ ping: 1 })
      .then((response) => {
        console.log("connected", response);
      });
  });
};

testConnection();

module.exports = client;
