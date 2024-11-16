import GoggleLogo from "../../../assets/icon/google.svg";
import "./button-google.scss";

interface ButtonGoogleProps {
  onLoginGoogle: () => void;
}

const ButtonGoogle = ({ onLoginGoogle }: ButtonGoogleProps) => {
  return (
    <button className="button-google" onClick={onLoginGoogle}>
      <img src={GoggleLogo} alt="google" />
      <span>Login with Google</span>
    </button>
  );
};

export default ButtonGoogle;
