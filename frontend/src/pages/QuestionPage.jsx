import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import QuestionsList from '../components/QuestionsList';
import Spinner from '../components/Spinner/Spinner';

const QuestionPage = () => {
    const [questions, setQuestions] = useState([]);
    const [searchParams] = useSearchParams();
    const company = searchParams.get('company');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Set the limit for questions per page

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`http://localhost:5000/api/questions?company=${company || ''}&page=${currentPage}&limit=${limit}`);
                setQuestions(data.questions);
                setTotalPages(data.totalPages);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching questions.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [company, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold mb-4'>Questions for {company || 'All Companies'}</h1>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p>{error}</p>
            ) : questions.length > 0 ? (
                <QuestionsList questions={questions} />
            ) : (
                <p>No Questions Found!</p>
            )}
            <div className='flex justify-between mt-4'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default QuestionPage;
