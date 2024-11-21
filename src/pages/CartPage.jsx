// src/pages/CartPage.jsx
import { useContext, useMemo } from "react";
import { ShopContext } from "../ShopContext";
// import CartItem from "../components/CartItem"; // Assuming you have a CartItem component

const CartPage = () => {
  const {
    cartItems,
    clearCart,
    increaseQuantity,
    reduceQuantity,
    setCartItems,
  } = useContext(ShopContext);

  const handleDelete = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updatedCart);
  };

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleReduceQuantity = (productId) => {
    reduceQuantity(productId);
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <div className="cart-wrapper">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart">
          {cartItems.map((item) => (
            <div key={item.product.id} className="cart-items">
              <img
                loading="lazy"
                src={item.product.image}
                alt={item.product.title}
                className="rounded-image"
              />
              <p>{item.product.title}</p>
              <p>Price: {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: {Math.floor(item.product.price * item.quantity)}</p>
              <div>
                <button onClick={() => handleIncreaseQuantity(item.product.id)}>
                  +
                </button>
                <button
                  onClick={() => handleReduceQuantity(item.product.id)}
                  disabled={item.quantity === 0}
                >
                  -
                </button>
                <button onClick={() => handleDelete(item.product.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

      <div className="total">
        <p>Total: {Math.floor(totalPrice)}</p>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default CartPage;
