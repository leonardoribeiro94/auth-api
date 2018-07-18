"use-strict";
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-controller");
const authService = require("../services/auth-service");

//routers
router.post("/", userCtrl.post);
router.post("/authenticate", userCtrl.authenticate);
router.post("/refresh-token", authService.authorize, userCtrl.refreshToken);
router.put("/update", authService.authorize, userCtrl.getAll);
router.get("/get", authService.authorize, userCtrl.getAll);

module.exports = router;