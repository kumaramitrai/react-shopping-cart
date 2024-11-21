import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../ShopContext";

const Header = () => {
  const { cartItems } = useContext(ShopContext);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <header className="wrapper">
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Shop
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="header-cart">
            <span>Cart</span>
            <div className="header-count">{totalQuantity}</div>
          </div>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
