import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from 'react-router-dom';
import surfVideo from '../assets/Nalu.mp4'
import LinkedIn from '../assets/linkdin.png'
import github from '../assets/git.png'
import './HomePage.css'

const HomePage = () => {

    return (
        <div className='home-main-container'>
            <div className='overlay'></div>
            <video src={surfVideo} autoPlay loop muted playsInline className='home-video' />
            <div className='Homepage-content'>
                <div className='h1'>Nalu: wave - Hawaiian</div>
                <div className='h1'>Ke nalu nei ka moana, the ocean is full of waves.</div>
                <div className='about'>Explore new surfing spots wherever you go, track your surf sessions and find your surf buddies with Nalu ...</div>
                <div className='home-explore'>
                    <NavLink className='home-spots' to={'/spots'}>Find your wave</NavLink>
                </div>
                <div className='about-link-container'>
                    <div className='by'>
                        Brought to you by
                    </div>
                    <div className = 'by'>
                        Aspiring surfer - Yen Nguyen
                    </div>
                    <div className='logo-container'>
                        <div className='about-linkedin'>
                            <a href='https://www.linkedin.com/in/nguyen-yen-dsgn/'>
                                <img src={LinkedIn} alt='linkedin-logo' style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '10px' }} />
                            </a>
                        </div>
                        <div className='about-linkedin'>
                            <a href='https://github.com/haiyen2003'>
                                <img src={github} alt='git-logo' style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '10px' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
