const checkRegister = 'SELECT email FROM registers WHERE email = ?';
    const checkApplicantResult = await query(checkRegister, [data.email]);
    // check if register already exists with provided email
    if (checkRegisterResult.length > 0 && checkRegisterResult[0].email) {
        console.error("-----------DUPLICATE EMAIL ERROR----------")
        throw new DuplicateDataError("register's email already exists. Proceed to login or create job application for applicant");
    }

    const registerQuery = 'INSERT INTO registers SET ?';
    let registerQueryResult = await query(registerQuery, {
        first_name: data.first_name,
        lastname: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
        confirm_password:data.confirm_password,
    });

    if (registerQueryResult.affectedRows !== 1){
        console.error("-----------APPLICANT CREATION ERROR----------")
        throw new InternalError("An error occurred. Please try again later.");
    } 

    const newRegsiterQuery = 'SELECT id FROM registers WHERE id = ?';
    const register = await query(newFRegisterQuery, [resgisterQueryResult.insertId]);


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

// Getting a single Register data . . .
async function getRegister(id) {
    registerQuery = 'SELECT * FROM registers WHERE id = ?';
    let register = await query(registerQuery, [id]);
    if (register.length < 1)
        throw new NotFoundError(
            "Regsiter's Profile not found!!!"
        );
    
    return applicant[0];
}

// Getting all Registers' Profile . . .
async function getAllRegisters(req, res) {
    regsiterQuery = 'SELECT * FROM registers';
    let register = await query(regsiterQuery);
    if (register.length > 1)
        return [];
    return register;
}

module.exports = {
    createRegister,
    getAllRegisters,
    getRegister
}
