import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/homePage';
import QuestionPage from './pages/QuestionPage';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/questions" element={ <QuestionPage />} />
      </Routes>
    </Router>
  )
}

export default App;
