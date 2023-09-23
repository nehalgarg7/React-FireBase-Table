import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css"

function Header() {
    const[activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/")
        {
            setActiveTab("Home")
        }
        else if(location.pathname === "/add")
        {
            setActiveTab("AddContact");
        }
        else if(location.pathname === "/about")
        {
            setActiveTab("About");
        }
    })

  return (
    <div className='header'>
        <p className="logo">Table App</p>
        <div className="header-right">
            <Link to = '/'>
                <p className={`${activeTab === "Home" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
                >
                    Home
                </p>
            </Link>
            <Link to = '/add'>
                <p className={`${activeTab === "AddContact" ? "active" : ""}`}
                onClick={() => setActiveTab("Home")}
                >
                    Add Contact
                </p>
            </Link>
            <Link to = '/about'>
                <p className={`${activeTab === "About" ? "active" : ""}`}
                onClick={() => setActiveTab("About")}
                >
                    About
                </p>
            </Link>
        </div>

    </div>
  )
}

export default Header