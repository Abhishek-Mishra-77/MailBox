import React from 'react';
import NavBar from '../Header/NavBar';
import './Home.css';

const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <div className='home'>
                    <h2>Welcome to the Home Page!</h2>
                </div>
            </div>
        </>
    )
}

export default Home