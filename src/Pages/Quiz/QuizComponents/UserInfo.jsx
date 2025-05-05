import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
    const [jobRole, setJobRole] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [experience, setExperience] = useState("Fresher");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.userId || "";
    // console.log(userId)

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/Competency-Test/Assessment", {
            state: { jobRole, difficulty, experience, userId },
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Enter Your Details
                </h2>

                {/* Job Role Input */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Enter Job Role
                    </label>
                    <input
                        type="text"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                {/* Difficulty Radio Buttons */}
                <div className="mb-6">
                    <p className="block text-gray-700 font-semibold mb-2">
                        Difficulty Level
                    </p>
                    <div className="flex gap-4">
                        {["Beginner", "Intermediate", "Advance"].map((level) => (
                            <label key={level} className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    value={level}
                                    checked={difficulty === level}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    className="accent-blue-500"
                                />
                                <span className="text-gray-700">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience Dropdown */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Experience
                    </label>
                    <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option>Fresher</option>
                        <option>1-2 Years</option>
                        <option>2-3 Years</option>
                        <option>3-4 Years</option>
                        <option>4+ Years</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#FF543F] hover:bg-[#fc5c42] text-white py-2 rounded-lg font-semibold transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserInfo;
