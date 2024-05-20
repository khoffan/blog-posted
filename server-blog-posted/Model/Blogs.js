const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blogs = Schema(
  {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    author: {
      name: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        default: null,
      },
      image: {
        type: String,
        default: null,
      },
    },
    like: {
      type: Number,
      default: 0,
    },
    dislinke: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", Blogs);
