import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/fireBase";

const AppContext = createContext();
const AppContextProvider = function (props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);
  const loadUserData = async (uid) => {
    try {
      // here i try to get data from db of users in firebase
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      // here i try to get data from db of users in firebase
      const userData = userSnap.data();
      // save data into useState
      setUserData(userData);
      // if user have avatar and name ===> open chat page
      if (location.pathname !== "/profile") {
        if (userData.avatar && userData.name) {
          navigate("/chat");
          // if user havn't have avatar and name or he is a new user ==> open profile page
        } else {
          navigate("/profile");
        }
        //   update last seen when user is logged in
        await updateDoc(userRef, { lastSeen: Date.now() });
        // console.log(userData);
      }
    } catch (error) {
      console.error("Error getting user data: ", error);
    }
  };
  useEffect(() => {
    // if user is logged in ==> update last seen every 1 minute = 60000 milliseconds
    const intervalId = setInterval(async () => {
      if (auth.chatUser) {
        try {
          const userRef = doc(db, "users", auth.chatUser.uid);
          await updateDoc(userRef, { lastSeen: Date.now() });
        } catch (error) {
          console.error("Error updating lastSeen: ", error);
        }
      }
    }, 60000);

    // Clear interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // works on display chats data
  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        const chatItems = res.data().chatsData;
        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, "users", item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...item, userData });
        }
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });
      return () => unSub();
    }
  }, [userData]);

  const value = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messagesId,
    setMessagesId,
    messages,
    setMessages,
    chatUser,
    setChatUser,
    chatVisible,
    setChatVisible,
  };
  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export { AppContext, AppContextProvider };
