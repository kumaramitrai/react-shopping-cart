import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const ShopContext = createContext({
  products: [],
  cartItems: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  reduceQuantity: () => {},
  clearCart: () => {},
});

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      const newItem = { product, quantity };
      setCartItems([...cartItems, newItem]);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
  };

  const reduceQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity - 1) } // Ensure quantity is at least 0
        : item
    );

    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        reduceQuantity,
        clearCart,
        setCartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

ShopProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
