const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    company: {type: String, required: true},
    question: {type: String, required: true},
    difficulty: {type: String, required: true},
    year: {type: Number, required: true}
})

module.exports = mongoose.model('Question', questionSchema);