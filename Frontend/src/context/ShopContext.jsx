import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const navigate = useNavigate();

    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");

    // Fix: Fetch cart data from backend when token is available
    const fetchCartData = async () => {
        if (token) { // Only fetch if token is available
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/get`,
                    {}, // Assuming no payload required
                    { headers: { token } }
                );
                if (response.data.success) {
                    setCartItems(response.data.cartData); // Sync cart items with backend
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
                toast.error("Failed to fetch cart data.");
            }
        }
    };

    // Fetch product data from backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error fetching product data:", error);
            toast.error(error.message);
        }
    };

    // Fix: Sync cart data after token is set
    useEffect(() => {
        if (token) {
            fetchCartData(); // Ensure cart data is fetched once the token is available
        }
    }, [token]);

    const getUserCart = async (token) => {

        try {

            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })

            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {

            console.log(error)
            toast.error(error.message)

        }

    }

    // Fetch product data on app initialization
    useEffect(() => {
        getProductsData();
    }, []);

    // Sync token from localStorage
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            getUserCart(localStorage.getItem("token"))
        }
    }, []);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId, size },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Error adding to cart:", error);
                toast.error(error.message);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error("Error calculating cart count:", error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity > 0) {
            cartData[itemId][size] = quantity;
        } else {
            delete cartData[itemId][size]; // Fix: Remove size if quantity is zero
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]; // Fix: Remove item if no sizes remain
            }
        }
        setCartItems(cartData);



        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, size, quantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);

            if (itemInfo) {
                for (const size in cartItems[items]) {
                    const quantity = cartItems[items][size];
                    if (quantity > 0) {
                        totalAmount += quantity * itemInfo.price;
                    }
                }
            } else {
                console.log(`Product with ID ${items} not found`);
            }
        }

        return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
