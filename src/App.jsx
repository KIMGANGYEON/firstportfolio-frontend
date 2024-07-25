import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./router/layout/NavBar/Navbar";
import Home from "./router/pages/Home/Home";
import Login from "./router/pages/Login/Login";
import Join from "./router/pages/Join/Join";
import NotFound from "./router/pages/NotFound/NotFound";

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
