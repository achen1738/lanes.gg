require('dotenv').load();
const mongoose = require('mongoose');
const schemas = require('./schemas.js');

const timeline = schemas.timeline;

const mongoURI = process.env.mongoURI;
mongoose.connect(mongoURI, { useNewUrlParser: true });
const Timeline = mongoose.model('Timeline', timeline);
