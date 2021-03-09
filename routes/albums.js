const express = require("express");
const router = express.Router();
const Joi = require("joi");
const album = require("../controller/album");

const Album = require("../controller/album");

router.get("/", function (req, res, next) {
  Album.findAll().then((result) => {
    res.send(result);
  });
});

router.get("/:id", function (req, res, next) {
  Album.findOne(req.params.id).then((result) => {
    if (result === null)
      return res.status(404).send("The album with the given id was not found.");
    res.send(result);
  });
});

router.post("/", function (req, res, next) {
  const { error } = validateAlbum(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { name, description } = req.body;

  Album.insertOne({ name, description }).then((result) => {
    res.send(result.ops[0]);
  });
});

router.put("/:id", function (req, res, next) {
  const { error } = validateAlbum(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  album.replaceOne(req.params.id, req.body).then((result) => {
    if (result.modifiedCount === 0)
      return res.status(404).send("The album with the given id was not found.");
    res.send(result.ops[0]);
  });
});

router.delete("/:id", function (req, res, next) {
  Album.deleteOne(req.params.id).then((result) => {
    if (result.deletedCount === 0)
      return res.status(404).send("The album with the given id was not found.");
    res.status(204).send();
  });
});

const validateAlbum = (album) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(album);
};

module.exports = router;
