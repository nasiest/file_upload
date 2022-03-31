const express = require('express');
/**
 * Joi schema validation methods
 */
const {
    createApplicantSchema,
    getApplicantSchema
} = require('../utilities/validator/schemas/applicant');

const {
    createApplicant,
    getAllApplicants,
    getApplicant
} = require('../controllers/applicants.controller')

const router = express.Router();

router.post("/", createApplicantSchema(), createApplicant);
router.get("/", getAllApplicants);
router.get("/:id", getApplicantSchema(), getApplicant);
// router.patch("/:id", ApplicantData.update);
// router.delete("/:id", ApplicantData.destroy);

module.exports = router;