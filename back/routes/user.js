const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const emailCtrl = require("../middleware/emailCtrl");

router.post("/signup", emailCtrl, userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", auth, userCtrl.deleteUser);
router.get("/:id", userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);

module.exports = router;
