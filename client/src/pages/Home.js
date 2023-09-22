import React, { useState } from 'react';

// Imports - Components/Pages
import Navbar from '../components/Navbar';

const Home = () => {
    return(
        <section class='page' id='home'>
            <header>
                <h1>HOME</h1>
                < Navbar />
            </header>
            <section>
                INSERT INFORMATION ABOUT WHAT THIS APPLICATION IS
            </section>
            <footer>
                FOOTER HERE
            </footer>
        </section>
    )
};

export default Home;