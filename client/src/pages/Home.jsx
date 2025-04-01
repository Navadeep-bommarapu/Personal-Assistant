import React,{useEffect, useState} from 'react'
import {motion, AnimatePresence} from "framer-motion"
import {  ailogo } from '../assets'

import { slideAnimation } from '../config/motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSnapshot } from 'valtio'
import state from '../store'

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const snap = useSnapshot(state)

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      navigate("/login");
      return;
    }
  
    axios
      .get("http://localhost:5000/home", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user.username);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);
  
  return (
    <AnimatePresence>
        <motion.section className='w-full h-full fixed bg-transparent' {...slideAnimation("left")}>
          <motion.div className='flex items-center'>
            <img src={ailogo} alt="logo" className='w-10 h-10'/>
            <h2 className='font-bold'>Personal Assistant</h2>
            <p>Welcome, {user}</p>
          </motion.div>
        </motion.section>
    </AnimatePresence>
  )
}

export default Home;
