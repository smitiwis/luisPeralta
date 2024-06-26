import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ListPage from "../pages/List";
import RegisterPage from "../pages/Register";
import Header from "../components/Header";
import LayoutMain from "../components/layouts/LayoutMain";
import EditPage from "../pages/Edit";

const AppRoutes = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <main>
        <LayoutMain>
          <div className="py-10">
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/editar/:id" element={<EditPage />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </LayoutMain>
      </main>
      {/* <footer></footer> */}
    </Router>
  );
};

export default AppRoutes;
