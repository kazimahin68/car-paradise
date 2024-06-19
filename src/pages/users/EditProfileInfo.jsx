/* eslint-disable react/prop-types */

// import { AuthContext } from "../../authProvider/AuthProvider";

const EditProfileInfo = ({ userData, handleToggle, refetch }) => {
  const { userName, userPhoto, email } = userData;



  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;

    // updateUserProfile(name, photo).then(() => {
    const updateUser = { userName: name, email, userPhoto: photo };
    console.log(updateUser);
    await fetch(`http://localhost:5000/users/${userData.email}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch()
      });
    // })
  };

  return (
    <div className="w-4/5 m-auto p-5">
      <form onSubmit={handleUserUpdate}>
        <div className="mb-4">
          <label htmlFor="email" className="font-bold block text-slate-400">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={userName}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="font-bold block text-slate-400">
            Photo URL
          </label>
          <input
            type="url"
            name="photo"
            id="photo"
            defaultValue={userPhoto}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="font-bold block text-slate-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            disabled
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        {/* <div className="mb-4">
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
        </div> */}
        <div className="flex flex-row-reverse gap-5 w-1/4 m-auto">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleToggle}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Cancel
          </button>
        </div>
      </form>
      <div>
        <form>
          <div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-bold block text-slate-400"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 justify-between">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-bold block text-slate-400"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="password"
                className="font-bold block text-slate-400"
              >
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
          </div>
          <button
            type="submit"
            className=" m-auto w-1/4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileInfo;
