const mongoose = require('mongoose');

const SubSectionSchema = new mongoose.Schema({
  subheading: { type: String},
  url: { type: String},
  subdescription: { type: String, required: true },
  subsectionsImage: [{
    type: String
  }],
}, { _id: false });

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  metatile: {
    type: String
  },
  metadescription: {
    type: String
  },
  shortDescription: { 
    type: String,
    // required: true
  },
  image: {
    type: String // URL or path to the image
  },
  categories: [{
    type: String
  }],
  author: { 
    type: String, 
    required: true 
  },
  subsections: [SubSectionSchema]
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      ret.createdAt = ret.createdAt.toISOString().split('T')[0];
      delete ret._id;
      delete ret.__v;
      delete ret.updatedAt;
      return ret;
    }
  }
});

module.exports = mongoose.model('Blog', BlogSchema);