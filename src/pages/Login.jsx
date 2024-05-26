import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/auth/GoogleLogin";
import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";

const Login = () => {
  const { UserLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    UserLogin(email, password).then(() => {
      form.reset();
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <hr className="mt-4" />
        <p className="text-center font-bold text-xl">OR</p>
        <hr />
        <div>
          <div className="flex items-center gap-3">
            <p className="font-bold mt-2">Sign Up with :</p>
            <div>
              <GoogleLogin />
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <p>
              Do not have any account ? Please
              <Link to="/register">
                <span className="text-green-500 font-bold"> Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
