import {motion, AnimatePresence} from "framer-motion"
import {ailogo} from "../assets"
import { headContentAnimation, headTextAnimation, slideAnimation } from "../config/motion"
import { useSnapshot } from "valtio";
import React,{useState , useEffect, Suspense} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Canvass from "../components/Canvass";

import state from "../store";


export default function Entry(){
    const snap = useSnapshot(state);
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleLogin = async (e) => {
      e.preventDefault();
    
      const email = e.target.email.value;
      const password = e.target.password.value;
    
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
    
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/home");
        }
      } catch (error) {
        console.error("Login failed:", error.response?.data?.error || error.message);
      }
    };
    
    const handleRegister = async (e) => {
      e.preventDefault();
    
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
    
      try {
        const response = await axios.post("http://localhost:5000/register", {
          name,
          email,
          password,
        });
    
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/home");
        }
        } catch (error) {
          console.error("Registration failed:", error.response?.data || error.message);
      
          // If user already exists, redirect to login
          if (error.response?.status === 400 && error.response?.data?.redirectTo) {
            navigate("/login");
          }
        }
      };
    
          

    return (
        <AnimatePresence>
          {snap.intro && (
            <motion.section className="home" {...headContentAnimation}>
              <motion.div className="flex-center" {...headTextAnimation}>
                  <img src={ailogo} alt="logo" className="w-40 h-40" /> 
                  <h1 className="title">PA</h1>
              </motion.div>
            
              <motion.div className="button-container" >
                <button className={`button ${location.pathname === "/login" ? "expanded" : "unexpanded"}`} onClick={()=>{navigate("/login");}}>Login</button>
                <button className={`button ${location.pathname === "/register" ? "expanded" : "unexpanded"}`} onClick={()=>{navigate("/register");}}>Register</button>
              </motion.div>

               


              {location.pathname === "/login" && (
                <motion.div className="w-[100%] flex justify-center" {...slideAnimation("up")}>
                  <form 
                    onSubmit={handleLogin} 
                    className="form"
                  >
                    <h2 className="text-3xl font-bold cursor-default">Login</h2>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="john@gmail.com" className="input" required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" className="input" required/>
                    <button type="submit" className="button">Submit</button>
                  </form>
                </motion.div>
              )}
              {location.pathname === "/register" && (
                <motion.div className="w-[100%] flex justify-center" {...slideAnimation("up")}>
                  <form 
                    onSubmit={handleRegister}
                    className="form"
                  >
                    <h2 className="text-3xl font-bold cursor-default">Register</h2>
                    <label htmlFor="name">Username</label>
                    <input type="text" id="name" placeholder="Eg. John" className="input" required/>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="john@gmail.com" className="input" required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="password use symbols and number" className="input" required/>
                    <button type="submit" className="button">Submit</button>
                  </form>
                </motion.div>
              )}
              </motion.section>
          )}
          
            
        
      </AnimatePresence>
    )
}