import React, { FC } from "react";

type Props = {
  heigth?: number;
};

const Squeleton: FC<Props> = ({ heigth = 29 }) => {
  return (
    <div className="squeleton" style={{ height: `${heigth}px` }}>
      <div className="box"></div>
    </div>
  );
};

export default Squeleton;
