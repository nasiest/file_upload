const router = require('express').Router();
const applicants = require('./applicants.route');
const admins = require('./admins.route');
const bulks = require ('./bulks.route');



router.use('/applicants', applicants);
router.use('/admins', admins);
router.use('/upload', bulks);

module.exports = router;