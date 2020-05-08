require('dotenv').config();
const mongoose = require('mongoose');
const schemas = require('./schemas.js');

const timeline = schemas.timeline;

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const Timeline = mongoose.model('Timeline', timeline);
