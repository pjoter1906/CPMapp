import { useState } from "react";
import { MouseEvent, SetStateAction } from "react";

interface Props {
  children: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning";
  onClick: () => void;
}

function Button({ color = "primary", onClick, children }: Props) {
  let buttonClasses: string = "btn btn-" + color;
  return (
    <button type="button" className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
