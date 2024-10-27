import "./button.scss";

type ButtonProps = {
  title?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <div>
      <button className="button" {...rest}>
        {title}
      </button>
    </div>
  );
};

export default Button;
