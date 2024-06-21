import { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { loading, googleLogin } = useContext(AuthContext);
  //   console.log(user);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      const loggedUser = result.user;
      const saveUser = {
        userName: loggedUser.displayName,
        email: loggedUser.email,
        userPhoto: loggedUser.photoURL,
      };
      fetch("https://car-paradise-server.onrender.com/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <div className="text-center mt-4 mb-2">
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn bg-transparent border-none"
      >
        <FcGoogle className="w-6 h-6"></FcGoogle>
      </button>
    </div>
  );
};

export default GoogleLogin;
