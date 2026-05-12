import React, { useState, useRef, useEffect } from "react";
import { server } from "../../main";
import axios from "axios";
import {
  IoSend,
  IoChatbubbles,
  IoPerson,
  IoRocket,
  IoTrash,
  IoCode,
  IoBook,
  IoCalculator,
  IoFlask,
  IoGlobe,
  IoHeart,
} from "react-icons/io5";

const ChartBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Suggested topics for quick access
  const suggestedTopics = [
    {
      icon: IoCalculator,
      name: "Mathematics",
      prompt: "Help me solve: 2x + 5 = 15",
    },
    {
      icon: IoFlask,
      name: "Science",
      prompt: "Explain photosynthesis in simple terms",
    },
    {
      icon: IoCode,
      name: "Programming",
      prompt: "Explain the concept of closures in JavaScript",
    },
    {
      icon: IoBook,
      name: "Literature",
      prompt: "Summarize 'Romeo and Juliet' act 1",
    },
    { icon: IoGlobe, name: "History", prompt: "What caused World War I?" },
    {
      icon: IoHeart,
      name: "Study Tips",
      prompt: "Give me 5 effective study techniques",
    },
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (messageContent = inputMessage) => {
    if (!messageContent.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Prepare conversation history
      const conversationHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await axios.post(
        `${server}/api/chart`,
        {
          messages: conversationHistory,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        content: response.data.message,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "ai",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessageContent = (content) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("•")) {
        return (
          <li key={i} className="ml-4">
            {line.substring(1)}
          </li>
        );
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={i} className="ml-4">
            {line}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={i} />;
      }
      return (
        <p key={i} className="mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10 backdrop-blur-lg bg-white/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <IoChatbubbles className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Academic Tutor
                </h1>
                <p className="text-sm text-gray-600">
                  Your personal study companion
                </p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <IoTrash />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Messages Area */}
          <div className="h-[72vh] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full mb-4">
                  <IoRocket className="text-white text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome to Your AI Tutor!
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  Ask me anything about mathematics, science, programming,
                  literature, history, or study techniques. I'm here to help you
                  learn and understand better!
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
                  {suggestedTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(topic.prompt)}
                      className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white rounded-xl transition-all duration-200 text-left group"
                    >
                      <topic.icon className="text-blue-600 group-hover:text-white" />
                      <span className="text-sm font-medium">{topic.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
                  >
                    <div
                      className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"} space-x-2 group`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600"
                            : "bg-gray-300"
                        }`}
                      >
                        {message.role === "user" ? (
                          <IoPerson className="text-white text-sm" />
                        ) : (
                          <IoChatbubbles className="text-gray-600 text-sm" />
                        )}
                      </div>
                      <div
                        className={`relative px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : message.isError
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">
                          {formatMessageContent(message.content)}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            message.role === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <IoChatbubbles className="text-gray-600 text-sm" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-end space-x-2">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                rows="1"
                className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                style={{ minHeight: "50px", maxHeight: "120px" }}
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-3 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoSend className="text-xl" />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              I can help with mathematics, science, programming, history,
              literature, and study tips •
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartBot;
