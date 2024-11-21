import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import ProductDetail from "./components/ProductDetail";
import { ShopProvider } from "./ShopContext";

const Router = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Shop products={products} /> },
        { path: "/cart", element: <CartPage /> },
        ...products.map((product) => ({
          path: `product/${product.id}`,
          element: <ProductDetail product={product} />,
        })),
      ],
    },
  ]);

  return (
    <ShopProvider>
      <RouterProvider router={router} />
    </ShopProvider>
  );
};

export default Router;
