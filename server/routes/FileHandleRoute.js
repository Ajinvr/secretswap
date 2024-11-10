import express from 'express';
import { FileDownloadHandle, FileUploadHandle } from '../controllers/filehandle.js';
const router = express.Router();

router.route('/upload').post(FileUploadHandle)

router.route('/download').post(FileDownloadHandle)


export default router;