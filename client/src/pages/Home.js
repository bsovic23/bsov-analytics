import React, { useState } from 'react';

// Imports - Components/Pages
import Navbar from '../components/Navbar';

const Home = () => {
    return(
        <section class='page' id='home'>
            <header class='header'>
                <h1>HOME</h1>
                <p>Click the Nav buttons below to see the associated analytics</p>
                < Navbar />
            </header>
            <footer>
                FOOTER HERE
            </footer>
        </section>
    )
};

export default Home;