import { createContext, useEffect, useState } from "react";
import axios from 'axios';
//import { products } from "../frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

    const ShopProvider = (props)=>{
        const [search, setSearch] = useState('');
        const [showSearch, setShowSearch] = useState(false);
        const [cartItems, setCartItems] = useState([]);
        const [countCart, setCountCart] = useState(0);
        const [products, setProducts] = useState([]);
        const navigate = useNavigate();

        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://blush-warp-bathroom.glitch.me/products');
                setProducts(response.data);
            } catch (error) {
                // setError('Error fetching products');
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const addToCart = (productID, productSize)=>{
        let productData = products.find(product => product.id === productID);

        if (productData.sizes && productData.sizes.length > 0 && !productSize) {
            toast.error('Select Product Size!');
            return;
        }
        let cartCopy = {...cartItems};
        let counter = countCart;
        
        if(cartCopy[productID]){
            if(productSize){
                if(cartCopy[productID][productSize]){
                    cartCopy[productID][productSize] += 1;
                }
                else{
                    cartCopy[productID][productSize] = 1;
                }
            }
            else{
                cartCopy[productID]['noSize'] = (cartCopy[productID]['noSize'] || 0) + 1;
            }
            setCountCart(counter + 1);
        }
        else{
            cartCopy[productID] = {};
            if (productSize) {
                cartCopy[productID][productSize] = 1;
            } else {
                cartCopy[productID]['noSize'] = 1;
            }
            setCountCart(counter + 1);
        }
        toast.success('Product Added To Cart.');
        setCartItems(cartCopy);
        console.log(cartCopy);
    }

    const updateQuantity = (productID, productSize, quantity)=>{
        let cartItemsCopy = {...cartItems};
        let countCartCopy = countCart - cartItemsCopy[productID][productSize];
        cartItemsCopy[productID][productSize] = quantity;
        setCountCart(countCartCopy + quantity);
        setCartItems(cartItemsCopy);
        console.log(cartItems);
    }

    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const itemId in cartItems){
            let itemData = products.find((product)=> product.id === parseInt(itemId));
            for(const itemSize in cartItems[itemId]){
                if(cartItems[itemId][itemSize] > 0){
                    totalAmount += itemData.price * cartItems[itemId][itemSize];
                }
            }
        }
        return totalAmount;
    }

    const value ={products, search, setSearch, showSearch, setShowSearch, setCartItems, cartItems, addToCart, setCountCart, countCart, updateQuantity, getCartAmount, navigate};
    
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopProvider;
