import { Link } from "react-router-dom";
import { RegisterBg } from "../../assets";
import { Button, Gap, Input } from "../../components";
import "./register.scss";

const Register = () => {
  return (
    <div className="main-page">
      <div className="left">
        <img src={RegisterBg} alt="imageBg" className="bg-image" />
      </div>
      <div className="right">
        <h1 className="title">NexaBlog</h1>
        <h2 className="subtitle">Register</h2>
        <Input
          label="Username"
          name="username"
          placeholder="Username"
          type="text"
        />
        <Gap height={10} />
        <Input label="Email" name="email" placeholder="Email" type="email" />
        <Gap height={10} />
        <Input
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <Gap height={20} />
        <Button title="Register" />
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
