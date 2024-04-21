import { useNavigate } from "react-router-dom";
import FormProduct from "./components/FormProduct";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto w-[750px]">
      <div className="flex justify-between items-center separator wrapper wrapper--title">
        <span className="cursor-pointer" onClick={() => navigate("/")}> 
          <img width={30} height={30} src="http://cdn.onlinewebfonts.com/svg/img_72513.png" alt="" />
        </span>
        <h2 className="my-3 font-bold">FORMULARIO DE REGISTRO</h2>
        <span></span>
      </div>
      <div className="wrapper wrapper--form">
        <FormProduct />
      </div>
    </section>
  );
};

export default RegisterPage;
