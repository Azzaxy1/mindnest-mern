import { ReactNode } from "react";

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
    <button {...rest}>
      {iconPosition === "top" && children}
      {title}
      {iconPosition === "bottom" && children}
    </button>
  );
};

export default Button;
