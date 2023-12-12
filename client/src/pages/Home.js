import React, { useState } from 'react';

// Imports - Components/Pages
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [previewLink, setPreviewLink] = useState(null);

    const handleLinkHover = (link) => {
        setPreviewLink(link);
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
                    {previewLink && (
                        <div>
                            {previewLink}
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