import Additems from "./Additems"
// import AddCategory from "./AddCategory"


import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AddCategory from "./AddCategory";
import Source from "./Source"
import Login from "./Login"

import DashBoard from "./DashBoard"
import Reports from "./Reports";

import { useEffect,useState } from "react";



function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    document.title = "Tax calculator";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setUserId={setUserId} />}
        ></Route>
        <Route
          path="/dashBoard"
          element={<DashBoard id={userId} />}
        ></Route>
        <Route
          path="/additems"
          element={<Additems id={userId} />}
        ></Route>
        <Route
          path="/addcat"
          element={<AddCategory id={userId} />}
        ></Route>
        <Route
          path="/source"
          element={<Source id={userId} />}
        ></Route>
        <Route
          path="/reports"
          element={<Reports id={userId} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;










// import Additems from "./Additems"
// // import AddCategory from "./AddCategory"


// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css"
// import "primereact/resources/themes/lara-light-indigo/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import AddCategory from "./AddCategory";
// import Source from "./Source"
// import Login from "./Login"

// import DashBoard from "./DashBoard"
// import Reports from "./Reports";

// import { useEffect } from "react";




// function App() {

//   useEffect(() => {
//     document.title = "Tax calculator";
//   }, []);


//   return (


//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />}></Route>
//         <Route path="/dashBoard" element={<DashBoard />}></Route>
//         <Route path="/additems" element={<Additems />}></Route>
//         <Route path="/addcat" element={<AddCategory />}></Route>
//         <Route path="/source" element={<Source />}></Route>
//         <Route path="/reports" element={<Reports />}></Route>

//       </Routes>
//     </BrowserRouter>

//   );
// }

// export default App;

