import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ai from "../images/ai.svg"
import "./home.css"

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [convo, setConvo] = useState([])

    function handleSubmit(formData){
        const newConvo = formData.get("convo")
        setConvo(prev => {
            return newConvo === "" ? [...prev] : [...prev, newConvo]
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Redirect to login if no token
            return;
        }

        axios.get("http://localhost:5000/user", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setUser(res.data.user);
        }).catch(() => {
            localStorage.removeItem("token"); // Remove invalid token
            navigate("/login"); // Redirect to login if authentication fails
        });
    }, [navigate]);

    return (
        <div className="home-container">
            <div className="home-header">
                <div className="home-logo">
                    <img src={ai} alt="ai-logo" className="img" />
                    <h1>Personal Assistant</h1>
                </div>
                <p className="home-para">Welcome {user?.username || "User"}</p>
            </div>
            <div className="convo-container">
                <div className="convo">
                    <ul>
                    {convo.map((con, index)=>{
                        return <li key={index} className="convo-li">{con}</li>
                    })}
                    </ul>
                </div>
            </div>
            <footer className="home-footer">
                <form action={handleSubmit} className="footer-input">
                    <input type="text" placeholder="Ask anything" name="convo" />
                    <button type="submit" hidden></button>
                </form>
            </footer>
        </div>
    );
}
