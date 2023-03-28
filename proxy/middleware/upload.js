const multer = require("multer");

const uploadFileCreateClient = ()=>{
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, "./proxy/resources")
            },
            filename: (req, file, cb)=>{
                cb(null, `${Date.now()}_${file.originalname}`)
            }
        })
        const upload = multer({storage});
        return upload.array("files", 4)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    uploadFileCreateClient
}