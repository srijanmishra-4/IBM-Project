import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import home1 from '../../assets/home-1.png'
import logo from '../../assets/LOGO 2.png'

export default function HomePage() {

  // console.log(localStorage.getItem("token"))
  const token = localStorage.getItem("token");
  // console.log(token)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); 
        const fullName = decoded.name || "";
        const userEmail = decoded.email || "";

        setName(fullName);
        setEmail(userEmail);

        console.log(fullName , userEmail )

        const nameParts = fullName.trim().split(" ");
        const userInitials = nameParts.map(p => p[0]?.toUpperCase()).join("").slice(0, 2);
        setInitials(userInitials);
      } catch (err) {
        console.error("Invalid token format");
      }
    }
  }, [token]);

  const handleLogout = () => {
    console.log('Logout')
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const formatName = (fullName) => {
    if (!fullName) return "";

    const words = fullName.trim().split(" ");
    const fullLength = fullName.length;

    if (fullLength <= 25) return fullName;

    // Case: more than 2 words
    if (words.length > 2) {
      const initials = words.slice(0, -1).map(word => word.charAt(0)).join(" ");
      const lastName = words[words.length - 1];
      return `${initials} ${lastName}`;
    }


    if (words.length === 2) {
      return `${words[0].charAt(0)} ${words[1]}`;
    }

    return fullName;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-8 py-4 shadow">
        <img src={logo} alt="Career Lens" className="h-12" />

        <div className="w-[280px] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-lg font-semibold text-white">
            {initials}
          </div>
          <div className="truncate flex items-center flex-col">
            <div className="text-gray-800 font-medium truncate">{formatName(name)}</div>
            <div className="text-sm text-gray-600 truncate">{email}</div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline mt-1"
            >
              Logout
            </button>
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
          {/* Left: Image */}
          <div className="flex justify-center">
            <img src={home1} alt="Confused person" className="w-50 h-50 object-contain" />
          </div>

          {/* Right: Text & Button */}
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Confused About the Right Career Path? <br />
              <span className="text-black">Let Our AI-Powered Assessment Guide You.</span>
            </h2>

            <p className="text-gray-700 text-base md:text-lg px-2 md:px-6">
              Our Personalized Competency Diagnostic Assessment is designed to uncover your strengths,
              identify areas for growth, and guide you toward the job roles that truly fit you.
              Take the guesswork out of your future—get real insights and take control of your career journey today.
            </p>

            <button
              onClick={() => navigate("/Competency-Test")}
              className="bg-[#FD735D] hover:bg-[#fc5c42] text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
            >
              Take The Test Now !!
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}
