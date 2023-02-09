import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/ChatRequests";
import { addMessage, getMessages } from "../../api/MessageRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";
import { toast } from "react-toastify";
function ChatBox({ chat, currentUser, setSendMessage, receivedMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data.data);
        console.log("data in chatbox", data);
      } catch (err) {
        toast.error("Something went wrong.Please try again");
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        console.log("messaages", data);
      } catch (err) {
        toast.error("Something went wrong.Please try again");
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);
  // Receive Message from parent component
  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      toast.error("Something went wrong.Please try again");
    }
  };
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div className="flex items-center">
                  <img
                    src={userData ? userData.url : "otpBg.jpg"}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div
                    className="name mx-4"
                    style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstName} {userData?.lastName}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }>
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div onClick={() => imageRef.current.click()}>+</div>
              {/* <InputEmoji
                value={newMessage}
                onChange={handleChange}
              /> */}
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
                cleanOnEnter
                // onEnter={handleOnEnter}
                placeholder="Type a message"
              />
              <button
                className="send-button button"
                onClick={handleSend}>
                Send
              </button>
              {/* <div
                className="send-button button"
                // onClick={handleSend}
              ></div> */}
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                //ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
