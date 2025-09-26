import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Account from "./pages/Account.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import NavBar from "./components/global/NavBar.jsx";
import Footer from "./components/global/Footer.jsx";
import SearchBar from "./components/global/SearchBar.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import { ToastContainer } from "react-toastify";

import { store, persistor } from "./store"; // import persistor
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                    <ToastContainer />
                    <NavBar />
                    <SearchBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/collection" element={<Collection />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product/:productId" element={<Product />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/place-order" element={<PlaceOrder />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                    </Routes>
                    <Footer />
                </div>
            </PersistGate>
        </Provider>
    );
};

export default App;
