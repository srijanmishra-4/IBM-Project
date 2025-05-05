import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserInfo from './QuizComponents/UserInfo';
import Assessment from './QuizComponents/Assessment';
import AnalysisReport from './QuizComponents/AnalysisReport';


const QuizHome = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<UserInfo/>} />
                <Route path="/Assessment" element={<Assessment />} />
                <Route path="/analysis-report" element={<AnalysisReport />} />
            </Routes>
        </>
    )
}

export default QuizHome