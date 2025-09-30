import {createContext, useState} from "react";
import {products} from "../assets/assets";
import {useNavigate} from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate()

    const value = {
        products,
        search, setSearch,
        showSearch, setShowSearch,
        navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
