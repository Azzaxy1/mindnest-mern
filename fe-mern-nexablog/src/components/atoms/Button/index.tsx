import "./button.scss";

type ButtonProps = {
  title?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <button className="button" {...rest}>
      {title}
    </button>
  );
};

export default Button;
