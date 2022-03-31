const router = require('express').Router();
const applicants = require('./applicants.route');
const admins = require('./admins.route');

router.use('/applicants', applicants);
router.use('/admins', admins);

module.exports = router;