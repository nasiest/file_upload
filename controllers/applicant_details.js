const models = require("../models")

function save(req, res) {
  const applicantDetails = {
    applicant_id: 1,
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
    status: req.body.status,
  }
  models.Applicant_Details.create(applicantDetails)
    .then(result => {
      res.status(201).json({
        message: "Applicant Profile created Successfully",
        applicantDetails: result,
      })
    })
    .catch(error => {
      console.log('Error', error)
      res.status(500).json({
        message: "Something went wrong!!!",
        error,
      })
    })
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
      console.log('Error', error)
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
    status: req.body.status,
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
      console.log('Error', error)
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
      console.log('Error', error)
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
