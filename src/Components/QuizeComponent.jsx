import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizComponent = ({ questions, testId, userInfo }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    // const handleOptionChange = (option) => {
    //     option === "" ? setSelectedOption('No Option Selected') : setSelectedOption(option);
    // }


    const navigate = useNavigate();
    const currentQuestion = questions[currentIndex];


    const handleNext = () => {

        const userAnswer = selectedOption === "" ? 'No Option Selected' : selectedOption

        console.log(userAnswer)

        const updatedResponse = {
            ...currentQuestion,
            User_Answer: userAnswer,
        };

        setUserResponses([...userResponses, updatedResponse]);
        setSelectedOption("");
        setCurrentIndex(currentIndex + 1);
    };

    const handleSubmit = () => {
        const userAnswer = selectedOption === "" ? 'No Option Selected' : selectedOption
        const finalResponse = {
            ...currentQuestion,
            User_Answer: userAnswer,
        };

        const fullResponseList = [...userResponses, finalResponse];

        console.log(fullResponseList)
        navigate("/Competency-Test/Analysis-Report", {
            state: {
                testId,
                responses: fullResponseList,
                userInfo
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
                <div className="mb-4 text-sm text-gray-500 font-medium">
                    Question {currentIndex + 1} of {questions.length}
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold text-[#FF543F] mb-6">
                    {currentQuestion.Question}
                </h2>

                <div className="space-y-4">
                    {currentQuestion.Options.map((option, idx) => (
                        <label
                            key={idx}
                            className={`block border rounded-xl px-4 py-3 cursor-pointer transition-all ${selectedOption === option
                                ? "bg-[#FF543F] text-white border-[#FF543F]"
                                : "hover:bg-gray-100 border-gray-300"
                                }`}
                        >
                            <input
                                type="radio"
                                name={`question-${currentQuestion.Question_ID}`}
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => setSelectedOption(option)}
                                className="hidden"
                            />
                            {option}
                        </label>
                    ))}
                </div>

                <div className="mt-8 text-right">
                    {currentIndex < questions.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="bg-[#FF543F] hover:bg-[#e94c35] text-white font-semibold px-6 py-2 rounded-lg transition-all"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="bg-[#FF543F] hover:bg-[#e94c35] text-white font-semibold px-6 py-2 rounded-lg transition-all"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizComponent;
