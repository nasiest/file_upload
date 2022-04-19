const express = require('express');
/**
 * Joi schema validation methods
 */
const {
    createLoginSchema,
    getLoginSchema
} = require('../utilities/validator/schemas/login');

const {
    createLogin,
    getAllLogins,
    getLogin
} = require('../controllers/logins.controller')

const router = express.Router();

router.post("/login", createLoginSchema(), createLogin);
router.get("/login", getAllLogins);
router.get("/login:id", getLoginSchema(), getLogin);
// router.patch("/:id", LoginData.update);
// router.delete("/:id", LoginData.destroy);

module.exports = router;