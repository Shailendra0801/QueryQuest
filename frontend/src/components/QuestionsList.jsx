import React from 'react';

const QuestionsList = ({ ...questions }) => {
    return (
        <div>
            {questions.map((q) => (
                <div key={q._id} className='border p-3 mb-3 rounded'>
                    <p><strong>Question:</strong> {q.question}</p>
                    <p><strong>Company:</strong> {q.company}</p>
                    <p><strong>Difficulty:</strong> {q.difficulty}</p>
                </div>
            ))}
        </div>
    );
};

export default QuestionsList;
