import "./input.scss";

type InputProps = {
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ name, label, ...rest }: InputProps) => {
  return (
    <div className="input-wrapper">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input className="input" name={name} {...rest} />
    </div>
  );
};

export default Input;
