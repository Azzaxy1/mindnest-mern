import { Link, useNavigate } from "react-router-dom";
import { RegisterBg } from "../../assets";
import { Button, Gap, Input } from "../../components";
import useInput from "../../hooks/useInput";
import "./register.scss";
import { fetchRegister } from "../../services/authService";

const Register = () => {
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const [username, handleUsername] = useInput("");
  const navigate = useNavigate();

  const handleRegister = () => {
    fetchRegister({ email, name: username, password }, navigate);
  };

  return (
    <div className="main-page">
      <div className="left">
        <img src={RegisterBg} alt="imageBg" className="bg-image" />
      </div>
      <div className="right">
        <Link to="/" className="link">
          <h1 className="title">NexaBlog</h1>
        </Link>
        <h2 className="subtitle">Register</h2>
        <Input
          value={username}
          label="Username"
          name="username"
          placeholder="Username"
          type="text"
          onChange={handleUsername}
        />
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
        <Gap height={20} />
        <Button title="Register" onClick={handleRegister} />
        <Gap height={25} />
        <p className="link">
          Sudah punya akun?{" "}
          <Link to="/login" className="redirect">
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
