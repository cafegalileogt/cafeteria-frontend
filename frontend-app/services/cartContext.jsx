import React, { createContext, useState, useContext } from "react";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id_producto === item.id_producto);
      if (exists) {
        return prev.map((p) =>
          p.id_producto === item.id_producto
            ? { ...p, count: p.count + item.count }
            : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id_producto) => {
    setCartItems((prev) => prev.filter((p) => p.id_producto !== id_producto));
  };


  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);