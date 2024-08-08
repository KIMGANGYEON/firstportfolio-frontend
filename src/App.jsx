import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./router/layout/NavBar/Navbar";
import Home from "./router/pages/Home/Home";
import Login from "./router/pages/Login/Login";
import Join from "./router/pages/Join/Join";
import NotFound from "./router/pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import ProtectedPage from "./router/pages/ProtectedPage/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import EditUser from "./router/pages/EditUser/EditUser";
import EditPassword from "./router/pages/EditUser/EditPassword/EditPassword";
import ProductDetail from "./router/pages/ProductPage/ProductDetail/ProductDetail";
import UploadProductPage from "./router/pages/ProductPage/UploadProductPage/UploadProductPage";
import CartPage from "./router/pages/Cart/CartPage";
import History from "./router/pages/History/History";
import UsedProduct from "./router/pages/ProductPage/UsedProduct/UsedProduct";
import NewSearch from "./router/pages/Search/NewSearch/NewSearch";
import UsedSearch from "./router/pages/Search/UsedSearch/UsedSearch";
import EditUserProduct from "./router/pages/EditUser/EditUserProduct/EditUserProduct";
import EditProductDetail from "./router/pages/EditUser/EditUserProduct/EditProductDetail";

function Layout() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={2000}
      />

      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      setTimeout(() => {
        dispatch(authUser());
      }, 500);
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/edituser/password" element={<EditPassword />} />
          <Route path="/product/upload" element={<UploadProductPage />} />
          <Route path="/users/edit/product" element={<EditUserProduct />} />
          <Route
            path="/users/edit/product/:id"
            element={<EditProductDetail />}
          />
          <Route path="/users/cart" element={<CartPage />} />
          <Route path="/history" element={<History />} />
        </Route>

        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/product/used/detail/:id" element={<UsedProduct />} />
        <Route path="/search/new" element={<NewSearch />} />
        <Route path="/search/used" element={<UsedSearch />} />

        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
