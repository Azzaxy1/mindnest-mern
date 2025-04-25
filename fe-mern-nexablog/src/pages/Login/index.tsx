import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import useInput from "../../hooks/useInput";
import { fetchLogin } from "../../services/authService";
import ButtonGoogle from "../../components/atoms/ButtonGoogle";

const Login = () => {
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const token = await fetchLogin({ email, password }, navigate);
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const handleLoginGoogle = async () => {
    window.location.href = `${import.meta.env.VITE_URL_API}/auth/google`;
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* Left Section - Futuristic Background */}
      <div className="md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">Mindnest</h1>
            <p className="text-xl text-white/80">
              Your private space to reflect, write, and grow
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 opacity-70">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-full bg-white/10 backdrop-blur-sm rounded-lg animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Welcome Back
            </h2>
            <p className="text-gray-400">
              Login to continue your personal journaling journey
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <Input
                value={email}
                name="email"
                placeholder="your@email.com"
                type="email"
                onChange={handleEmail}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <Input
                value={password}
                name="password"
                placeholder="••••••••"
                type="password"
                onChange={handlePassword}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <Button
              title="Login"
              onClick={handleLogin}
              className="w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <ButtonGoogle onLoginGoogle={handleLoginGoogle} />

            <p className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
