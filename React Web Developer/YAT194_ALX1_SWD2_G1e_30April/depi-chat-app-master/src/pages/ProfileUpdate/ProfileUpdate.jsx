import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/fireBase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { AppContext } from "../../context/AppContext";
const ProfileUpdate = () => {
  const navigate = useNavigate();
  //state for image, name, bio, and previous image
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const { setUserData } = useContext(AppContext);
  
  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Please select a new image");
      }
      const docRef = doc(db, "users", uid);
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      toast.success("Profile updated successfully");

      // Redirect after successful profile update
      navigate('/chat');
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Error updating profile");
    }
  };
  
  // get data from database and display it
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        if (userData.name) setName(userData.name);

        if (userData.bio) setBio(userData.bio);

        if (userData.avatar) setPrevImage(userData.avatar);
 
      } else {
        // if user is not logged in, redirect to login page
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={updateProfile}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            {/* to change my profile pic */}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            {/*if there is an image for user display it if not display default avatar in assets folder  */}
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
          ></textarea>
          <button type="submit">Save</button>
        </form>
        {/*if there is an image for user display it if not display default logo in assets folder  */}
        <img
          className="profile-pic"
          src={image ? URL.createObjectURL(image) : prevImage? prevImage : assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
