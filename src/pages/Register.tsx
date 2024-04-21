import { useNavigate } from "react-router-dom";
import FormProduct from "./components/FormProduct";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto">
      <div className="flex justify-between items-center">
        <span onClick={() => navigate("/")}>back</span>
        <h2 className="my-3 font-bold">FORMULARIO DE REGISTRO</h2>
      </div>
      <FormProduct />
    </section>
  );
};

export default RegisterPage;
