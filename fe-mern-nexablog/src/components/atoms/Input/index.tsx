type InputProps = {
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ name, ...rest }: InputProps) => {
  return (
    <div>
      <input name={name} {...rest} />
    </div>
  );
};

export default Input;
