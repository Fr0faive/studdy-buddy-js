"use client";
import React, { useState, useRef, useEffect } from "react";
import { MdOutlineChat } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import Markdown from "react-markdown";

const Chatbot = ({ toggleChat }) => {
  // Chat state
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationObject, setConversationObject] = useState(null);

  // API Key and Model (substitute your own)

  // Popup ref
  const chatRef = useRef(null);

  // Handler for opening/closing the popup

  const handleInput = (e) => {
    setMessageInput(e.target.value);
  };

  const handleChatInput = async () => {
    const message = messageInput;
    console.log("Conversation Object: ", conversationObject);
    if (messageInput === "") return;
    else {
      setLoading(true);
      const apiResponse = await axios.post("/api/message", {
        message,
        conversation: conversationObject,
      });

      const apiData = apiResponse?.data;
      if (apiResponse.status === 403) {
        updateChatHistory(apiData?.text);
        return;
      }
      // console.log(apiData);
      // sendMessage(message);
      updateChatHistory(apiResponse?.data?.text);
      setMessageInput("");
    }
  };

  // Send message to chatbot
  const updateChatHistory = async (message) => {
    const newHistory = [...chatHistory];

    // const conversation = model.startChat({ history: newHistory });
    // const result = await conversationObject.sendMessage(message);
    // const text = result.response.text();
    newHistory.push({ role: "user", parts: [messageInput] });
    newHistory.push({ role: "model", parts: [message] });
    setChatHistory(newHistory);
    setLoading(false);
  };

  const initializeChatbot = async () => {
    setLoading(true);
    // console.log(message)

    // const result = await conversation.sendMessage(message);
    const apiResponse = await axios.post("/api/message", {
      message: "",
      conversation: null,
    });
    // console.log(apiResponse.data)
    setChatHistory([
      {
        role: "model",
        parts: ["Hi, I am Buddy. Apa yang bisa ku bantu?"],
      },
    ]);
    setLoading(false);
    const initData = apiResponse.data;
    const newConversationObject = initData.conversation;
    // console.log(newConversationObject);
    setConversationObject(newConversationObject);
  };

  useEffect(() => {
    initializeChatbot();
    // console.log(convObject);
    // setConversationObject(convObject);
    // console.log("Converation Object : ",conversationObject)
  }, []);

  return (
    <div className="h-full p-2">
      {/* {isOpen && ( */}
      {/* )} */}

      {/* {isOpen && ( */}
      <div
        ref={chatRef}
        className={`backdrop-blur  duration-200 border-b  bg-zinc-900/500 p-2 rounded-lg shadow-md z-70 font-Mono`}
      >
        <div className="flex flex-col gap-2 w-[23rem] h-96 overflow-y-auto snap-y">
          {/* Render chat history */}
          {chatHistory.map((message, index) => (
            <div
              key={message.role + index}
              className={`flex flex-row gap-2 w-full text-wrap ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              <div
                className={`p-2 rounded-xl ${
                  message.role === "user"
                    ? "bg-[#00707E] text-white"
                    : "bg-slate-300 text-[#00707E]"
                }`}
              >
                {message.parts}
              </div>
            </div>
          ))}
          {loading && <div className="text-center">Loading...</div>}
          {/* {response && <div className='text-green-600'>{response}</div>} */}
        </div>
        <div className="flex items-center justify-between">
          <input
            disabled={loading ? true : false}
            className="w-full border border-gray-300 px-3 py-2 text-gray-700 rounded-md mt-4 focus:outline-none"
            placeholder="Type your message"
            onKeyDown={(e) => (e.key === "Enter" ? handleChatInput() : null)}
            onChange={handleInput}
            value={messageInput}
            // onBlur={() => setTimeout(toggleChat, 100)}
          />
          <button
            className={`bg-[rgba(29,71,253,1)] px-4 py-2 text-white rounded-md shadow-md hover:bg-[#1d46fdd5] disabled:bg-slate-500 focus:outline-none ml-4 `}
            disabled={messageInput === "" || loading}
            onClick={() => handleChatInput()} // Send an empty message to signal end of turn
          >
            <MdOutlineChat size={24} />
          </button>
        </div>
      </div>

      {/* )} */}
    </div>
  );
};

export default Chatbot;
