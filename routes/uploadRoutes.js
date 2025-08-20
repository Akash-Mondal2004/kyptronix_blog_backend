const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();

// Single image upload
router.post('/image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Return the relative file URL for better deployment compatibility
        const imageUrl = `/uploads/${req.file.filename}`;
        
        res.json({
            success: true,
            imageUrl: imageUrl,
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Multiple images upload
router.post('/images', upload.array('images', 5), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        // Return array of relative file URLs for better deployment compatibility
        const imageUrls = req.files.map(file => ({
            url: `/uploads/${file.filename}`,
            filename: file.filename
        }));
        
        res.json({
            success: true,
            images: imageUrls
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
