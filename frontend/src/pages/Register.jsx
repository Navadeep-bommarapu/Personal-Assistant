import { useNavigate } from "react-router-dom";
import React, {useState} from "react"
import "./register.css"
import axios from "axios"

export default function Register(){
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/register", user);
            console.log("Success:", response.data); // Log success response
            localStorage.setItem("token", response.data.token);
            navigate("/home"); // Redirect to Home after successful registration
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            navigate(error.response.data.redirectTo)
        }
    };


    return (
          
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="name">Username</label>
            <input type="text" id="name" name="name" placeholder="Eg. John" required onChange={handleChange} value={user.name}/>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder="john@gmail.com" required onChange={handleChange} value={user.email}/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="password" required onChange={handleChange} value={user.password}/>
            <button type="submit" className="button" >submit</button>
        </form>

    )
}