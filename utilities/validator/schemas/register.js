const Joi = require("joi")
const validator = require("../schemaValidation")

const payload = Object.freeze({
  QUERY: "req.query",
  PARAMS: "req.params",
  BODY: "req.body",
})

/**
 * @description defines the req.body schema for creating an applicant
 * @return {function(*=, *, *): void}
 */
function createRegisterSchema() {
  return (req, res, next) => {
    console.log("Hello", req.body)
    const bodySchema = Joi.object({
      first_name: Joi.string().lowercase().trim().required().messages({
        "any.required": "First name was not provided",
      }),
      last_name: Joi.string().lowercase().trim().required().messages({
        "any.required": "Last name was not provided",
      }),
      email: Joi.string().trim().required().messages({
        "any.required": "Email was not provided",
      }),
      password: Joi.string().email().lowercase().required().messages({
        "any.required": "Password address was not provided",
      }),
      confirm_password: Joi.string().lowercase().required().messages({
        "any.required": "Confirm_password was not provided",
      }),
      
    })
    validator(req, [bodySchema], [payload.BODY])
    next()
  }
}

/**
 * @description defines the req.params schema for retrieving an applicant
 * @return {function(*=, *, *): void}
 */
function getRegisterSchema() {
  return (req, res, next) => {
    const paramsSchema = Joi.object({
      id: Joi.string().lowercase().trim().required().messages({
        "any.required": "User's id was not provided",
      }),
    })
    validator(req, [paramsSchema], [payload.PARAMS])
    next()
  }
}

module.exports = {
  createRegisterSchema,
  getRegisterSchema,
}
