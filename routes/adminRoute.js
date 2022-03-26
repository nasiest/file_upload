const express = require('express');

const AdminData = require('../controllers/admin_controllers');


const router = express.Router();

router.post("/", AdminData.save);
router.get("/", AdminData.index);
router.get("/:id", AdminData.show);
router.patch("/:id", AdminData.update);
router.delete("/:id", AdminData.destroy);

module.exports = router;