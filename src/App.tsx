import ProtectedRoutes from "./components/protectedRoutes";
import Home from "./pages/home";
import Goods from "./pages/goods";
import Debts from "./pages/debts";
import Reports from "./pages/reports";
import Login from "./pages/login";
import Layout from "./layout";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="app font-body">
      {/* <SessionContextProvider> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/registration" element={<Registration />} /> */}
        <Route
          path="/*"
          element={
            // <StatesStoreContextProvider>
            <ProtectedRoutes>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="goods" element={<Goods />} />
                  <Route path="debts" element={<Debts />} />
                  <Route path="reports" element={<Reports />} />
                </Route>
                <Route path="*" element={<div>Page not found</div>} />
              </Routes>
            </ProtectedRoutes>
            // </StatesStoreContextProvider>
          }
        />
      </Routes>
      {/* </SessionContextProvider> */}
      <ToastContainer />
    </div>
  );
}

export default App;
