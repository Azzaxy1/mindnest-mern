import { Link, useNavigate } from "react-router-dom";
import { LoginBg } from "../../assets";
import { Button, Gap, Input } from "../../components";
import useInput from "../../hooks/useInput";
import { fetchLogin } from "../../services/authService";

const Login = () => {
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetchLogin({ email, password }, navigate);
  };

  return (
    <div className="main-page">
      <div className="left">
        <img src={LoginBg} alt="imageBg" className="bg-image" />
      </div>
      <div className="right">
        <Link to="/" className="link">
          <h1 className="title">NexaBlog</h1>
        </Link>
        <h2 className="subtitle">Login</h2>
        <Gap height={10} />
        <Input
          value={email}
          label="Email"
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleEmail}
        />
        <Gap height={10} />
        <Input
          value={password}
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
          onChange={handlePassword}
        />
        <Gap height={30} />
        <Button title="Login" onClick={handleLogin} />
        <p className="link">
          Belum punya akun?{" "}
          <Link to="/register" className="redirect">
            Daftar disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
