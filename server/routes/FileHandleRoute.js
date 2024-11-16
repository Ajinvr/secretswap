import express from 'express';
import { FileUploadHandler } from '../controllers/filehandle.js';
import fileUploadMiddleware from '../middlewares/fileUploadMiddleware.js';
const router = express.Router();

router.route('/upload').post(fileUploadMiddleware,FileUploadHandler)

// router.route('/download').post(FileDownloadHandler)


export default router;