import { Link } from 'react-router-dom';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LiaDeskpro, LiaProceduresSolid } from "react-icons/lia";
import { TbReportSearch } from "react-icons/tb";
import { SiProxmox } from "react-icons/si";
import './Slidebar.css';
import { useState, useEffect } from 'react';

function Slidebar() {
    const [activeButton, setActiveButton] = useState("dashboard");

    useEffect(() => {
        const currentPath = window.location.pathname;
        switch (currentPath) {
            case "/dashBoard":
                setActiveButton("dashboard");
                break;
            case "/additems":
                setActiveButton("additems");
                break;
            case "/addcat":
                setActiveButton("addcat");
                break;
            case "/source":
                setActiveButton("source");
                break;
            case "/reports":
                setActiveButton("reports");
                break;
            default:
                setActiveButton("dashboard");
                break;
        }
    }, []);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <>
        <div className='slidebar d-flex flex-column' style={{ position: 'fixed', top: 80, left: 0, width: "15%",height:"100vh" }}>

            <Link to="/dashBoard" className='nav-link'>
                <button onClick={() => handleButtonClick('dashboard')} className={`mb-5 mt-2 ${activeButton === 'dashboard' ? "active" : "sideButton"}`}>
                    <SiProxmox style={{ marginRight: "50px" }} />DashBoard
                </button>
            </Link>

            <Link to="/additems" className='nav-link'>
                <button onClick={() => handleButtonClick('additems')} className={`mb-5 ${activeButton === 'additems' ? "active" : "sideButton"}`}>
                    <MdOutlineProductionQuantityLimits style={{ marginRight: "50px" }} /> Add Expences
                </button>
            </Link>

            <Link to="/addcat" className='nav-link'>
                <button onClick={() => handleButtonClick('addcat')} className={`mb-5 ${activeButton === 'addcat' ? "active" : "sideButton"}`}>
                    <LiaDeskpro style={{ marginRight: "50px" }} />   Add Category
                </button>
            </Link>

            <Link to="/source" className='nav-link'>
                <button onClick={() => handleButtonClick('source')} className={`mb-5 ${activeButton === 'source' ? "active" : "sideButton"}`}>
                    <LiaProceduresSolid style={{ marginRight: "50px" }} />   Add Source
                </button>
            </Link>

            <Link to="/reports" className='nav-link'>
                <button onClick={() => handleButtonClick('reports')} className={`mb-5 ${activeButton === 'reports' ? "active" : "sideButton"}`}>
                    <TbReportSearch style={{ marginRight: "50px" }} />   Reports
                </button>
            </Link>
        </div>
        

        </>
    );
}

export default Slidebar;
