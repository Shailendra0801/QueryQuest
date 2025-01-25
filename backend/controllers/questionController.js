const question = require('../models/questionModel');


// Fetching Questions
exports.getQuestions = async (req, res ) => {
    try{
        const { company, difficulty, tags, page = 1, limit = 10 } = req.query;
        const query = {};

        if(company){
            query.company = {$regex: company, $options: 'i'};
        }
        if(difficulty){
            query.difficulty = difficulty;
        }
        if(tags){
            query.tags = {$in: tags.split(',')};
        }

        // Pagination calculation
        const offset = (page - 1) * limit;
        const questions = await Question.find(query)
            .skip(offset)
            .limit(parseInt(limit));
        
        const totalQuestions = await Question.countDocuments(query);

        if(questions.length === 0){
            return res.status(404).json({message: "No questions found!"});
        }
        res.status(200).json({
            totalQuestions,
            currentPage: page,
            totalPages: Math.ceil(totalQuestions / limit),
            questions
        });
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