const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/', blogController.createBlog);
router.get('/', blogController.getBlogs);
// Unified routes for both ID and Link (must come after specific routes)
router.get('/:identifier', blogController.getBlogByIdOrLink);
router.put('/:identifier', blogController.updateBlogByIdOrLink);
router.delete('/:identifier', blogController.deleteBlogByIdOrLink);

module.exports = router;