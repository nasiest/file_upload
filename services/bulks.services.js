const {
    BadRequestError,
    InternalError,
    NotFoundError,
    DuplicateDataError
} = require('../utilities/core/ApiError');

const { createApplicants } = require('./queries/applicants');
const csvToJson = require('csvtojson');
const path = require('path');
const fs = require('fs');
const {
    query
} = require('../models/index');

const createApplicant = async(data)=> {
    const checkApplicant = 'SELECT email FROM applicants WHERE email = ?';
    const checkApplicantResult = await query(checkApplicant, [data.email]);
    // check if applicant alread exists with provided email
    if (checkApplicantResult.length > 0 && checkApplicantResult[0].email) {
        console.error("-----------DUPLICATE EMAIL ERROR----------")
        throw new DuplicateDataError("Applicant's email already exists. Proceed to login or create job application for applicant");
    }

    const applicantQuery = 'INSERT INTO applicants SET ?';
    let applicantQueryResult = await query(applicantQuery, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        country: data.country,
    });

    if (applicantQueryResult.affectedRows !== 1){
        console.error("-----------APPLICANT CREATION ERROR----------")
        throw new InternalError("An error occurred. Please try again later.");
    } 

    const newApplicantQuery = 'SELECT id FROM applicants WHERE id = ?';
    const applicant = await query(newApplicantQuery, [applicantQueryResult.insertId]);


    const applicationQuery = 'INSERT INTO applicant_applications SET ?';
    let applicationQueryResult = await query(applicationQuery, {
        job_role: data.job_role,
        notice_period: data.notice_period,
        salary: data.salary,
        experience: data.experience,
        resume: data.resume,
        cover_letter: data.cover_letter,
        status: data.status,
        applicant_id: applicant[0].id,
    });

    if (applicationQueryResult.affectedRows !== 1) {
        console.error("-----------APPLICATION CREATION ERROR----------")
        throw new InternalError("An error occurred. Please try again later.");
    }
        

    const nwqApplicationQueryResult = 'SELECT id FROM applicant_applications WHERE id = ?';
    const application = await query(nwqApplicationQueryResult, [applicationQueryResult.insertId]);

    for(const item of data.job_availability) {
        const jobAvailabilityQuery = 'INSERT INTO job_availability SET ?';
        // eslint-disable-next-line no-await-in-loop
        await query(jobAvailabilityQuery, {
            job_availability: item,
            application_id: application[0].id,
        });
    }

    for (const item of data.job_type) {
        const jobTypeQuery = 'INSERT INTO job_type SET ?';
        // eslint-disable-next-line no-await-in-loop
        await query(jobTypeQuery, {
            job_type: item,
            application_id: application[0].id,
        });
    }
    /**
     * return applicant object
     */
    return {
        id: application[0].id,
        email: data.email,
    };
}

const createBulkService = async({ body, file })=>{
    try {
        const appl = await csvToJson().fromFile(file.path);
        console.log({ appl });
        console.log({ body, file });
        fs.unlinkSync(file.path);
    } catch (error) {
        throw new Error(error);
    }
}

const fetchApplicantService = async({body, query, file}) =>{
    try {
        const { name, email, password } = body;
        // const fetchApplicants = `SELECT * FROM applicants`
        // const insertQuery = `INSERT INTO applicants (name, email, password) VALUES($1, $2, $3) WHERE id = ?`
        const applicants = await query(createApplicants, [id, email, password]);
        return applicants; 
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    createBulkService,
    createApplicant
}