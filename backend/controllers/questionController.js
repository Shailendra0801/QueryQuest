const question = require('../models/questionModel');


// Fetching Questions
exports.getQuestions = async (req, res ) => {
    try{
        const { company } = req.query;
        const query = company? { company } : {};
        const questions = await Question.find(query);
        res.status(200).json(questions);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

// Adding Questions
exports.addQuestions = async (req, res ) => {
    try{
        const newQues = new Question(req.body);
        const savedQues = await newQues.save();
        res.status(201).json(savedQues);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};