import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
    return(
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <NavBar/>
            <Routes>
              <Route path="/" component={Home} />
              <Route path="/collection" component={Collection} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/product/:productId" component={Product} />
              <Route path="/card" component={Cart} />
              <Route path="/login" component={Login} />
              <Route path="/place-order" component={PlaceOrder} />
              <Route path="/orders" component={Orders} />
            </Routes>
        </div>
    )
}
export default App;
