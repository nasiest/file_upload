/**
 * @description A static method for creation of database tables
 * @return {Promise<void>}
 */
async function createTables(con, logger) {
    const createTableApplicant = `        
    CREATE TABLE IF NOT EXISTS applicants (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    job_role VARCHAR(50) NOT NULL,
    notice_period VARCHAR(50) NOT NULL,
    salary VARCHAR(50) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    resume VARCHAR(255) NOT NULL,
    cover_letter VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

    const createTableAdmin = `        
    CREATE TABLE IF NOT EXISTS admins (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

    const createTableJobAvailability = `
    CREATE TABLE IF NOT EXISTS job_availability (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_availability VARCHAR(50) NOT NULL,
    applicant_id BIGINT NOT NULL REFERENCES users(id),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

    const createTableJobType = `
    CREATE TABLE IF NOT EXISTS job_type (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_type VARCHAR(50) NOT NULL,
    applicant_id BIGINT NOT NULL REFERENCES users(id),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

    con.query(createTableApplicant, function (error, result) {
        if (error) {
            logger.info(`Couldn't create database tables \n${error.stack}`);
            process.exit(1);
        }
    });

    con.query(createTableAdmin, function (error, result) {
        if (error) {
            logger.info(`Couldn't create database tables \n${error.stack}`);
            process.exit(1);
        }
    });

    con.query(createTableJobAvailability, function (error, results) {
        if (error) {
            logger.info(`Couldn't create database tables \n${error.stack}`);
            process.exit(1);
        }
    });

    con.query(createTableJobType, function (error, results) {
        if (error) {
            logger.info(`Couldn't create database tables \n${error.stack}`);
            process.exit(1);
        }
    });
}

module.exports = {
    createTables
};