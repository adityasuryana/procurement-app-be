const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const {
    uploadSingleFile,
    uploadMultipleFiles,
} = require('../controller/upload');

// Handles single file upload under 'file' multipart key
router.post('/', upload.single('file'), uploadSingleFile);
router.post('/multiple', upload.array('files', 10), uploadMultipleFiles);

module.exports = router;
