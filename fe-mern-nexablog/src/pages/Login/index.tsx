import { Link } from "react-router-dom";
import { LoginBg } from "../../assets";
import { Button, Gap, Input } from "../../components";

const Login = () => {
  return (
    <div className="main-page">
      <div className="left">
        <img src={LoginBg} alt="imageBg" className="bg-image" />
      </div>
      <div className="right">
        <h1 className="title">NexaBlog</h1>
        <h2 className="subtitle">Login</h2>
        <Gap height={10} />
        <Input label="Email" name="email" placeholder="Email" type="email" />
        <Gap height={10} />
        <Input
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Gap height={30} />
        <Button title="Login" />
        <Gap height={60} />
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
