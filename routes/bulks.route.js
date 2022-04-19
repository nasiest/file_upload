const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: './temp',
    filename: function(req, file, cb) {
        cb(null,'applicants'+'_' + Date.now()+'_'+ path.extname(file.originalname))
    }
});
const upload = multer({
    storage
});
/**
 * Joi schema validation methods
 */
const {
    createApplicantSchema,
    getApplicantSchema
} = require('../utilities/validator/schemas/applicant');

const {
    createBulk
} = require('../controllers/bulks.controller')

const router = express.Router();

router.post('/upload', upload.single('applicant'), createBulk);
// router.get("/bulk", getAllApplicants);
// router.get("/bulk/:id", getApplicantSchema(), getApplicant);
// router.patch("/:id", ApplicantData.update);
// router.delete("/:id", ApplicantData.destroy);

module.exports = router;