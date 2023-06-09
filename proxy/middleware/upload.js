const multer = require("multer");

const uploadFileCreateClient = ()=>{
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, "./proxy/resources/customer")
            },
            filename: (req, file, cb)=>{
                cb(null, `${Date.now()}_${file.originalname}`)
            }
        })
        const upload = multer({storage});
        return upload.array("files", 10)
    } catch (error) {
        console.log(error)
    }
};

const uploadFileDetail = ()=>{
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, "./proxy/resources/details")
            },
            filename: (req, file, cb)=>{
                cb(null, `${Date.now()}_${file.originalname}`)
            }
        })
        const upload = multer({storage});
        return upload.single("detailFile")
    } catch (error) {
        console.log(error)
    }
}

const uploadFileDetailAcceptance = ()=>{
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, "./proxy/resources/details")
            },
            filename: (req, file, cb)=>{
                cb(null, `${Date.now()}_${file.originalname}`)
            }
        })
        const upload = multer({storage});
        return upload
    } catch (error) {
        console.log(error)
    }
}

const uploadFileAcceptance = ()=>{
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, "./proxy/resources/acceptance")
            },
            filename: (req, file, cb)=>{
                cb(null, `${Date.now()}_${file.originalname}`)
            }
        })
        const upload = multer({storage});
        return upload
    } catch (error) {
        console.log(error)
    }
}

const uploadFileExcelContract = ()=>{
    try {
        const storage = multer.diskStorage({
            filename: (req, file, cb)=>{
                cb(null, `${Date.now()}_${file.originalname}`)
            }
        })
        const upload = multer({storage});
        return upload
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadFileCreateClient,
    uploadFileDetail,
    uploadFileDetailAcceptance,
    uploadFileAcceptance,
    uploadFileExcelContract
}