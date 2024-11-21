import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const App = () => {
  const location = useLocation();
  const isShopPage = location.pathname === "/";

  return (
    <>
      <div className={isShopPage ? "shop-active" : "shop"}>
      <Header />
        <main className={isShopPage ? "shop-active" : ""}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;
