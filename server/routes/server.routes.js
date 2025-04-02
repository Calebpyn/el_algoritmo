const { Router } = require("express");

const router = Router();

const { todayNotes } = require("../controllers/server.controllers");

//GET
router.get("/notesis", todayNotes);

module.exports = router;
