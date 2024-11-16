import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => cb(null, true),
});

const fileUploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ message: 'File upload error', error: err });

    if (req.file) {
      const fileExtension = path.extname(req.file.originalname);
      const randomSuffix = Math.floor(Math.random() * 10000);
      const newFileName = `${Date.now()}${randomSuffix}${fileExtension}`;
      req.file.newFileName = newFileName;
    }

    next();
  });
};

export default fileUploadMiddleware;
