import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import Slidebar from "./Slidebar";
import Header from "./Header";
import { Toast } from 'primereact/toast';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileSliderbar from "./MobileSliderbar";


function AddCategory({ id }) {
    const [values, setValues] = useState({
        category: "",
        product: "",
    })
    const [isLoading, setIsLoading] = useState(false);
    const [Data, setData] = useState([])
    const [selectedOption, setSelectedOption] = useState("select");
    const navigate = useNavigate();
    const toast = useRef(null);

    const categoryData = {
        category: values.category,
    };

    const productData = {
        category: selectedOption,
        product: values.product,
    };

    const handleSubmitCategory = (e) => {
        e.preventDefault();
        // setIsLoading(true)

        if (!values.category) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter category' });
            return;
        }
        else {

            axios.post("http://localhost:8084/addshopcategory", categoryData)
                .then(res => {
                    console.log(res);
                    setValues({})
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'category added successfully' });

                    setValues({
                        category: ""
                    });

                    setIsLoading(false)

                })
                .catch(err => {
                    console.log(err);

                });
        }
    };

    const handleSubmitProduct = (e) => {
        e.preventDefault();
        // setIsLoading(true)
        if (selectedOption === "select") {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please select category' });
            return;
        }
        else if (!values.product) {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please enter product' });
            return;
        }
        axios.post("http://localhost:8084/addproduct", productData)
            .then(res => {
                console.log(res);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
                setIsLoading(false)
                setSelectedOption("select")
                setValues({
                    category: "",
                    product: ""
                });

            })
            .catch(err => {
                console.log(err);


            });

    };

    useEffect(() => {
        fetch('http://localhost:8084/categories')
            .then(res => res.json())
            .then(data => setData(data)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
    }, [])

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        // const selectedData = Data.find(d => d.name === selectedValue);
        // console.log(selectedData)
        // setAddress(selectedData ? selectedData.address : "");
        // setContactNo(selectedData ? selectedData.contactNo : "");
    };



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
                        <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ width: isMobile ? "100%" : "85%" }}>

                            {isLoading && (
                                <div className="d-flex justify-content-center align-items-center" style={{ height: '150px' }}>
                                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />
                                </div>
                            )}

                            {!isLoading && (
                                <div className="d-flex flex-column justify-content-center align-items-center rounded p-5" style={{ width: "100%", height: "100%", backgroundColor: "whitesmoke" }}>
                                    <Toast ref={toast} />

                                    <h2 style={{ color: "navy", marginTop: "10px" }} className="pb-2">Add Category & Product</h2>


                                    <form className="bg-white rounded p-5 mb-5" style={{ width: isMobile ? "100%" : "70%", height: "20%" }} onSubmit={handleSubmitCategory}>

                                        <div className="row">
                                            <div class="col-2">
                                                <label htmlFor="" className="fw-bold" style={{ color: "navy", fontSize: '20px' }}>Add category:</label>
                                            </div>
                                            <div class="col-6">
                                                <input type="text" placeholder="Enter Category Name" className="form-control mx-5"
                                                    onChange={e => setValues({ ...values, category: e.target.value })} />
                                            </div>
                                            <div class="col-2"></div>
                                            <div class="col-2">
                                                {isMobile && <button type="submit" class="btn btn-primary btn-sm">ADD</button>}
                                                {!isMobile && <button type="submit" class="btn btn-primary btn-lg">ADD</button>}

                                            </div>

                                        </div>






                                    </form>

                                    <p>*Add product first you need to choose choose category</p>

                                    <form className="bg-white rounded p-5" style={{ width: isMobile ? "100%" : "70%" }} onSubmit={handleSubmitProduct}>
                                        <div className="row">
                                            <div class="col-5 mb-5">
                                                <label htmlFor="" className="fw-bold" style={{ color: "navy", fontSize: '20px' }}>choose Category:</label>
                                            </div>

                                            <div class="col-7">
                                                <select id="id" class="form-control" value={selectedOption}
                                                    onChange={handleSelectChange}>
                                                    <option value="select">Select Category</option>
                                                    {Data.map((d) => (
                                                        <option key={d.categoryId} value={d.category}>
                                                            {d.category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div class="col-5">
                                                <label htmlFor="" className="fw-bold" style={{ color: "navy", fontSize: '20px' }}>product Name:</label>
                                            </div>

                                            <div class="col-7">
                                                <input type="text" placeholder="Enter Product Name" className="form-control"
                                                    onChange={e => setValues({ ...values, product: e.target.value })} />
                                            </div>



                                        </div>

                                        <div className="row d-flex justify-content-between mt-5">
                                            <div class="col-4">
                                                <button onClick={onBack} type="button" class="btn btn-info btn-lg">Back</button>
                                            </div>
                                            <div class="col-4">
                                                <button type="submit" class="btn btn-primary btn-lg">ADD</button>
                                            </div>
                                        </div>

                                    </form>


                                </div>

                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddCategory