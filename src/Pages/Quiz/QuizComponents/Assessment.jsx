import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, IconButton, Snackbar, InputAdornment, Button, Alert } from '@mui/material';
import api from "../../../Utils/axios"
import QuizeComponent from "../../../Components/QuizeComponent";
import LoaderComponent from "../../../Components/Loader";

const Assessment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { jobRole, difficulty, experience, userId } = location.state || {};

    const [questions, setQuestions] = useState([]);
    const [testId, setTestId] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [UserInfo, setSetUserInfo] = useState([])


    const handleSnackClose = () => {
        setSnackOpen(false);
    };
    useEffect(() => {
        if (!jobRole || !difficulty || !experience) {
            navigate("/");
            return;
        }

        const fetchQuestions = async () => {
            try {
                const response = await api.get("/quiz/generate-test", {
                    params: { jobRole, difficulty, experience, userId },
                });

                const data = response.data;
                setTestId(data.data.Test_ID);
                setQuestions(data.data.Questions || []);

                const userInfo = [
                    jobRole,
                    difficulty,
                    experience,
                    data.data.Skills,
                    userId
                ]
                setSetUserInfo(userInfo)
            } catch (error) {
                console.error("Failed to fetch questions", error);
                setErrorMessage('Failed to fetch questions.');
                setOpenSnackbar(true);
                setTestId("ERROR");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [jobRole, difficulty, experience, navigate]);

    if (loading) {
        return <LoaderComponent />;
    }

    return (
        <>
            <QuizeComponent testId={testId} questions={questions} userInfo={UserInfo} />
            <Snackbar
                open={openSnackbar}
                // autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                    "& .MuiPaper-root": {
                        fontSize: "1.05rem",
                        padding: "15px",
                        minWidth: "180px",
                    }
                }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Assessment;
