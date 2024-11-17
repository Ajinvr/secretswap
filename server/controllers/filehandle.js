import cloudinary from '../Db/config/cloudinaryConfig.js';
import File from '../Db/models/FileModel.js';
import axios from 'axios';

export const FileUploadHandler = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: file.newFileName,
      },
      async (error, result) => {
        if (error) {
          console.log('Error uploading file to Cloudinary:', error);
          return res.status(500).json({ message: 'Error uploading file' });
        }
        
        
        const fileNameWithoutExtension = file.newFileName.replace(/\.[^/.]+$/, "");

        try {
          const newFile = await File.create({
            key: fileNameWithoutExtension,
            url: result.secure_url,
            fname:file.newFileName,
            mimetype:file.mimetype
          });

          res.json({
            key:newFile.key,
          });
        } catch (dbError) {
          console.log('Error saving file to MongoDB:', dbError);
          res.status(500).json({ message: 'Error saving file to database' });
        }
      }
    );

    result.end(file.buffer);
  } catch (error) {
    console.log('Unexpected error:', error);
    res.status(500).json({ message: error.message });
  }
};



export const FiledownloadHandler = async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ message: 'Key is required' });
    }

    const fileRecord = await File.findOne({ key });

    if (!fileRecord) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileUrl = fileRecord.url;
    const response = await axios({
      url: fileUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    const filename = fileRecord.fname || 'unknown_file';
    const mimetype = fileRecord.mimetype || 'application/octet-stream';

    return res.json({
      filename: filename,
      mimetype: mimetype,
      fileData: response.data.toString('base64'),
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error during file download' });
  }
};
