const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Configure multer to store uploaded files in memory as buffer objects
const storage = multer.memoryStorage();

// Set file limit to 5MB and accept images & document formats
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

/**
 * Uploads a file buffer directly to Cloudinary
 * @param {Buffer} fileBuffer - The buffer of the uploaded file
 * @param {string} originalName - Original name of the file for reference
 * @returns {Promise<Object>} - The upload result from Cloudinary
 */
const uploadToCloudinary = (fileBuffer, originalName) => {
  return new Promise((resolve, reject) => {
    const folder = 'procurement_documents';
    
    // Clean original name to remove extension and replace non-alphanumeric chars
    const cleanedName = originalName
      .split('.')[0]
      .replace(/[^a-zA-Z0-9]/g, '_');

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto', // Automatically detects images, pdfs, raw files, etc.
        public_id: `${cleanedName}-${Date.now()}`, // Generate a unique name
        access_mode: 'public'
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    
    stream.end(fileBuffer);
  });
};

module.exports = {
  upload,
  uploadToCloudinary
};
