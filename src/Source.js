import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Slidebar from "./Slidebar";
import Header from "./Header";
import { Toast } from 'primereact/toast';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileSliderbar from "./MobileSliderbar";

// const months = [
//     "January", "February", "March", "April",
//     "May", "June", "July", "August",
//     "September", "October", "November", "December"
// ];

// const currentYear = new Date().getFullYear();
// const years = Array.from({ length: 6 }, (_, index) => (currentYear - index).toString());

function Source({ id }) {
    const [salaryDate, setSelectedDate] = useState("");
    // const [Year, setSelectedYear] = useState("2024");
    const [sourceName, setSourceName] = useState("");
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();
    const toast = useRef(null);


    const onChangeSalaryDate = (event) => {
        setSelectedDate(event.target.value)
    }

    // const handleSelectChange = (event) => {
    //     const { name, value } = event.target;
    //     if (name === "month") {
    //         setSelectedMonth(value);
    //     } else if (name === "year") {
    //         setSelectedYear(value);
    //     }
    // };
    const handleSourceNameChange = (event) => {
        setSourceName(event.target.value)
    }
    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const values = {
            sourceName, amount, salaryDate
        }

        if (!values.sourceName) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter sourceName' });
            return;
        }
        else if (!values.amount) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter amount' });
            return;
        }

        else if (!values.salaryDate) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter salaryDate' });
            return;
        }
        else {

            axios.post("http://localhost:8084/addSource", values)
                .then(res => {
                    console.log(res);

                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Source of Income added successfully' });

                    document.getElementById("myForm").reset();
                })
                .catch(err => {
                    console.log(err);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add Source of Income' });
                });
        }
        // console.log(values)

    }

    const onBack = () => {
        navigate("/dashBoard");
    }

    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <>
            <div className="d-flex flex-column">
                <div>
                    <Header id={id} />
                </div>


                {isMobile && (

                    <div className="d-flex mb-5">
                        <MobileSliderbar />
                    </div>
                )}

                <div>
                    <div class="d-flex">
                        {!isMobile && (
                            <div style={{ width: "15%" }}>
                                <Slidebar />
                            </div>
                        )}
                        <div style={{ width: isMobile ? "100%" : "85%", backgroundColor: "whiteSmoke", top: 100 }} className="d-flex flex-column justify-content-center align-items-center vh-100">
                            <Toast ref={toast} />
                            <h1 style={{ color: "navy" }}>ADD THE <i style={{ color: "red" }}>SOURCE</i> OF INCOME</h1>
                            <form id="myForm" onSubmit={handleSubmit} className="bg-white rounded p-5 mx-5" style={{ width: isMobile ? "90%" : "60%", height: "50%" }}>


                                <div className="mb-5 row">
                                    <div class="col-5">
                                        <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Source Name:</label>
                                    </div>
                                    <div class="col-7">
                                        <input type="text" placeholder="Enter source Name" className="form-control"
                                            onChange={handleSourceNameChange} />
                                    </div>
                                </div>
                                <div className="mb-5 row">
                                    <div class="col-5">
                                        <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Amount:</label>
                                    </div>
                                    <div class="col-7">
                                        <input type="number" placeholder="Enter cost" className="form-control"
                                            onChange={handleAmountChange} />
                                    </div>
                                </div>

                                <div className="mb-5 row">
                                    <div class="col-5">
                                        <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Salary Date:</label>
                                    </div>
                                    <div class="col-7">
                                        <input type="date" placeholder="Enter purchase Date" className="form-control"
                                            onChange={onChangeSalaryDate} />
                                    </div>
                                </div>
                                {/* <div className="mb-5 row">
                                    <div class="col-4">
                                        <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Month:</label>
                                    </div>
                                    <div class="col-7">
                                        <select name="month" class="form-control" value={Month} onChange={handleSelectChange}>
                                            <option value="select Month">Select Month</option>
                                            {months.map((month, index) => (
                                                <option key={index} value={index + 1}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div> */}

                                {/* <div className="mb-5 row">
                                    <div class="col-4">
                                        <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Year:</label>
                                    </div>
                                    <div class="col-7">
                                        <select
                                            name="year"
                                    
                                            className="form-control"
                                            value={Year}
                                            onChange={handleSelectChange}
                                        >
                                            {years.map((year, index) => (
                                                <option key={index} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div> */}


                                <div className="mb-5 mt-5 d-flex justify-content-between mx-5">
                                    <button onClick={onBack} type="button" class="btn btn-info btn-lg">Back</button>
                                    <button type="submit" class="btn btn-primary btn-lg">ADD</button>
                                </div>

                            </form>



                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Source