const Validator = require('fastest-validator'); 
const models = require("../models")

function save(req, res) {
  const applicantDetails = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    phone_number: req.body.phone_number,
    country: req.body.country,
    job_role: req.body.job_role,
    notice_period: req.body.notice_period,
    salary: req.body.salary,
    experience: req.body.experience,
    resume: req.body.resume,
    cover_letter: req.body.cover_letter,
    status: req.body.status,
    job_type_id: req.body.job_type_id,
    // availabilty_id: req.body.availabilty_id
  }
// Data validation for creating Applicant_Details. . .
  const schema = {
    first_name: {type: "string", optional: false, max: "45"},
    last_name: {type: "string", optional: false, max: "45"},
    email_address: {type: "string", optional: false, max: "45"},
    phone_number: {type: "string", optional: false, max: "15"},
  }

  const v  = new Validator();
  const validationResponse = v.validate(applicantDetails, schema);

  if(validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      error: validationResponse
    });
  }

  models.Job_Type.findByPk(req.body.job_type_id).then(result => {
    if(result !== null){
      models.Applicant_Details.create(applicantDetails)
      .then(result => {
        // retrieve the applicant details_id returned in the result and perform the following queries . ..
        // --- perform a job_type insertion associated with the applicant details_id
        // --- perform a job_availability insertion associated with the applicant details_id 
  
        res.status(201).json({
          message: "Applicant Profile created Successfully",
          applicantDetails: result,
        })
      })
      .catch(error => {
        console.log('ERROR', error);
        res.status(500).json({
          message: "Something went wrong!!!",
          error,
        });
      })
    } else{
      res.status(400).json({
        message: "Invalid ID !!!"
      });
    }
  });

 
}

// Getting a single Applicant data . . .
function show(req, res) {
  const id = req.params.id

  models.Applicant_Details.findByPk(id)
    .then(result => {
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({
          message: "Applicant's Profile not found!!!",
        })
      }
    })
    .catch(error => {
      res.status(500).json(error)
      message: "Something Went Wrong!!!"
    })
}

// Getting all Applicants' Profile . . .
function index(req, res) {
  models.Applicant_Details.findAll()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(error => {
      res.status(500).json({
        message: "Something Went Wrong!!!",
      })
    })
}

// Updating Applicant's profile . . .
function update(req, res) {
  const id = req.params.id

  const updatedApplicantProfile = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    phone_number: req.body.phone_number,
    country: req.body.country,
    job_role: req.body.job_role,
    notice_period: req.body.notice_period,
    salary: req.body.salary,
    experience: req.body.experience,
    resume: req.body.resume,
    cover_letter: req.body.cover_letter,
    status: req.body.status,
  }

  // Data validation for Updating Applicant_Details. . .
  const schema = {
    first_name: {type: "string", optional: false, max: "45"},
    last_name: {type: "string", optional: false, max: "45"},
    email_address: {type: "string", optional: false, max: "45"},
    phone_number: {type: "string", optional: false, max: "15"},
  }

  const v  = new Validator();
  const validationResponse = v.validate(updatedApplicantProfile, schema);

  if(validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      error: validationResponse
    });
  }
  models.Applicant_Details.update(updatedApplicantProfile, {
    where: { id: id },
  })
    .then(result => {
      res.status(200).json({
        message: "Applicant's Profile Updated Successfully !!!",
        applicantData: updatedApplicantProfile,
      })
    })
    .catch(error => {
      res.status(200).json({
        message: "Something went wrong . . .",
        error: error,
      })
    })
}

// Deleting an Applicant's profile . . .
function destroy(req, res) {
  const id = req.params.id

  models.Applicant_Details.destroy({ where: { id: id } })
    .then(result => {
      res.status(200).json({
        message: "Applicant's Profile deleted Successfully !!!",
      })
    })
    .catch(error => {
      res.status(200).json({
        message: "Something went wrong . . .",
        error: error,
      })
    })
}

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destroy: destroy,
}
