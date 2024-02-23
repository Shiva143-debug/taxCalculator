import React, { useRef } from 'react';
import { IoIosSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import './Login.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
// import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Header({id}) {
    // const location = useLocation();
    // const { id } = location.state || {};
    // console.log(id)
    const [isdark, setDark] = useState(false)
    
    const navigate = useNavigate();
    const toast = useRef(null);

    const [image, setImage] = useState("https://res.cloudinary.com/dxgbxchqm/image/upload/v1705489701/Screenshot_2024-01-17_163735_e4hqkc.png")


    const toggletheme = () => {
        setDark(!isdark)
    }

    // const onLogout = () => {
    //     navigate("/");
    // }

    const accept = () => {
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have LoggedOut successflly', life: 3000 });
        setTimeout(() => {
            navigate("/");
        }, 1000)

    };

    const reject = () => {
        toast.current.show({ severity: 'success', summary: 'Rejected', detail: 'You have not Logout', life: 3000 });
    };


    const confirm1 = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to Logout?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    
    const handleImageChange = (e) => {
        let img = e.target.files[0]
        console.log(img)

        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(img);

        console.log(imageUrl)

        setImage(imageUrl);

        const values = {
            imageUrl, id
        }

        console.log(values)
        axios.post('http://localhost:8084/uploadProfilePicture', values)
            .then((response) => {
                console.log('Profile picture uploaded successfully');
            })
            .catch((error) => {
                console.error('Error uploading profile picture:', error);
            });

    };

 


    useEffect(() => {
        fetch(`http://localhost:8084/getPhoto/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0 && data[0].profile_picture_url) {
                    setImage(data[0].profile_picture_url);
                }
            })
            .catch(err => console.log(err));
    }, [id,image]);

    console.log(image)


    return (
        <div className="d-flex justify-content-between" style={{ position: "fixed", width: "100%", backgroundColor: "white", zIndex: 100, padding: "10px", borderBottom: "1px solid whitesmoke" }}>
            <Toast ref={toast} />
            <ConfirmPopup />

            <img src="images/companyName.webp" alt="comapanyImage" style={{ width: "50px" }} />
            <div className="d-flex">
                {/* <p style={{ paddingTop: "20px" }}>About</p> */}
                {/* <FaMoon size={50} className="mt-2"/> */}
                {isdark === false ? (<IoMoon size={50} className="icon mt-2" onClick={(e) => toggletheme()} />) : (<IoIosSunny className="icon mt-2" size={50} onClick={(e) => toggletheme()} />)}

                {/* <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" className='profile' style={{ width: "20%", marginLeft: "20px" }} /> */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        id="profile-pic"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="profile-pic">
                  
                        <img
                            src={image || 'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'}
                            alt="profile"
                            className="profile"
                            style={{ width: '50px', height: "50px", borderRadius: "50%", marginTop: "5px", marginLeft: '20px', cursor: 'pointer' }}
                        />
                    </label>
                </div>
                <button onClick={confirm1} type="button" className="logout-button" style={{ marginTop: "10px", height: "50px" }}>Logout</button>
                {/* <Button onClick={confirm1} icon="pi pi-check" label="Confirm"></Button> */}

                {/* <h1>{id}</h1> */}
                {/* <img src={photoData.profile_picture_url} alt="aa"/> */}
            </div>


            
        </div>
    )
}

export default Header