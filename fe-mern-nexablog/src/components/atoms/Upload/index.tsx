import { LoginBg } from "../../../assets";
import "./upload.scss";

const Upload = ({ ...rest }) => {
  return (
    <div className="upload">
      <img className="preview" src={LoginBg} alt="preview" />
      <input type="file" {...rest} />
    </div>
  );
};

export default Upload;
