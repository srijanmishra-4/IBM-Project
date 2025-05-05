import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../Utils/axios"; // adjust the path to your axios instance

const AnalysisReport = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { testId, responses, userInfo } = location.state || {};

    const userId = userInfo.userId;
    const experience = userInfo[2];
    const jobTitle = userInfo[0];
    const skill = userInfo[3];

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const evaluate = async () => {
            try {
                const res = await api.post("/quiz/evaluate-test", {
                    jobTitle,
                    experience,
                    result: responses,
                    skill,
                });
                setReport(res.data.data); // access actual data key
            } catch (error) {
                console.error("Evaluation error:", error);
            } finally {
                setLoading(false);
            }
        };

        evaluate();
    }, [userId, jobTitle, experience, responses, skill, testId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[#FF543F] text-xl font-semibold">
                Generating Your Report...
            </div>
        );
    }

    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
                Failed to generate report.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
                <h1 className="text-3xl font-bold text-[#FF543F] mb-6 text-center">
                    Quiz Analysis Report
                </h1>

                {/* Skill-wise Performance */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Skill-wise Performance</h2>
                    <div className="bg-gray-100 rounded-lg p-4 text-gray-700 space-y-2">
                        {report["Skill-wise Performance"] &&
                            Object.entries(report["Skill-wise Performance"]).map(([skillName, feedback], index) => (
                                <div key={index}>
                                    <strong>{skillName}:</strong> {feedback}
                                </div>
                            ))}
                    </div>
                </section>

                {/* Overall Performance */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Overall Performance</h2>
                    <div className="bg-gray-100 rounded-lg p-4 text-gray-700 italic">
                        {report["Overall Performance Summary"]}
                    </div>
                </section>

                {/* Areas of Improvement */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Areas of Improvement</h2>
                    <ul className="bg-gray-100 rounded-lg p-4 text-gray-700 list-disc pl-6 space-y-2">
                        {report["Areas of Improvement"]?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                {/* Personalized Learning Path */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Personalized Learning Path</h2>
                    <ul className="bg-gray-100 rounded-lg p-4 text-gray-700 list-disc pl-6 space-y-2">
                        {report["Personalized Learning Path"]?.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </section>

                {/* Go Home Button */}
                <div className="text-center pt-6">
                    <button
                        onClick={() => navigate("/home")}
                        className="bg-[#FF543F] hover:bg-[#e94c35] text-white font-semibold px-6 py-2 rounded-lg transition-all"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalysisReport;
