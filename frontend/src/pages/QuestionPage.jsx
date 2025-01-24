import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [searchParams] = useSearchParams();
    const company = searchParams.get('company');

    useEffect(() => {
        const fetchQuestions = async () => {
            const data = await axios.get(`http://localhost:5000/api/questions/company=${company || ''}`);
            setQuestions(data);
        };
        fetchQuestions();
    }, [company]);

    return(
        <div className='p-5'>
            <h1 className='text-2xl font-bold mb-4'>Questions for {company ||'All Companies'}</h1>
            {questions.length > 0?(
                questions.map((q) => (
                    <div key={q._id} className='border p-3 mb-3 rounded'>
                        <p><strong>Questoin:</strong>{q.question}</p>
                        <p><strong>Company:</strong>{q.company}</p>
                        <p><strong>Difficulty:</strong>{q.difficulty}</p>
                    </div>
                ))
            )
        :(
            <p>No Questions Found!</p>
        )}
        </div>
    )
}

export default QuestionPage;