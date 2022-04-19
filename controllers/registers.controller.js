const {
  createRegister,
  getAllRegisters,
  getRegister
} = require('../services/registers.services');
const {
  SuccessResponse,
  CreatedResponse,
} = require('../utilities/core/ApiResponse');
const exec = require('../utilities/core/catchAsync');

/**
 * @description A method to handle creating an applicant
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.createRegister = exec(async (req, res) => {
  /**
   * data needed to create a new user
   */
  const data = req.body;

  /**
   * Calling the createApplicant service to handle all the needed business
   *  logic for creating an applicant
   */
  const response = await createRegister(data);
  /**
   * returning a successful response if the user sign up is successfully
   */
  new CreatedResponse('Applicant created successfully', response).send(res);
});

/**
 * @description A static method to handle retrieving an applicant
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.getRegister = exec(async (req, res) => {
  /**
   * data needed to create a new user
   */
  const {
    id
  } = req.params;

  /**
   * Calling the getApplicant service to handle all the needed business
   *  logic for retrieving an applicant
   */
  const response = await getRegister(id);
  /**
   * returning a successful response if applicant details is retrieved successfully
   */
  new SuccessResponse(
    "Applicant details retrieved successfully",
    response
  ).send(res);
});

/**
 * @description A static method to handle retrieving all applicants
 * @param req - The request object representing the HTTP request
 * @param res - The response object representing the HTTP response
 * @returns {*}
 */
exports.getAllRegisters = exec(async (req, res) => {
  
  /**
   * Calling the getAllApplicants service to handle all the needed business
   *  logic for retrieving all applicants
   */
  const response = await getAllRegisters(id);
  /**
   * returning a successful response if all applicant details is retrieved successfully
   */
  new SuccessResponse(
    "Applicants details retrieved successfully",
    response
  ).send(res);
});
