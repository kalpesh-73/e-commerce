import {  BrowserRouter as Router,Routes,Route  } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContext from "./components/MainContext";
import ProductPage from "./components/ProductPage";
import CartData from "./components/CartData";



function App() {


  return (
  <Router>
    <div className="flex h-screen">
      <Sidebar/>

      <div className="rounded w-full flex justify-between flex-wrap">
        
<Routes>
    <Route path="/" element={<MainContext />} />
    <Route path="/products/:id" element={<ProductPage/>}/>
    <Route path="/cart" element={<CartData/>}/>
</Routes>

        
      </div>
    </div>
  </Router>

  )
}

export default App
