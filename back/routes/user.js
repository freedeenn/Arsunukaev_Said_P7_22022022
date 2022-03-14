const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/delete/:id", auth, userCtrl.deleteUser);
router.get("/:id", userCtrl.getOneUser);
router.get("/users", auth, userCtrl.getAllUsers);

module.exports = router;
