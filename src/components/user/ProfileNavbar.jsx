import { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";

const ProfileNavbar = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
    return (
        <div>
            <h2>Welcome</h2>
            <h1></h1>
        </div>
    );
};

export default ProfileNavbar;