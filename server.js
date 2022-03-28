const http = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()

const server = http.createServer(app)

const ApplicantRoute = require("./routes/applicantsRoute")
const AdminRoute = require("./routes/adminRoute")

app.use(bodyParser.json())

app.use(
  cors({
    origin: "*",
  })
)

app.use("/applicant", ApplicantRoute)
app.use("/admin", AdminRoute)

const port = 3001
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
