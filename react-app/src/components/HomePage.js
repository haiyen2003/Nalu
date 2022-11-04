import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from 'react-router-dom';
import surfVideo from '../assets/Nalu.mp4'
import './HomePage.css'

const HomePage = () => {

    return (
        <div className = 'home-main-container'>
            <div className ='overlay'></div>
            <video src = {surfVideo} autoPlay loop muted playsInline className='home-video'/>
            <div className = 'Homepage-content'>
                <h1>Nalu: wave, surf - Hawaiian </h1>
                <h1>Ke nalu nei ka moana, the ocean is full of waves.</h1>
                <div className = 'home-explore'>
                    <NavLink className = 'home-spots' to={'/spots'}>Find your wave</NavLink>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
