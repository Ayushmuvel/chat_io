//start_chat
const express = require("express");
const router = express.Router();
const { login } = require("../controller/login_contrl")

router.post('/', login, (req, res, next) => {});

module.exports = router;