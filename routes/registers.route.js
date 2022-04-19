const express = require('express');
/**
 * Joi schema validation methods
 */
const {
    createRegisterSchema,
    getRegisterSchema
} = require('../utilities/validator/schemas/register');

const {
    createRegister,
    getAllRegisters,
    getRegister
} = require('../controllers/registers.controller')

const router = express.Router();

router.post("/register", createRegisterSchema(), createRegister);
router.get("/register", getAllRegisters);
router.get("/register:id", getRegisterSchema(), getRegister);
// router.patch("/:id", RegisterData.update);
// router.delete("/:id", RegisterData.destroy);

module.exports = router;