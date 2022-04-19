const Joi = require("joi")
const validator = require("../schemaValidation")

const payload = Object.freeze({
  QUERY: "req.query",
  PARAMS: "req.params",
  BODY: "req.body",
})

/**
 * @description defines the req.body schema for creating a user
 * @return {function(*=, *, *): void}
 */
function createLoginSchema() {
  return (req, res, next) => {
    console.log("Hello", req.body)
    const bodySchema = Joi.object({
      
      email: Joi.string().trim().required().messages({
        "any.required": "Email was not provided",
      }),
      password: Joi.string().email().lowercase().required().messages({
        "any.required": "Password address was not provided",
      }),
      
      
    })
    validator(req, [bodySchema], [payload.BODY])
    next()
  }
}

/**
 * @description defines the req.params schema for retrieving a user
 * @return {function(*=, *, *): void}
 */
function LoginSchema() {
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
  createLoginSchema,
  getLoginSchema,
}
