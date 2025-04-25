const TextArea = ({
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div>
      <textarea {...rest}></textarea>
    </div>
  );
};

export default TextArea;
