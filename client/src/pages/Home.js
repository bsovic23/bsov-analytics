import React, { useState } from 'react';

// Imports - Components/Pages
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [preview, setPreview] = useState({
        title: '',
        link: '',
        image: ''
    });

    const handleLinkHover = (title, description, image) => {
        setPreview({
            title,
            description,
            image
        })
    };

    return(
        <section id='home'>
            <div class='home-section'>
                <div>
                    < Sidebar onLinkHover={handleLinkHover} enableHover={true}/>
                </div>
                <div id='home-preview-section'>
                    {preview.title && (
                        <div id='home-preview-info'>
                            <h2>{preview.title}</h2>
                            <p>{preview.description}</p>
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