const formData = require("form-data");
const axios = require("axios");
const { resource } = require("../untils/title");
const fs = require("fs")

const uploadResourceClientToServer = (req, res, next)=>{
    try {
        let form = new formData();
        for(let file of req.files){
            form.append("files", fs.readFileSync(file.path), file.filename);
        }
        axios({
            url: `${resource}/resources/?service_management_id=contract-service&table_management_id=client&is_private=false`,
            method: "POST",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoyNzQ5Nzk2MTk2fQ.2i_z3-2cpRRXusvpR-T5h0QvclOi4gL8wq1ze-aLyAA"
            },
            data: form
        })
        .then(resolve => {
            req.fileUpload = resolve.data.data.files;
            next();
        })
        .catch(err => {
            console.log("lỗi", err.response.data)
            res.send(err.response.data)
        })
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    uploadResourceClientToServer
}