import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/auth/GoogleLogin";
import { useContext, useState } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password === confirmPassword) {
      createUser(email, password).then((result) => {
        // const registeredUser = result.user;
        if (result) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          navigate("/");
        }
      });
    } else {
      setError("Password Does not match");
      // form.reset();
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <form onSubmit={handleRegister}>
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="email" className="font-bold block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-bold block text-gray-700">
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
            <label htmlFor="password" className="font-bold block text-gray-700">
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
          <div className="mb-1">
            <label htmlFor="password" className="font-bold block text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirm-password"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
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
              Already have an account ? Please{" "}
              <Link to="/login">
                <span className="text-green-500 font-bold">Login Here...</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
