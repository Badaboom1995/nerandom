import React, { useState } from "react";

const Modal = ({ children }: any) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={"fixed l-0 t-0 w-full h-full"}>
      <div className={"absolute w-11/12 bg-white"}>{children}</div>
    </div>
  );
};

export default Modal;
