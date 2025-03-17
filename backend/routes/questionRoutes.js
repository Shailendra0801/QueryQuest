const express = require('express');
const router = express.Router();
const { getQuestions, addQuestions} = require('../controllers/questionsController');

// Routes
router.get('/', getQuestions);
router.get('/add', addQuestions);

module.exports = router;