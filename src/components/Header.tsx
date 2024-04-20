import React from "react";
import LayoutMain from "./layouts/LayoutMain";

const Header = () => {
  return (
    <header className="header-main">
      <LayoutMain>
        <div className="flex justify-center items-center gap-1">
          <img
            src={`${process.env.PUBLIC_URL}/resource/logo-banco.png`}
            alt=""
          />
          <h1 className="header-main__title">BANCO</h1>
        </div>
      </LayoutMain>
    </header>
  );
};

export default Header;
