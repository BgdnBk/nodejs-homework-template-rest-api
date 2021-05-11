const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const guard = require("../../helper/guard");

router.post("/register", ctrl.registr);
router.post("/login", ctrl.login);
router.post("/logout", guard, ctrl.logout);

module.exports = router;

// const { validAuth } = require("../contacts/validation");

// validAuth;
// validAuth;
