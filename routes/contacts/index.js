const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validQueryContact,
  validCreateContact,
  validUpdateContact,
  validObjectId,
} = require("./validation");
const guard = require("../../helper/guard");

router
  .get("/", guard, validQueryContact, ctrl.getAll)
  .post("/", guard, validCreateContact, ctrl.addContact);

router
  .get("/:id", guard, validObjectId, ctrl.getById)
  .put("/:id", guard, validObjectId, validUpdateContact, ctrl.update)
  .delete("/:id", guard, validObjectId, ctrl.remove);

router.patch(
  "/:id/favorite",
  guard,
  validObjectId,
  validUpdateContact,
  ctrl.updateFavorite
);

module.exports = router;
