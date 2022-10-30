import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import surfVideo from '../assets/Nalu.mp4'

const HomePage = () => {

    return (
        <div className = 'Homepage-main-container'>
            <div className ='overlay'></div>
            <video src = {surfVideo} autoPlay loop muted playsInline className='Homepage-video'/>
            <div className = 'Homepage-content'>
            </div>
        </div>
    )
}

export default HomePage;
