import { useState, useEffect } from "react"

import Header from "./Header"
import Slidebar from "./Slidebar"

import "./Reports.css"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileSliderbar from "./MobileSliderbar";


const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

// const currentYear = new Date().getFullYear();
// const years = Array.from({ length: 6 }, (_, index) => (currentYear + index).toString());

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 7 }, (_, index) => (currentYear - 3 + index).toString());




function Reports({ id }) {
    const [Month, setSelectedMonth] = useState("1");
    const [Year, setSelectedYear] = useState("2024");
    const [totalCostData, setExpenseCost] = useState([])
    const [amount, setGrandTotal] = useState("")
    const [taxAmount, setTaxAMount] = useState("")

    const [sourceData, setSourceData] = useState([])
    const [totalMinusExpenseData, setFilteredSourceData] = useState([])



    // const handleSelectChange = (event) => {
    //     setSelectedMonth(event.target.value)
    // }
    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        if (name === "month") {
            setSelectedMonth(value);
        } else if (name === "year") {
            setSelectedYear(value);
        }
    };

    useEffect(() => {
        fetch('http://localhost:8084/getExpenseCost')
            .then(res => res.json())
            .then(data => setExpenseCost(data))
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        fetch('http://localhost:8084/getSource')
            .then(res => res.json())
            .then(data => setSourceData(data))
            .catch(err => console.log(err))

    }, [])

    // useEffect(() => {
    //     fetch(`http://localhost:8084/filteredSourceData?month=${Month}`)
    //         .then(res => res.json())
    //         .then(data => setFilteredSourceData(data))
    //         .catch(err => console.log(err));
    // }, [Month]);

    useEffect(() => {
        fetch(`http://localhost:8084/filteredSourceData?month=${Month}&year=${Year}`)
            .then(res => res.json())
            .then(data => setFilteredSourceData(data))
            .catch(err => console.log(err));
    }, [Month, Year]);


    useEffect(() => {
        let total = 0;
        totalCostData.forEach((d) => {
            if (d.month.toString() === Month && d.year === Year) {
                total += d.cost;
            }
        });
        setGrandTotal(total);

        let taxam = 0;
        totalCostData.forEach((d) => {
            if (d.month.toString() === Month && d.year === Year) {
                taxam += d.taxAmount;
            }
        });
        setTaxAMount(taxam);

    }, [Month, Year, totalCostData]);


    // const filteredSourceData = sourceData.filter((item) => {
    //     return item.month === Month;
    // });

    // const totalAmount = filteredSourceData.reduce((total, item) => {

    //     let totalamount = total + item.amount;

    //     return totalamount;
    // }, 0);

    const filteredSourceData = sourceData.filter((item) => {
        return item.month === Month && item.year === Year;
    });

    const aggregatedData = filteredSourceData.reduce((acc, curr) => {
        if (acc[curr.sourceName]) {
            acc[curr.sourceName] += curr.amount;
        } else {
            acc[curr.sourceName] = curr.amount;
        }
        return acc;
    }, {});


    console.log(aggregatedData)

    const totalAmount = filteredSourceData.reduce((total, item) => {
        let totalamount = total + item.amount;
        return totalamount;
    }, 0);



    // const totalRemainingBalance = filteredSourceData.reduce((ramainingtotal, sourceItem) => {
    //     const matchingExpense = totalMinusExpenseData.find((expenseItem) => expenseItem.Source === sourceItem.sourceName);
    //     const remainingBalance = matchingExpense ? sourceItem.amount - matchingExpense.totalCost : sourceItem.amount;

    //     return ramainingtotal + remainingBalance;
    // }, 0);
    const totalRemainingBalance = Object.entries(aggregatedData).reduce((total, [sourceName, amount]) => {
        const matchingExpense = totalMinusExpenseData.find((expenseItem) => expenseItem.Source === sourceName);
        const remainingBalance = matchingExpense ? amount - matchingExpense.totalCost : amount;

        return total + remainingBalance;
    }, 0);



    const filteredTotalCostData = totalCostData.filter((d) => {
        return d.month.toString() === Month & d.year.toString() === Year;
    });



    console.log(filteredSourceData)
    const isMobile = useMediaQuery('(max-width:600px)');


    return (
        <>
            <div className="d-flex flex-column">
                <div style={{ width: isMobile ? "100%" : "" }}>
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
                        <div className="d-flex flex-column" style={{ backgroundColor: "whiteSmoke" }}>

                            <div class="d-flex mb-5 mx-5">
                                <select
                                    name="month"
                                    style={{ width: isMobile ? "100px" : "300px", marginTop: "100px", marginLeft: "20px" }}
                                    className="form-control"
                                    value={Month}
                                    onChange={handleSelectChange}
                                >
                                    {months.map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                                </select>
                                <select
                                    name="year"
                                    style={{ width: isMobile ? "100px" : "300px", marginTop: "100px", marginLeft: "20px" }}
                                    className="form-control"
                                    value={Year}
                                    onChange={handleSelectChange}
                                >
                                    {years.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </select>

                            </div>

                            <h1 className="report"> {months[Month - 1]} - {Year} Report</h1>

                            <div className="d-flex justify-content-center flex-wrap">

                                <div className="card m-5 px-5 pt-2" style={{ width: isMobile ? "300px" : "600px" }}>
                                    <h1>Salary sources</h1>

                                    {/* <ol>
                                        {filteredSourceData.map((item) => (
                                            <li key={item.id}>{item.sourceName}: {item.amount}</li>
                                        ))}
                                    </ol> */}
                                    <ol>
                                        {Object.entries(aggregatedData).map(([sourceName, amount]) => (
                                            <li key={sourceName}>
                                                {sourceName}: {amount}
                                            </li>

                                        ))}
                                    </ol>

                                    <h3>Total Income: {totalAmount}</h3>
                                </div>
                                <div className="card2 m-5 px-5 pt-2" style={{ width: isMobile ? "300px" : "600px" }}>
                                    <h1>Balance After Expences</h1>

                                    {/* <ol>
                                        {filteredSourceData.map((item) => (
                                            <li key={item.id}>{item.sourceName}: {item.amount}</li>
                                        ))}

                                        {totalMinusExpenseData.map((item) => (
                                            <li key={item.id}>{item.Source}: {item.totalCost}</li>
                                        ))}
                                    </ol> */}


                                    <ol>
                                        {/* {Object.entries(aggregatedData).map(([sourceName, amount]) => (
                                            <li key={sourceName}>
                                                {sourceName}: {amount}
                                            </li>
                                        ))} */}
                                        {/* {filteredSourceData.map((sourceItem) => {
                                            const matchingExpense = totalMinusExpenseData.find((expenseItem) => expenseItem.Source === sourceItem.sourceName);
                                            const remainingBalance = matchingExpense ? sourceItem.amount - matchingExpense.totalCost : sourceItem.amount;

                                            return (
                                                <li key={sourceItem.id}>{sourceItem.sourceName}: {remainingBalance}</li>
                                            );
                                        })} */}

                                        {Object.entries(aggregatedData).map(([sourceName, amount]) => {
                                            const matchingExpense = totalMinusExpenseData.find((expenseItem) => expenseItem.Source === sourceName);
                                            const remainingBalance = matchingExpense ? amount - matchingExpense.totalCost : amount;

                                            return (
                                                <li key={sourceName}>
                                                    {sourceName}: {remainingBalance}
                                                </li>
                                            );
                                        })}
                                    </ol>

                                    <h3>Remaing Balance: {totalRemainingBalance}</h3>
                                </div>

                                <div className="card3 m-5 px-3" style={{ width: isMobile ? "150px" : "300px" }}>
                                    <h4>Expences</h4>
                                    <h2>{amount} RS/-</h2>
                                </div>
                                <div className="card4 m-5 px-3" style={{ width: isMobile ? "180px" : "300px" }}>
                                    <h4>Tax Amount</h4>
                                    <h2>{taxAmount} RS/-</h2>
                                </div>


                            </div>

                            <table className="table table-bordered mx-5" style={{ width: isMobile ? "300px" : "800px", textAlign: "center" }}>
                                <thead>
                                    <th>Product</th>
                                    <th>cost</th>
                                    <th>Source</th>
                                    <th>purchaseDate</th>
                                    <th>taxAmount</th>
                                </thead>
                                <tbody>
                                    {filteredTotalCostData.map((d, i) => (
                                        <tr key={i}>
                                            <td>{d.Product}</td>
                                            <td>{d.cost}</td>
                                            <td>{d.Source}</td>
                                            <td>{d.purchaseDate}</td>
                                            <td>{d.taxAmount}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports