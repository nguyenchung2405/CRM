const fs = require("fs");
const path = require("path")

const removeFile = (req,res)=>{
    try {
        const pathFile = req.body.path;
        const pathRemove = path.join( __dirname, "../../", pathFile)
        fs.unlinkSync(pathRemove)
        res.status(200).send("Xóa file thành công")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

module.exports = {
    removeFile
}