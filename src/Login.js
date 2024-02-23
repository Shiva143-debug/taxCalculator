import { useState,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';

import './Login.css';

function Login({ setUserId }) {
    const [registerClicked, setRegisterClick] = useState(true)
    const [loginClicked, setLoginClick] = useState(false)
    const [FullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setmobileNumber] = useState("")
    const [address, setAddress] = useState("")
    const [loginEmail, setLoginEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const toast = useRef(null);


    const onRegisterClick = () => {
        setRegisterClick(true)
        setLoginClick(false)

    }

    const onLoginClick = () => {
        setLoginClick(true)
        setRegisterClick(false)

    }

    const handleFormSubmit = (e) => {

        e.preventDefault();
        const values = {
            FullName, email, mobileNo, address
        }

        if (!values.FullName) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter FullName' });
            return;
        }
        else if (!values.email) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter email' });
            return;
        }

        else if (!values.mobileNo) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter mobileNo' });
            return;
        }
        else if (!values.address) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter address' });
            return;
        }
        else{

        axios.post("http://localhost:8084/register", values)
            .then(res => {
                console.log(res);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'User Account Created successfully' });
                // document.getElementById("register").reset();
                setFullName("")
                setEmail("")
                setmobileNumber("")
                setAddress("")
            })
            .catch(err => {
                console.log(err);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Email already exists. Please use a different email address.' });
            });
        }

    }




    const handleLoginFormSubmit=(e)=>{

        e.preventDefault();
        const values = {
            loginEmail, password
        }
        if (!values.loginEmail) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter valid Email' });
            return;
        }
        else if (!values.password) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter password' });
            return;
        }
        else{

        axios.post("http://localhost:8084/login", values)
        .then(res => {
           
            
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
            setLoginEmail("")
            setPassword("")
            setTimeout(()=>{
                // navigate("/dashboard")
                // let id = res.data.result.id;
                navigate("/dashBoard");
                setUserId(res.data.result.id);
            },1000)
            
            

        })
        .catch(err => {
            console.log(err);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid email or password' });
        });

    }

    }



    return (
        <div className="login-form-container" >
            <Toast ref={toast} />

            <img
                src="images\login.jpg"
                className="login-img"
                alt="website login"
            />

            <div className='form-container'>
                {/* <Toast ref={toast} /> */}
                {/* 
                <img
                    src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1675668478/Standard_Collection_8_lbjbou.svg"
                    className="login-website-logo-desktop-img"
                    alt="website logo"
                />
                <h1 className="app-name">APP NAME</h1> */}
                <div className='d-flex' style={{ width: "100%" }}>
                    <button onClick={onRegisterClick} style={{ backgroundColor: registerClicked ? "gray" : "white", color: registerClicked ? "white" : "", border: "1px solid whitesmoke", width: "100%", padding: "5px" }}>Register</button>
                    <button onClick={onLoginClick} style={{ backgroundColor: loginClicked ? "gray" : "white", color: loginClicked ? "white" : "", border: "1px solid whitesmoke", width: "100%", padding: "5px" }}>Login</button>
                </div>
                {registerClicked &&
                    <form id="register" onSubmit={handleFormSubmit}>
                        <div className='row pt-5'>
                            <div class="col-5">
                                <label htmlFor="" className="px-2 fw-bold" style={{ color: "navy", fontSize: '20px' }}>FullName:</label>
                            </div>
                            <div class="col-7">
                                <input
                                    type="text"
                                    placeholder="FullName"
                                    value={FullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    style={{ height: "30px" }}
                                    className="form-control mx-3"
                                />
                            </div>

                        </div>

                        <div className='row pt-5'>
                            <div class="col-5">
                                <label htmlFor="" className="px-2 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Email:</label>
                            </div>
                            <div class="col-7">
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ height: "30px" }}
                                    className="form-control mx-3"
                                />
                            </div>

                        </div>

                        <div className='row pt-5'>
                            <div class="col-5">
                                <label htmlFor="" className="px-2 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Mobile Number:</label>
                            </div>
                            <div class="col-7">
                                <input
                                    type="number"
                                    placeholder="Enter Mobile Number"
                                    value={mobileNo}
                                    onChange={(e) => setmobileNumber(e.target.value)}
                                    style={{ height: "30px" }}
                                    className="form-control mx-3"
                                />
                            </div>

                        </div>

                        <div className='row pt-5'>
                            <div class="col-5">
                                <label htmlFor="" className="px-2 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Address:</label>
                            </div>
                            <div class="col-7">
                                <input
                                    type="text"
                                    placeholder="Enter Adress"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    style={{ height: "30px" }}
                                    className="form-control mx-3"
                                />
                            </div>

                        </div>
                        <div className='button-container'>
                            <button type="submit" className="login-button">
                                Register
                            </button>
                        </div>
                    </form>
                }

                {loginClicked &&
                    <form id="login" onSubmit={handleLoginFormSubmit}>
                        <div className='row pt-5'>
                            <div class="col-5">
                                <label htmlFor="" className="px-2 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Email:</label>
                            </div>
                            <div class="col-7">
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    style={{ height: "30px" }}
                                    className="form-control mx-3"
                                />
                            </div>

                        </div>

                        <div className='row pt-5'>
                            <div class="col-5">
                                <label htmlFor="" className="px-2 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Password:</label>
                            </div>
                            <div class="col-7">
                                <input
                                    type="text"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ height: "30px" }}
                                    className="form-control mx-3"
                                />
                            </div>

                        </div>

                        <div className='button-container'>
                            <button type="submit" className="login-button">
                                Login
                            </button>
                        </div>
                        
                    </form>
                }

            </div>
        </div>
    )
}

export default Login