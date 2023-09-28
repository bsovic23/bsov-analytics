import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const navElements = [
        {id: 1, text: 'Home', link: "/bsov-analytics"},
        {id: 2, text: 'Data Dictionary', link: "/DataDictionary"},
        {id: 3, text: 'Registry', link: "/Registry"},
    ];

    return(
        <section class='navbar'>
            {navElements.map((nav) => (
              <Link 
                key={nav.id}
                to={nav.link}
                >
                    <button>
                        {nav.text}
                    </button>
                </Link>
            ))}
        </section>
    )
};

export default Navbar;