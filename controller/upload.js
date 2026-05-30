const { uploadToCloudinary } = require('../middleware/upload');

const uploadSingleFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary using buffer
    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Upload all files in parallel
    const uploadPromises = req.files.map(file =>
      uploadToCloudinary(file.buffer, file.originalname)
    );

    const results = await Promise.all(uploadPromises);

    const fileUrls = results.map(result => ({
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes
    }));

    res.status(200).json({
      message: 'Files uploaded successfully',
      files: fileUrls
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles
};
