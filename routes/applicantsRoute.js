const express = require('express');

const ApplicantData = require('../controllers/applicant_details')

const router = express.Router();

router.post("/", ApplicantData.save);
router.get("/", ApplicantData.index);
router.get("/:id", ApplicantData.show);
router.patch("/:id", ApplicantData.update);
router.delete("/:id", ApplicantData.destroy);

module.exports = router;