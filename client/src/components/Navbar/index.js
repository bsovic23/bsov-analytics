import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({navElements}) => {
    return(
        <section class='navbar'>
            {navElements.map((nav) => (
                <li key={nav.id}>
                    {nav.text}
                </li>
            ))}
        </section>
    )
};

export default Navbar;