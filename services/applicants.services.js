const {
    BadRequestError,
    InternalError,
    NotFoundError,
} = require('../utilities/core/ApiError');
const {
    query
} = require('../models/index');

async function createApplicant(data) {
    applicantQuery = 'INSERT INTO applicants SET ?';
    const result = await query(applicantQuery, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        country: data.country,
        job_role: data.job_role,
        notice_period: data.notice_period,
        salary: data.salary,
        experience: data.experience,
        resume: data.resume,
        cover_letter: data.cover_letter,
        status: data.status,
    });
    
    if(result.affectedRows !== 1) throw new InternalError("An error occurred. Please try again later.");

    applicantQuery = 'SELECT id FROM applicants WHERE id = ?';
    let applicant = await query(applicantQuery, [result.insertId]);

    for(const item of data.job_availability) {
        const jobAvailabilityQuery = 'INSERT INTO job_availability SET ?';
        // eslint-disable-next-line no-await-in-loop
        await query(jobAvailabilityQuery, {
            job_availability: item,
            applicant_id: applicant[0].id,
        });
    }

    for (const item of data.job_type) {
        const jobTypeQuery = 'INSERT INTO job_type SET ?';
        // eslint-disable-next-line no-await-in-loop
        await query(jobTypeQuery, {
            job_type: item,
            applicant_id: applicant[0].id,
        });
    }

    /**
     * return applicant object
     */
    return {
        id: applicant[0].id,
        email: data.email,
    };
}

// Getting a single Applicant data . . .
async function getApplicant(id) {
    applicantQuery = 'SELECT * FROM applicants WHERE id = ?';
    let applicant = await query(applicantQuery, [id]);
    if (applicant.length > 1)
        throw new NotFoundError(
            "Applicant's Profile not found!!!"
        );
    
    return applicant[0];
}

// Getting all Applicants' Profile . . .
async function getAllApplicants(req, res) {
    applicantQuery = 'SELECT * FROM applicants';
    let applicant = await query(applicantQuery);
    if (applicant.length > 1)
        return [];
    return applicant;
}

module.exports = {
    createApplicant,
    getAllApplicants,
    getApplicant
}
