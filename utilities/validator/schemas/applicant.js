const Joi = require('joi');
const validator = require('../schemaValidation');

const payload = Object.freeze({
QUERY: 'req.query',
PARAMS: 'req.params',
BODY: 'req.body',
});

/**
 * @description defines the req.body schema for creating an applicant
 * @return {function(*=, *, *): void}
 */
function createApplicantSchema() {
    return (req, res, next) => {
        const bodySchema = Joi.object({
            first_name: Joi.string().lowercase().trim().required().messages({
                'any.required': "Applicant's first name was not provided",
            }),
            last_name: Joi.string().lowercase().trim().required().messages({
                'any.required': "Applicant's last name was not provided",
            }),
            phone_number: Joi.string().trim().required().messages({
                'any.required': "Applicant's phone number was not provided",
            }),
            email: Joi.string().email().lowercase().required().messages({
                'any.required': "Applicant's email address was not provided",
            }),
            country: Joi.string().lowercase().required().messages({
                'any.required': "Applicant's country was not provided",
            }),
            job_role: Joi.string().required().messages({
                'any.required': "Applicant's job role was not provided",
            }),
            notice_period: Joi.string().lowercase().required().messages({
                'any.required': "Applicant's notice period was not provided",
            }),
            salary: Joi.number().required().messages({
                'any.required': "Applicant's salary expectations was not provided",
            }),
            experience: Joi.string().lowercase().required().messages({
                'any.required': "Applicant's experience level was not provided",
            }),
            job_availability: Joi.array().items(
                Joi.string().required().messages({
                    'any.required': "Applicant's job availability was not provided",
                })
            ),
            job_type: Joi.array().items(
                Joi.string().required().messages({
                    'any.required': "Applicant's job type was not provided",
                })
            ),
            resume: Joi.string().lowercase().trim().required().messages({
                'any.required': "Applicant's phone number was not provided",
            }).messages({
                'any.required': "Applicant's resume was not provided",
            }),
            cover_letter: Joi.string().trim().required().messages({
                'any.required': "Applicant's cover letter was not provided",
            }),
            status: Joi.string()
                .lowercase()
                .trim()
                .required()
                .messages({
                    'any.required': "Applicantions status was not provided",
                }),
        });
        validator(req, [bodySchema], [payload.BODY]);
        next();
    };
}

/**
 * @description defines the req.params schema for retrieving an applicant
 * @return {function(*=, *, *): void}
 */
function getApplicantSchema() {
    return (req, res, next) => {
        const paramsSchema = Joi.object({
            id: Joi.string().lowercase().trim().required().messages({
                'any.required': "Applicant's id was not provided",
            })
        });
        validator(req, [paramsSchema], [payload.PARAMS]);
        next();
    };
}

module.exports = {
    createApplicantSchema,
    getApplicantSchema
};