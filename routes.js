const express = require("express");
const router = express.Router();
const authController = require("./Controller/userController");

router.get("/", authController.getLoginPage);
router.get("/auth", authController.authenticateWithGoogle);
router.get("/auth/callback", authController.authCallback);
router.get("/auth/callback/success", authController.authSuccess);
router.get("/auth/callback/failure", authController.authFailure);

module.exports = router;
