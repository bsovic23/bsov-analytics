import React, { useState } from 'react';

// Imports - Components/Pages
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [preview, setPreview] = useState({
        title: '',
        icon: '',
        link: '',
        image: ''
    });


    const handleLinkHover = (title, icon, link, image) => {
        setPreview({
            title,
            icon,
            link,
            image
        })
    };

    return(
        <section id='home'>
            <div class='header'>
                <h1>HOME</h1>
                <p>Use the sidebar to navigate to associated analytics</p>
            </div>
            <div class='home-section'>
                <div>
                    < Sidebar onLinkHover={handleLinkHover}/>
                </div>
                <div id='home-preview'>
                    {preview.title && (
                     <div>
                     <h2>{preview.title}</h2>
                     <p>{preview.icon}</p>
                     <p>{preview.link}</p>
                     {preview.image && <img src={preview.image} alt="Preview" />}
                 </div>
                    )}
                </div>
            </div>
            <footer>
                FOOTER HERE
            </footer>
        </section>
    )
};

export default Home;