module.exports = {
    createApplicants: `
        INSERT INTO applicants (name, email, password) VALUES($1, $2, $3) WHERE email = $4 OR id = $4;
    `
}