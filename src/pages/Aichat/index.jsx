import Layout from "../../Components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { aiChat } from "../../redux/ai-slice";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  MessageCircle,
  Zap,
  Brain,
  Shield,
  Mic,
  Paperclip,
  Activity,
} from "lucide-react";

const Aichat = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ai);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const sendMsg = async () => {
    if (!prompt.trim()) return;

    const userMsg = {
      sender: "user",
      text: prompt,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt("");

    try {
      const result = await dispatch(aiChat(prompt)).unwrap();
      const aiMsg = {
        sender: "ai",
        text: result.data,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const aiMsg = {
        sender: "ai",
        text: "⚠️ Sorry, something went wrong.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }
  };

  // Auto scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  const MainSection = (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Neural Network Particles */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-20 pb-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            AI Health Assistant
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Advanced AI-powered health insights at your fingertips
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            {[
              { icon: Zap, label: "Response", value: "< 2s" },
              { icon: Shield, label: "Secure", value: "256-bit" },
              { icon: Activity, label: "Uptime", value: "99.9%" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center space-x-2">
                <stat.icon className="w-4 h-4 text-purple-400" />
                <span>
                  {stat.label}:{" "}
                  <span className="text-purple-300">{stat.value}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col h-[80vh] max-w-5xl mx-auto px-4"
        >
          {/* Glassmorphism Chat Box */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full">
            {/* Enhanced Header */}
            <div className="relative bg-gradient-to-r from-purple-600/80 via-pink-600/80 to-purple-600/80 backdrop-blur-xl px-6 py-4">
              {/* Header Pattern */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <motion.div
                      className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Bot className="w-5 h-5 text-white" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div>
                    <h1 className="text-white font-bold text-lg">
                      AI Health Assistant
                    </h1>
                    <div className="flex items-center space-x-2 text-purple-100">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <p className="text-xs">Chat with AI in real-time</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {[Shield, Zap, Sparkles].map((Icon, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-white/20 cursor-pointer"
                      whileHover={{ scale: 1.1, y: -1 }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-slate-900/30 to-slate-900/50">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`flex items-start space-x-3 mb-3 ${
                      msg.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {/* Enhanced Avatar */}
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xl ${
                          msg.sender === "user"
                            ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                            : "bg-gradient-to-br from-purple-600 to-pink-600"
                        }`}
                        animate={{
                          boxShadow:
                            msg.sender === "ai"
                              ? [
                                  "0 0 15px rgba(147, 51, 234, 0.3)",
                                  "0 0 25px rgba(236, 72, 153, 0.4)",
                                  "0 0 15px rgba(147, 51, 234, 0.3)",
                                ]
                              : undefined,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {msg.sender === "user" ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Enhanced Message Bubble */}
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className={`relative px-4 py-3 rounded-xl backdrop-blur-xl border shadow-lg ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white max-w-xs"
                            : "bg-gray-100/90 text-gray-800 max-w-2xl border-white/20"
                        }`}
                        initial={{ rotateY: msg.sender === "user" ? -10 : 10 }}
                        animate={{ rotateY: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>

                        {msg.timestamp && (
                          <div className="text-xs opacity-70 mt-1">
                            {msg.timestamp}
                          </div>
                        )}

                        {/* Message Tail */}
                        <div
                          className={`absolute top-3 w-3 h-3 rotate-45 ${
                            msg.sender === "user"
                              ? "bg-blue-500 -right-1"
                              : "bg-gray-100 -left-1"
                          }`}
                        />
                      </motion.div>

                      {/* Hover Glow */}
                      <motion.div
                        className={`absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                          msg.sender === "user"
                            ? "bg-blue-400"
                            : "bg-purple-400"
                        }`}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Enhanced Loading Animation */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3 mb-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Bot className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  <div className="bg-gray-100/90 backdrop-blur-xl border border-white/20 rounded-xl p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600 text-xs">
                        AI is thinking...
                      </span>
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                            animate={{ y: [0, -6, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Enhanced Input Section */}
            <div className="p-4 border-t border-white/10 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center space-x-2">
                {/* Premium Input Field */}
                <div className="flex-1 relative group">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 w-full px-4 py-2 bg-white/10 border border-white/20 rounded-full shadow-sm backdrop-blur-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                  />

                  {/* Input Icons */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <motion.button
                      className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Paperclip className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mic className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced Send Button */}
                <motion.button
                  onClick={sendMsg}
                  disabled={isLoading}
                  className="relative hover:cursor-pointer group bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white p-2 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 5px 15px rgba(147, 51, 234, 0.3)",
                      "0 5px 25px rgba(236, 72, 153, 0.4)",
                      "0 5px 15px rgba(147, 51, 234, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-full"
                    animate={{ scale: [0, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  <Send size={20} className="relative z-10" />
                </motion.button>
              </div>

              {/* Status Bar */}
              <motion.div
                className="flex items-center justify-center mt-3 space-x-4 text-xs text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>Encrypted Connection</span>
                </div>
                <span>•</span>
                <span>Press Enter to send</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>AI Ready</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Premium Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 px-4"
        >
          <p className="text-gray-400 text-sm">
            Powered by Advanced AI •
            <span className="text-purple-400"> Privacy Protected</span> • 24/7
            Available
          </p>
        </motion.div>
      </div>
    </div>
  );

  return <Layout MainSection={MainSection} />;
};

export default Aichat;
