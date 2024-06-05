/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";

const DisplayProfileInfo = ({userData, handleToggle}) => {
console.log(userData)
const {userName, email} = userData;
  return (
    <div>
      <div className="flex justify-between p-5">
        <h2 className="font-bold text-white">My Profile</h2>
        <button onClick={handleToggle} className="text-white font-bold">
          <FaEdit></FaEdit>
        </button>
      </div>
      <hr className="outline-dotted w-11/12 m-auto" />

      <div className="p-12 grid grid-cols-2">
        <div className=""> 
          <h2 className="font-semibold text-slate-400">Full Name</h2>
          <p className="font-bold text-white">{userName}</p>
        </div>
        <div>
            <h2 className="font-semibold text-slate-400">Email Address</h2>
            <p className="font-bold text-white">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayProfileInfo;
