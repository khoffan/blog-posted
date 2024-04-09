// make model from schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  snippet: String,
  body: String,
  createddate: Date,
  lastupdated: Date,
});

// schema users

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  createddate: Date,
});
