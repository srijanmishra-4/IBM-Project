import './App.css'
import SignInForm from '../src/Pages/Auth/SignIn'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VerifyOtp from './Pages/Auth/VerifyOtp';
import HomePage from './Pages/Home/homePage';
import QuizHome from './Pages/Quiz/QuizHome';

function App() {
  const token = localStorage.getItem("token");

  return (

    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/sign-in" />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/sign-in"/>} />
        <Route path='/Competency-Test/*' element={ token ? <QuizHome/> : <Navigate to="/sign-in"/>}/>
      </Routes>
    </Router>
  )
}

export default App
