const Blog = require('../models/BlogSchema');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog by link (slug)
exports.getBlogByLink = async (req, res) => {
  try {
    const link = req.params.link;
    
    // Handle both "/blog-link" and "blog-link" formats
    const searchLink = link.startsWith('/') ? link : `/${link}`;
    const altSearchLink = link.startsWith('/') ? link.substring(1) : link;
    
    const blog = await Blog.findOne({
      $or: [
        { link: searchLink },
        { link: altSearchLink },
        { link: link }
      ]
    });
    
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a blog by link (slug)
exports.updateBlogByLink = async (req, res) => {
  try {
    const link = req.params.link;
    
    // Handle both "/blog-link" and "blog-link" formats
    const searchLink = link.startsWith('/') ? link : `/${link}`;
    const altSearchLink = link.startsWith('/') ? link.substring(1) : link;
    
    const blog = await Blog.findOneAndUpdate(
      {
        $or: [
          { link: searchLink },
          { link: altSearchLink },
          { link: link }
        ]
      },
      req.body,
      { new: true }
    );
    
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog by link (slug)
exports.deleteBlogByLink = async (req, res) => {
  try {
    const link = req.params.link;
    
    // Handle both "/blog-link" and "blog-link" formats
    const searchLink = link.startsWith('/') ? link : `/${link}`;
    const altSearchLink = link.startsWith('/') ? link.substring(1) : link;
    
    const blog = await Blog.findOneAndDelete({
      $or: [
        { link: searchLink },
        { link: altSearchLink },
        { link: link }
      ]
    });
    
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unified: Get blog by ID or Link 
exports.getBlogByIdOrLink = async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is a valid MongoDB ObjectId (24 hex chars)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    let blog;
    if (isObjectId) {
      // Search by ID
      blog = await Blog.findById(identifier);
    } else {
      // Search by link - handle various formats
      const searchOptions = [
        identifier,
        identifier.startsWith('/') ? identifier.substring(1) : identifier,
        identifier.startsWith('/') ? identifier : `/${identifier}`
      ];
      
      blog = await Blog.findOne({
        link: { $in: searchOptions }
      });
    }
    
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Unified: Update blog by ID or Link
exports.updateBlogByIdOrLink = async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is a valid MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    let blog;
    if (isObjectId) {
      // Update by ID
      blog = await Blog.findByIdAndUpdate(identifier, req.body, { new: true });
    } else {
      // Update by link - handle various formats
      const searchOptions = [
        identifier,
        identifier.startsWith('/') ? identifier.substring(1) : identifier,
        identifier.startsWith('/') ? identifier : `/${identifier}`
      ];
      
      blog = await Blog.findOneAndUpdate(
        { link: { $in: searchOptions } },
        req.body,
        { new: true }
      );
    }
    
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Unified: Delete blog by ID or Link
exports.deleteBlogByIdOrLink = async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is a valid MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    
    let blog;
    if (isObjectId) {
      // Delete by ID
      blog = await Blog.findByIdAndDelete(identifier);
    } else {
      // Delete by link - handle various formats
      const searchOptions = [
        identifier,
        identifier.startsWith('/') ? identifier.substring(1) : identifier,
        identifier.startsWith('/') ? identifier : `/${identifier}`
      ];
      
      blog = await Blog.findOneAndDelete({
        link: { $in: searchOptions }
      });
    }
    
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};