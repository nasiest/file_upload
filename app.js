const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const ApplicantRoute = require('./routes/applicantsRoute');
const AdminRoute = require('./routes/adminRoute');

app.use(bodyParser.json())

app.use("/applicant", ApplicantRoute);
app.use("/admin", AdminRoute);


module.exports = app;