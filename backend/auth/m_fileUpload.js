const multer = require('multer');
const path = require('path');

// File filter to allow only Excel files
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.xls', '.xlsx'];
    const ext = path.extname(file.originalname).toLowerCase();
    req.filename = file.originalname

    if (!allowedExtensions.includes(ext)) {
        return cb(new Error('Only Excel files are allowed!'), false);
    }
    cb(null, true);
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 2MB file size limit
});

// Middleware function for handling errors
const uploadMiddleware = (req, res, next) => {
    upload.single('excel_file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};

module.exports = uploadMiddleware;
