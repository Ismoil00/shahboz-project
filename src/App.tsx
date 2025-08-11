import ProtectedRoutes from "./components/protectedRoutes";
import Home from "./pages/home";
import Goods from "./pages/goods";
import Sales from "./pages/sales";
import Debts from "./pages/debts";
import Reports from "./pages/reports";
import Login from "./pages/login";
import Layout from "./layout";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Settings from "./pages/settings";
import PublicRoutes from "./components/publicRoutes";
import GlobalStatesProvider from "./globalStates";

function App() {
  return (
    <div className="app font-body">
      <GlobalStatesProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoutes>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="goods" element={<Goods />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="debts" element={<Debts />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                  <Route path="*" element={<div>Page not found</div>} />
                </Routes>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </GlobalStatesProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
