const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

router
  .route("/")
  .post(contacts.create)
  .delete(contacts.deleteAll)
  .get(contacts.findAll);

router.route("/favorite").get(contacts.findAllFavorite);

router
  .route("/:id")
  .get(contacts.findOne)
  .put(contacts.update)
  .delete(contacts.delete);

module.exports = router;
