import GoggleLogo from "../../../assets/icon/google.svg";

interface ButtonGoogleProps {
  onLoginGoogle: () => void;
}

const ButtonGoogle = ({ onLoginGoogle }: ButtonGoogleProps) => {
  return (
    <button
      className="w-full flex items-center cursor-pointer justify-center px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-all"
      onClick={onLoginGoogle}
    >
      <img src={GoggleLogo} alt="google" />
      <span>Login with Google</span>
    </button>
  );
};

export default ButtonGoogle;
