import fs from 'fs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../Db/config/cloudinaryConfig.js';
import File from '../Db/models/FileModel.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });



export const FileUploadHandler = async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
      use_filename: true,
    });

    fs.unlinkSync(req.file.path);

    const uniqueKey = uuidv4();
    const newFile = new File({
      key: uniqueKey,
      url: result.secure_url,
    });

    await newFile.save();

    res.json({ key: uniqueKey, url: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File could not be uploaded' });
  }
};

export const FileDownloadHandler = async (req, res) => {
  try {
    const { key } = req.query;
    const file = await File.findOne({ key });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    const response = await axios.get(file.url, { responseType: 'stream' });
    const contentType = response.headers['content-type'];
    const extension = contentType.split('/')[1];

    res.setHeader('Content-Disposition', `attachment; filename="${key}.${extension}"`);
    res.setHeader('Content-Type', contentType);

    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'File could not be downloaded' });
  }
};
