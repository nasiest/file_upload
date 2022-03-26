const models = require('../models');


function save (req, res){
    const admin = {
        admin_id: 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        password: req.body.password,
            
 }
    models.Admin_Details.create(admin).then(result => {
        res.status(201).json({
            message: "Admin Profile created Successfully",
            admin: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!",
            admin: error
        });   
    })
}

// Getting a single Administrator data . . .
function show(req, res) {
    const id = req.params.id;
  
    models.Admin_Details.findByPk(id)
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({
            message: "Admin's Profile not found!!!",
          })
        }
      })
      .catch((error) => {
        res.status(500).json(error);
        message: "Something Went Wrong!!!";
      });
  }

    
// Getting all Administrators' Profile . . .
function index(req, res) {
    models.Admin_Details.findAll()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something Went Wrong!!!",
        });
      });
  }

   // Updating Applicant's profile . . .
function update(req, res) {
  const id = req.params.id;

  const updatedAdmin = {
    admin_id: 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    password: req.body.password,
        
};
 
  models.Admin_Details.update(updatedAdmin, {
    where: { id: id },
  })
    .then((result) => {
      res.status(200).json({
        message: "Admin's Profile Updated Successfully !!!",
        admin: updatedAdmin,
      });
    })
    .catch((error) => {
      res.status(200).json({
        message: "Something went wrong . . .",
        error: error,
      });
    });
}

  // Deleting an Administrator's profile . . .
  function destroy(req, res) {
    const id = req.params.id;
 
     models.Admin_Details.destroy({ where: { id: id } })
      .then((result) => {
        res.status(200).json({
          message: "Admin's Profile deleted Successfully !!!",
        });
      })
      .catch((error) => {
        res.status(200).json({
          message: "Something went wrong . . .",
          error: error,
        });
      });
  }
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}