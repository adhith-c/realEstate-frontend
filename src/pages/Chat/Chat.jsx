import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../components/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
function Chat() {
  const [chats, setChats] = useState([]);
  const socket = useRef();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [notifications, setNotifications] = useState([]);
  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKETURL);
    socket.current.emit("new-user-add", user);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      // console.log(data);
      setReceivedMessage(data);
      // if (!notifications.includes(data)) {
      //   setNotifications(data);
      // }
    });
  }, []);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user);
        setChats(data);
        console.log(data);
      } catch (err) {
        toast.error("Something went wrong.Please try again");
      }
    };
    getChats();
  }, [user._id]);

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        {/* <LogoSearch /> */}
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setCurrentChat(chat);
                }}>
                <Conversation
                  data={chat}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          {/* <NavIcons /> */}
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
