import { useContext, useState } from "react";
import DisplayProfileInfo from "./DisplayProfileInfo";
// import { useLoaderData } from "react-router-dom";
import EditProfileInfo from "./EditProfileInfo";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../authProvider/AuthProvider";

const Profile = () => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const {user} = useContext(AuthContext)
  // const userData = useLoaderData();
  console.log(user)

  const {data: userData = [], refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async() =>{
      const res = await fetch(`https://car-paradise-server.onrender.com/users/${user?.email}`)
      return res.json()
    }
  })
  console.log(userData)

  const handleToggle = () => {
    setToggleEdit(!toggleEdit);
  };
  return (
    <div className="grid grid-cols-3 gap-10 w-4/5 m-auto mt-14">
      <div className="bg-slate-600 col-span-1 flex items-center justify-center flex-col p-10 rounded-md">
        <img
          className="rounded-full w-36 h-36 outline outline-4 outline-offset-2 mb-4 p-1"
          src={userData?.userPhoto}
          alt=""
        />
        <h2 className="font-bold text-slate-400">{userData?.userName}</h2>
        <h2 className="font-semibold text-slate-400">{userData?.email}</h2>
      </div>
      <div className="col-span-2 bg-slate-800 rounded-md opacity-90">
        {toggleEdit ? (
          <EditProfileInfo userData={userData} handleToggle={handleToggle} refetch ={refetch}></EditProfileInfo>
        ) : (
          <DisplayProfileInfo
            userData={userData}
            handleToggle={handleToggle}
          ></DisplayProfileInfo>
        )}
      </div>
    </div>
  );
};

export default Profile;
