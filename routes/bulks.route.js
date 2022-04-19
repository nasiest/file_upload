const express = require('express');
/**
 * Joi schema validation methods
 */
const CSVToJSON = require('csvtojson');
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

router.post("/upload", (req, res) => {
  
  (async () => {
    try {
        const users = await CSVToJSON().fromFile('users.csv');

        // log the JSON array
        console.log(users);

    } catch (err) {
        console.log(err);
    }
})();
});
router.get("/bulk", getAllApplicants);
router.get("/bulk:id", getApplicantSchema(), getApplicant);
// router.patch("/:id", ApplicantData.update);
// router.delete("/:id", ApplicantData.destroy);

module.exports = router;