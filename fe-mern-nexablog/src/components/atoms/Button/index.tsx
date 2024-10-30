import { ReactNode } from "react";
import "./button.scss";

type ButtonProps = {
  title?: string;
  children?: ReactNode;
  iconPosition?: "top" | "bottom";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  title,
  children,
  iconPosition = "top",
  ...rest
}: ButtonProps) => {
  return (
    <button className="button" {...rest}>
      {iconPosition === "top" && children}
      {title}
      {iconPosition === "bottom" && children}
    </button>
  );
};

export default Button;
