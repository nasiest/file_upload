const file = req.files.myFile;
const extensionName = path.extname(file.name); // fetch the file extension
const allowedExtension = ['.png','.jpg','.jpeg','.csv'];

if(!allowedExtension.includes(extensionName)){
    return res.status(422).send("Invalid Image");
}