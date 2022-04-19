exports.default = (req,res,next)=>{
    if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.myFile;
  const path = __dirname + "/files/" + file.name;

  file.mv(path, (err) => {
    if (err) {
        console.log("file upload error", err);
      return res.status(500).send("An error occurred. Please try again!");
    }
    return res.send({ status: "success", path: path });
  });
}