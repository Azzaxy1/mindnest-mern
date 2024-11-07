import "./upload.scss";

interface UploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  image: string | null;
}

const Upload = ({ image, ...rest }: UploadProps) => {
  return (
    <div className="upload">
      {image && <img className="preview" src={image} alt="preview" />}
      <input type="file" {...rest} />
    </div>
  );
};

export default Upload;
