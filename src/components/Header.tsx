import React from "react";
import LayoutMain from "./layouts/LayoutMain";

const Header = () => {
  return (
    <header className="header-main">
      <LayoutMain>
        <div className="flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/resource/logo-banco.png`}
            alt="logo banco"
          />
        </div>
      </LayoutMain>
    </header>
  );
};

export default Header;
