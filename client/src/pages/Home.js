import React, { useState } from 'react';

// Imports - Components/Pages
import Sidebar from '../components/Sidebar';

const Home = () => {
    return(
        <section id='home'>
            <div class='header'>
                <h1>HOME</h1>
                <p>Use the sidebar to navigate to associated analytics</p>
            </div>
            <div>
                < Sidebar />
            </div>
            <footer>
                FOOTER HERE
            </footer>
        </section>
    )
};

export default Home;