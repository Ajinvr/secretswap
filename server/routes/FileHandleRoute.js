import express from 'express';
import { FileDownloadHandler,FileUploadHandler } from '../controllers/filehandle.js';
const router = express.Router();

router.route('/upload').post(FileUploadHandler)

router.route('/download').post(FileDownloadHandler)


export default router;