
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Toast } from 'primereact/toast';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
import Slidebar from "./Slidebar";
import Header from "./Header";
// import { useLocation } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileSliderbar from "./MobileSliderbar";


function Additems({ id }) {
    // const location = useLocation();
    // const { id } = this.props;
    // const id = location.state.id;
    console.log(id)

    const [Data, setData] = useState([])
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("select");
    const [selectedProduct, setSelectedProduct] = useState("");
    const [cost, setCost] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [description, setDescription] = useState("");
    const [selectedSource, setSelectedSource] = useState("select Source");
    const [sourceData, setSourceData] = useState([])

    const [taxApplicable, setTaxApplicable] = useState("no");
    const [percentage, setPercentage] = useState("");
    const [taxAmount, setTaxAmount] = useState("");

    const toast = useRef(null);
    const navigate = useNavigate();
    console.log(products)
    useEffect(() => {
        fetch('http://localhost:8084/categories')
            .then(res => res.json())
            .then(data => setData(data)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))

        fetchProducts("select");
    }, [])

    useEffect(() => {
        fetch('http://localhost:8084/getSource')
            .then(res => res.json())
            .then(data => setSourceData(data)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))

        fetchProducts("select");
    }, [])

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
    };

    useEffect(() => {
        fetchProducts(selectedCategory);
    }, [selectedCategory]);

    const fetchProducts = (category) => {
        fetch(`http://localhost:8084/products/${category}`)
            .then(res => res.json())
            .then(data => setProducts(data))

            .catch(err => console.log(err));
    };


    const handleProductChange = (event) => {
        const selectedProduct = event.target.value;
        setSelectedProduct(selectedProduct);
    };

    const handleSourceSelectChange = (event) => {
        setSelectedSource(event.target.value)
    }

    const handleTaxApplicableChange = event => {
        setTaxApplicable(event.target.value)



    }

    const onPercentage = (event) => {
        // const cost = parseFloat(values.cost);
        // const { cost } = values
        const percentage = event.target.value;
        setPercentage(percentage);
        const calculatedTaxAmount = (cost * (percentage / 100)).toFixed(2);

        setTaxAmount(calculatedTaxAmount);


    }

    const onChangeCost = (event) => {
        setCost(event.target.value)
    }

    const onChangePurchaseDate = (event) => {
        setPurchaseDate(event.target.value)
    }

    const onChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseData = {
            selectedCategory, selectedProduct, cost, selectedSource, purchaseDate, description, taxApplicable, percentage, taxAmount
        }

        if (selectedCategory === "select") {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please Select category' });
            return;
        }
        else if (selectedProduct === "") {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please Select Product' });
            return;
        }
        else if (cost === "") {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please Enter cost' });
            return;
        }
        else if (selectedSource === "select Source") {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please Select source' });
            return;
        } else if (purchaseDate === "") {
            toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Please Select purchaseDate' });
            return;
        } else {
            axios.post("http://localhost:8084/postExpenseData", expenseData)
                .then(res => {
                    console.log(res);
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Source of Expence added successfully' });
                    document.getElementById("addForm").reset();
                    setTaxApplicable("no")
                    setPercentage("")
                    setTaxAmount("")
                    setSelectedSource("select Source")
                    setDescription("")
                    setPurchaseDate("")
                    setCost("")
                    setSelectedProduct("")
                    setSelectedCategory("")

                })
                .catch(err => {
                    console.log(err);


                });
        }
    }


    const onBack = () => {
        navigate("/dashBoard");
    }

    const uniqueSourceNames = [...new Set(sourceData.map((d) => d.sourceName))];

    const isMobile = useMediaQuery('(max-width:600px)');
    // console.log(uniqueSourceNames)

    return (
        <div className="d-flex flex-column">

            <div>
                <Header id={id} />
            </div>

            {isMobile && (

                <div className="d-flex mb-5">
                    <MobileSliderbar />
                </div>
            )}
            <div >
                <div class="d-flex">
                    {!isMobile && (
                        <div style={{ width: "15%" }}>
                            <Slidebar />
                        </div>
                    )}
                    <div className="d-flex flex-column" style={{ width: isMobile ? "100%" : "85%", backgroundColor: 'whiteSmoke' }}>
                        <Toast ref={toast} />
                        {/* <div className="bg-secondary rounded p-5 mx-5" style={{ width: "90%", height: "100%" }}> */}
                        <h2 style={{ color: "navy", textAlign: "start", width: "300px", marginTop: "150px", marginLeft: "50px" }}>Add Expence</h2>
                        <form id="addForm" className=" rounded p-5 mb-5" style={{ width: "90%", height: "50%" }} onSubmit={handleSubmit}>
                            <div className="mb-5 row">
                                <div class="col-6">
                                    <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Category:</label>
                                </div>
                                <div class="col-6">
                                    <select id="id" class="form-control" value={selectedCategory}
                                        onChange={handleSelectChange}>
                                        <option value="select">Select</option>
                                        {Data.map((d) => (
                                            <option key={d.categoryId} value={d.category}>
                                                {d.category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-5 row">
                                <div class="col-6">
                                    <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Expence Name:</label>
                                </div>
                                <div class="col-6">
                                    {/* <input type="text" placeholder="Enter productName" className="form-control "
                                    value={product}/> */}

                                    <select
                                        className="form-control"
                                        value={selectedProduct}
                                        onChange={handleProductChange}
                                    >
                                        <option value="">Select a Product</option>
                                        {products.map((product) => (
                                            <option key={product.productId} value={product.product}>
                                                {product.product}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-5 row">
                                <div class="col-6">
                                    <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>cost:</label>
                                </div>
                                <div class="col-6">
                                    <input type="number" placeholder="Enter cost" className="form-control"
                                        onChange={onChangeCost} />
                                </div>
                            </div>


                            <div className="mb-5 row">
                                <div class="col-6">
                                    <label htmlFor="costFrom" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Cost From:</label>
                                </div>
                                <div class="col-6">
                                    <select id="costFrom" class="form-control" value={selectedSource}
                                        onChange={handleSourceSelectChange}>
                                        <option value="select">Select the source</option>
                                        {uniqueSourceNames.map((sourceName) => (
                                            <option key={sourceName} value={sourceName}>
                                                {sourceName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-5 row">
                                <div class="col-6">
                                    <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>purchase Date:</label>
                                </div>
                                <div class="col-6">
                                    <input type="date" placeholder="Enter purchase Date" className="form-control"
                                        onChange={onChangePurchaseDate} />
                                </div>
                            </div>

                            <div className="mb-5 row">
                                <div class="col-6">
                                    <label htmlFor="" className="px-5 fw-bold pt-5" style={{ color: "navy", fontSize: '20px' }}>Description:</label>
                                </div>
                                <div class="col-6">
                                    <textarea rows="4" placeholder="This is the default text inside the textarea." cols="50" className="form-control" onChange={onChangeDescription}>

                                    </textarea>

                                </div>
                            </div>

                            <div className="mb-5 row">
                                <div class="col-6">
                                    <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Tax Applicable:</label>
                                </div>
                                <div class="col-6" style={{ display: "flex" }}>
                                    <div className="px-5">
                                        <input type="radio" id="yes" name="yesORno" value="yes" onChange={handleTaxApplicableChange} checked={taxApplicable === "yes"} />
                                        <label for="yes">YES</label>
                                    </div>
                                    <div className="px-5">
                                        <input type="radio" id="no" name="yesORno" value="no" onChange={handleTaxApplicableChange} checked={taxApplicable === "no"} />
                                        <label for="no">NO</label>
                                    </div>
                                </div>

                            </div>
                            {taxApplicable === "yes" ? (
                                <>
                                    <div className="mb-5 row">
                                        <div class="col-6">
                                            <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Tax Percentage:</label>
                                        </div>
                                        <div class="col-6 ">
                                            <input type="number" placeholder="Enter percentage" className="form-control"
                                                onChange={onPercentage} value={percentage} />
                                        </div>

                                    </div>
                                    <div className="mb-5 row">
                                        <div class="col-6">
                                            <label htmlFor="" className="px-5 fw-bold" style={{ color: "navy", fontSize: '20px' }}>Tax Amount:</label>
                                        </div>
                                        <div class="col-6 ">
                                            <input type="number" value={taxAmount} className="form-control" disabled />
                                        </div>


                                    </div>

                                </>


                            ) : ""}
                            {/* {taxApplicable === "yes"?<p>ok</p>:""} */}
                            <div className="mb-5 mt-5 d-flex justify-content-between mx-5">
                                <button onClick={onBack} type="button" class="btn btn-info btn-lg">Back</button>
                                <button type="submit" class="btn btn-primary btn-lg">ADD</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* </div> */}

        </div>
    );
}

export default Additems;
