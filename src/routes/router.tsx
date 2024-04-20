import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ListPage from "../pages/List";
import RegisterPage from "../pages/Register";

const AppRoutes = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <Header /> */}
      <main>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {/* <footer></footer> */}
    </Router>
  );
};

export default AppRoutes;
