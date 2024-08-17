import multer from "multer";
import path from "path";


// Initialize upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 }, // 5MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|docx|doc|xlsx|xls|csv/; // Allowed file extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: File type error!');
    }
}

export default upload;