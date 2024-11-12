import React, { useState } from "react";

const UserInfo = ({ currentUser, setCurrentUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-[#eeeeee] dark:bg-[#0F172A] text-black dark:text-white">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 dark:bg-gray-700">
        <div className="flex justify-center mb-4">
          <img
            src={
              currentUser.gender === "male"
                ? "https://icons.veryicon.com/png/o/internet--web/web-interface-flat/6606-male-user.png"
                : "https://icons.veryicon.com/png/o/emoticon/professional-portrait-shameless-10/female-post.png"
            }
            alt="User Avatar"
            className="rounded-full w-24 h-24"
          />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-600">
            {currentUser.username}
          </h1>
          <p>Username: {currentUser.username}</p>
          <p>
            My name is {currentUser.username}, I'm a {currentUser.gender} and
            I'm a member here.
          </p>
        </div>

        <form
          className="space-y-6 text-black dark:text-white"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block font-bold mb-2">Your User Name</label>
            <input
              type="text"
              name="username"
              value={currentUser?.username || ""}
              disabled={!isEditing}
              onChange={(e) => handleChange(e)}
              className="w-full p-3 border text-black border-gray-300 rounded-lg bg-gray-100"
            />
            <p className="text-xs mt-1">
              Better to have a unique username to give a good impression to
              others.
            </p>
          </div>

          <div>
            <label className="block font-bold mb-2">Your E-Mail</label>
            <input
              type="email"
              name="email"
              value={currentUser?.email || ""}
              onChange={(e) => handleChange(e)}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg bg-gray-100 text-black"
            />
            <p className="text-xs mt-1">
              Better to have a readable E-Mail to give a good impression to
              others.
            </p>
          </div>

          <div>
            <label className="block  font-bold mb-2">Your Gender</label>
            <input
              type="text"
              name="gender"
              value={currentUser?.gender || ""}
              onChange={(e) => handleChange(e)}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg bg-gray-100 text-black"
            />
            <p className="text-xs mt-1">
              Please be noted that we do not support homosexuality,{" "}
              <strong className="text-xl font-bold text-red-500">
                straight out bitch
              </strong>
              .
            </p>
          </div>

          <div>
            <label className="block font-bold mb-2">Your Password</label>
            <input
              type="password"
              name="password"
              value={currentUser?.password || ""}
              onChange={(e) => handleChange(e)}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-black"
            />
            <p className="text-xs mt-1">
              Better to have a unique password to give a good impression to
              others.
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleEditToggle}
              className="px-6 py-2 bg-[#014026] text-white font-semibold rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg"
              >
                Confirm Editing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
