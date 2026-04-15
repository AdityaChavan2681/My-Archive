import React, { useState, createContext, useEffect } from "react";
import { frontendApi } from "../api";

export const AllContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const AllContextProvider = (props) => {

  const [all_product,setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    frontendApi
      .fetchItems("?limit=50")
      .then((response) => setAll_Product(response.data))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsLoading(false));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:3000/getCart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:"",
      }).then((response)=>response.json())
      .then((data)=>setCartItems(data));
    }
  },[])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:3000/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
      })
        .then((response)=>response.json())
        .then((data)=>console.log(data));

    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:3000/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    isLoading,
    error,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <AllContext.Provider value={contextValue}>
      {props.children}
    </AllContext.Provider>
  );
};

export default AllContextProvider;
