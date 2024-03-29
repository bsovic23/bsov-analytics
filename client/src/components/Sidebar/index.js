import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from '../SidebarData';

export const Sidebar = ({ onLinkHover, enableHover }) => {

    const handleMouseEnter = (val) => {
        if (enableHover) {
            onLinkHover(val.title, val.description, val.image)
        }
    };

    const handleMouseLeave = () => {
        if (enableHover) {
            onLinkHover(null)
        } 
    };

    return(
        <div class='sidebar'>
            <ul class='sidebar-list'>
            {SidebarData.map((val, key) => {
                return(
                    <Link 
                        key={key}
                        to={val.link}
                        style={{ textDecoration: 'none'}}
                        onMouseEnter={() => handleMouseEnter(val)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button class='sidebar-row'>
                            <div id='sidebar-icon'>{val.icon}</div>
                            <div id='sidebar-title'>{val.title}</div>
                        </button>
                    </Link>
                )
            })}
            </ul>
        </div>
    )
};

export default Sidebar;