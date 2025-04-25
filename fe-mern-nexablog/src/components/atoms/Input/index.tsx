type InputProps = {
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ name, ...rest }: InputProps) => {
  return (
    <div className="input-wrapper">
      <input name={name} {...rest} />
    </div>
  );
};

export default Input;
