import { useNavigate, useLocation } from "react-router-dom";
import ai from "../images/ai.svg"
import "./auth.css"
import Login from "./Login"
import Register from "./Register";

export default function Auth() {

    const navigate = useNavigate();
    const location = useLocation();

    // Check if path is "/login" or "/register"
    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    return (
        <div className="container">
                <div className="logo">
                    <img src={ai} alt="ai-logo" />
                    <h1>Personal Assistant</h1>
                </div>

                <div className="auth">
                    <button
                        onClick={() => {
                            navigate("/login", { replace: true })
                        }}
                        className={`login-btn ${isLogin? "extended": ""}`}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => {
                            navigate("/register", { replace: true })

                        }}
                        className={`register-btn ${isRegister ? "extended": ""}`}
                    >
                        Register
                    </button>
                </div>

                <div className="register" >
                    {isLogin && <Login />}
                    {isRegister && <Register />}
                </div>
                
        </div>
    )
};


