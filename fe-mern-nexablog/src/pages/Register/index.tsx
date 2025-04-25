import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import useInput from "../../hooks/useInput";
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      {/* Left Section - Futuristic Background */}
      <div className="md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">NexaBlog</h1>
            <p className="text-xl text-white/80">
              Join the future of content creation
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 opacity-70">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-full bg-white/10 backdrop-blur-sm rounded-lg animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${2 + i * 0.2}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-indigo-500">
              Create Account
            </h2>
            <p className="text-gray-400">Join NexaBlog's community today</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <Input
                value={username}
                name="username"
                placeholder="yourusername"
                type="text"
                onChange={handleUsername}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <Button
              title="Create Account"
              onClick={handleRegister}
              className="w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link
              to="/login"
              className="block w-full text-center px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg border border-gray-700 transition-all"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
