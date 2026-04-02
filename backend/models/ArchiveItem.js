const mongoose = require('mongoose');

const archiveItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    unique: true,
  },

  summary: {
    type: String,
  },

  content: {
    type: String, // long description / article
  },

  category: {
    type: String, // later can be ObjectId
  },

  tags: [String],

  images: [
    {
      url: String,
    }
  ],

  references: [
    {
      title: String,
      link: String,
      note: String,
    }
  ],

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("ArchiveItem", archiveItemSchema);