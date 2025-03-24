import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "./login.css";

export default function Login() {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", user);
            localStorage.setItem("token", res.data.token);
            navigate("/home");
        } catch (err) {
            alert(err.response?.data?.error || "Login Failed");
            JSON.stringify(err.response.data.error)
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>Email</label>
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <button type="submit" className="button">Login</button>
        </form>
    );
}
