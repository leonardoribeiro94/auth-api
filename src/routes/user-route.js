"use-strict";
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-controller");
const authService = require("../services/auth-service");

//routers
router.post("/", userCtrl.post);
router.post("/authenticate", userCtrl.authenticate);
router.post("/refresh-token", authService.authorize, userCtrl.refreshToken);

module.exports = router;