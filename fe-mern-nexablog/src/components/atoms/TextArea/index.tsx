import "./textArea.scss";

const TextArea = ({ ...rest }) => {
  return (
    <div className="text-area-wrapper">
      <label htmlFor="description">Deskripsi</label>
      <textarea className="text-area" {...rest}></textarea>
    </div>
  );
};

export default TextArea;
