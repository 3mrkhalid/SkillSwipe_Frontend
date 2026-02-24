"use client";

import { useState, useEffect, useRef } from "react";
import { getSocket } from "../../api/socket";
import api from "../../api/axios";
import { getToken } from "../../auth/tokenManager";
import { Send, Mic, MicOff, PhoneOff, Copy, Check, Users, MessageCircle, LogOut, Plus, Sparkles, Video, VideoOff } from "lucide-react";
import HeaderForDashboard from "../_component/HeaderForDashboard";
import FooterForDashboard from "../_component/FooterForDashboard";
import { useTheme } from "@/app/_components/ThemeContext";
import { useLang } from "@/app/_components/LanguageProvider";

export default function RoomPage() {
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);
  const [joined, setJoined] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const pendingCandidates = useRef([]);
  const roomIdRef = useRef("");
  
  // Video refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);

  const { theme } = useTheme();
  const { lang } = useLang();
  const isArabic = lang === "ar";
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/users/me", {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  // Fetch messages
  const fetchMessages = async (room) => {
    try {
      const res = await api.get(`/api/v1/messages/${room}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const formatted = res.data.map((m) => ({
        userId: m.userId,
        username: m.userId === user.id ? "You" : m.username,
        content: m.content,
        isOwn: m.userId === user.id,
        timestamp: new Date(m.createdAt).toLocaleTimeString(),
      }));
      setMessages(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // Create Peer helper
  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("ice-candidate", {
          roomId: roomIdRef.current,
          candidate: event.candidate,
        });
      }
    };

   peer.ontrack = (event) => {
    if (remoteVideoRef.current && isVideoActive) {
      remoteVideoRef.current.srcObject = event.streams[0];
    } else {
      const audio = new Audio();
      audio.srcObject = event.streams[0];
      audio.play();
    }
  };

    return peer;
  };

  // Get media stream
  const getMediaStream = async (withVideo = false) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: withVideo,
    });
    localStreamRef.current = stream;

    if (withVideo && localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    return stream;
  };

  // Initialize Socket.IO
  useEffect(() => {
    if (!user?.id) return;

    const init = async () => {
      const s = await getSocket();
      if (!s) return;

      socketRef.current = s;

      // Remove old listeners
      s.off("roomCreated");
      s.off("chatMessage");
      s.off("userJoined");
      s.off("voice-offer");
      s.off("voice-answer");
      s.off("video-offer");
      s.off("video-answer");
      s.off("ice-candidate");

      // Voice offer handler
      s.on("voice-offer", async ({ offer }) => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = stream;

        const peer = createPeer();
        peerRef.current = peer;
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        await peer.setRemoteDescription(new RTCSessionDescription(offer));

        // Add pending ICE candidates
        for (const c of pendingCandidates.current) {
          await peer.addIceCandidate(new RTCIceCandidate(c));
        }
        pendingCandidates.current = [];

        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        socketRef.current.emit("voice-answer", {
          roomId: roomIdRef.current,
          answer,
        });
        
        setIsVoiceActive(true);
      });

      // Video offer handler
      s.on("video-offer", async ({ offer }) => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const peer = createPeer();
        peerRef.current = peer;
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        await peer.setRemoteDescription(new RTCSessionDescription(offer));

        // Add pending ICE candidates
        for (const c of pendingCandidates.current) {
          await peer.addIceCandidate(new RTCIceCandidate(c));
        }
        pendingCandidates.current = [];

        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        socketRef.current.emit("video-answer", {
          roomId: roomIdRef.current,
          answer,
        });
        
        setIsVideoActive(true);
      });

      // Voice answer
      s.on("voice-answer", async ({ answer }) => {
        const peer = peerRef.current;
        if (!peer) return;

        await peer.setRemoteDescription(new RTCSessionDescription(answer));

        for (const c of pendingCandidates.current) {
          await peer.addIceCandidate(new RTCIceCandidate(c));
        }
        pendingCandidates.current = [];
        
        setIsVoiceActive(true);
      });

      // Video answer
      s.on("video-answer", async ({ answer }) => {
        const peer = peerRef.current;
        if (!peer) return;

        await peer.setRemoteDescription(new RTCSessionDescription(answer));

        for (const c of pendingCandidates.current) {
          await peer.addIceCandidate(new RTCIceCandidate(c));
        }
        pendingCandidates.current = [];
        
        setIsVideoActive(true);
      });

      // ICE candidates
      s.on("ice-candidate", async ({ candidate }) => {
        const peer = peerRef.current;
        if (!peer) return;

        if (peer.remoteDescription && peer.remoteDescription.type) {
          try {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (e) {
            console.error("ICE error", e);
          }
        } else {
          pendingCandidates.current.push(candidate);
        }
      });

      // Auto join if saved
      const savedRoom = localStorage.getItem("roomId");
      if (savedRoom) {
        roomIdRef.current = savedRoom;
        s.emit("joinRoom", { roomId: savedRoom });
        setRoomId(savedRoom);
        setJoined(true);
        fetchMessages(savedRoom);
      }

      // Room created
      s.on("roomCreated", ({ roomId }) => {
        setRoomId(roomId);
        roomIdRef.current = roomId;
        setJoined(true);
        setMessages([]);
        localStorage.setItem("roomId", roomId);
      });

      // Chat messages
      s.on("chatMessage", ({ userId, username, msg, createdAt }) => {
        const isOwn = userId === user.id;
        setMessages((prev) => [
          ...prev,
          {
            type: "message",
            userId,
            username: isOwn ? "You" : username,
            content: msg,
            isOwn,
            timestamp: new Date(createdAt).toLocaleTimeString(),
          },
        ]);
      });

      // User joined
      s.on("userJoined", ({ username }) => {
        setMessages((prev) => [
          ...prev,
          { type: "system", content: `${username} joined the room` },
        ]);
      });
    };

    init();
  }, [user]);

  // Start Voice call
  const startVoice = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;

      const peer = createPeer();
      peerRef.current = peer;
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socketRef.current.emit("voice-offer", { roomId: roomIdRef.current, offer });
      setIsVoiceActive(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  // Start Video call
  const startVideo = async () => {
    try {
      const stream = await getMediaStream(true);
      const peer = createPeer();
      peerRef.current = peer;
      stream.getTracks().forEach(track => peer.addTrack(track, stream));

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socketRef.current.emit("video-offer", {
        roomId: roomIdRef.current,
        offer,
      });
      setIsVideoActive(true);
    } catch (err) {
      console.error("Camera/Microphone access denied:", err);
    }
  };

  const endCall = () => {
    peerRef.current?.close();
    peerRef.current = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    setIsVoiceActive(false);
    setIsVideoActive(false);
    
    // Clear video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  // Chat actions
  const createRoom = () => {
    socketRef.current.emit("createRoom");
  };

  const joinRoom = () => {
    if (!roomId.trim()) return;
    roomIdRef.current = roomId;
    socketRef.current.emit("joinRoom", { roomId });
    localStorage.setItem("roomId", roomId);
    setJoined(true);
    fetchMessages(roomId);
  };

  const sendMessage = () => {
    if (!msg.trim()) return;
    const newMsg = {
      type: "message",
      userId: user.id,
      username: "You",
      content: msg,
      isOwn: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMsg]);

    socketRef.current.emit("chatMessage", {
      roomId: roomIdRef.current,
      msg,
    });

    setMsg("");
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // UI
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 via-[#0f172a] to-gray-900" 
        : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
    }`}>
      <HeaderForDashboard />
      
      <div className={`flex-1 max-w-7xl mx-auto w-full px-4 ${joined ? "py-8" : "py-16"}`}>
        {/* Header with animated gradient */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className={`text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x`}>
              WorkSpace
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          {!joined && (
            <p className={`mt-4 text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {isArabic ? "انضم أو أنشئ غرفة للبدء" : "Join or create a room to start collaborating"}
            </p>
          )}
        </div>

        {/* Room Controls */}
        {!joined && (
          <div className="max-w-2xl mx-auto">
            <div className={`backdrop-blur-lg rounded-2xl shadow-2xl p-8 ${
              theme === "dark" ? "bg-white/5" : "bg-white/80"
            } border ${theme === "dark" ? "border-gray-700" : "border-white/20"}`}>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <button
                  onClick={createRoom}
                  className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles size={20} />
                    {isArabic ? "إنشاء غرفة" : "Create Room"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
                
                <div className="flex-1 relative flex gap-2 w-full">
                  <input
                    placeholder={isArabic ? "أدخل معرف الغرفة" : "Enter Room ID"}
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className={`w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                    } focus:outline-none focus:ring-4 ${
                      theme === "dark" ? "focus:ring-blue-500/20" : "focus:ring-purple-500/20"
                    } pr-28`}
                  />
                  <button
                    onClick={joinRoom}
                    disabled={!roomId.trim()}
                    className={`absolute ${isArabic ? "left-2" : "right-2"} top-2 bottom-2 px-6 rounded-lg font-medium transition-all duration-300 ${
                      roomId.trim()
                        ? theme === "dark"
                          ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                          : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isArabic ? "انضمام" : "Join"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chat + Voice/Video Area */}
        {joined && (
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-280px)] min-h-[600px]">
            {/* Left Side - Voice & Video Controls */}
            <div className={`lg:w-96 rounded-2xl overflow-hidden backdrop-blur-lg border ${
              theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
            }`}>
              <div className="p-6 space-y-6">
                {/* Voice Channel Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                      <Users className="text-white" size={20} />
                    </div>
                    <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Voice Channel
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl ${
                      theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${isVoiceActive ? "bg-green-500 animate-pulse" : "bg-gray-400"} rounded-full`}></div>
                          <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {isVoiceActive ? "Connected" : "Disconnected"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={startVoice}
                        disabled={isVoiceActive || isVideoActive}
                        className={`flex-1 py-2.5 px-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                          isVoiceActive
                            ? "bg-green-500 text-white cursor-default"
                            : isVideoActive
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : theme === "dark"
                            ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-xl"
                        }`}
                      >
                        {isVoiceActive ? <Mic size={16} /> : <Mic size={16} />}
                        {isVoiceActive ? "Active" : "Voice"}
                      </button>
                      <button
                        onClick={endCall}
                        disabled={!isVoiceActive && !isVideoActive}
                        className={`py-2.5 px-3 rounded-lg font-medium transition-all duration-300 ${
                          isVoiceActive || isVideoActive
                            ? "bg-red-500 hover:bg-red-600 text-white hover:shadow-lg"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <PhoneOff size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Call Section - New Div */}
                <div className="border-t pt-6 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500">
                      <Video className="text-white" size={20} />
                    </div>
                    <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Video Call
                    </h2>
                  </div>

                  {/* Video Preview Area */}
                  <div className="space-y-3">
                    <div className={`p-3 rounded-xl ${
                      theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 ${isVideoActive ? "bg-green-500 animate-pulse" : "bg-gray-400"} rounded-full`}></div>
                          <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                            {isVideoActive ? "Video call active" : "No active video call"}
                          </span>
                        </div>
                      </div>

                      {/* Video Grid */}
                      {isVideoActive && (
                        <div className="space-y-2">
                          {/* Local Video */}
                          <div className="relative rounded-lg overflow-hidden bg-black/20 aspect-video">
                            <video
                              ref={localVideoRef}
                              autoPlay
                              playsInline
                              muted
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-xs text-white">
                              You
                            </div>
                          </div>

                          {/* Remote Video */}
                          <div className="relative rounded-lg overflow-hidden bg-black/20 aspect-video">
                            <video
                              ref={remoteVideoRef}
                              autoPlay
                              playsInline
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-xs text-white">
                              Remote
                            </div>
                          </div>
                        </div>
                      )}

                      {!isVideoActive && (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <Video className={`w-12 h-12 mb-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                            Start a video call to see participants
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={startVideo}
                      disabled={isVideoActive || isVoiceActive}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isVideoActive
                          ? "bg-green-500 text-white cursor-default"
                          : isVoiceActive
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : theme === "dark"
                          ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white hover:shadow-lg"
                          : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white hover:shadow-xl"
                      }`}
                    >
                      {isVideoActive ? <Video size={18} /> : <Video size={18} />}
                      {isVideoActive ? "Video Call Active" : "Start Video Call"}
                    </button>
                  </div>
                </div>

                {/* Room Info */}
                <div className="border-t pt-4 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                      Room ID:
                    </span>
                    <div className="flex items-center gap-2">
                      <code className={`text-xs px-2 py-1 rounded ${
                        theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                      }`}>
                        {roomId.slice(0, 8)}...
                      </code>
                      <button
                        onClick={copyRoomId}
                        className={`p-1 rounded transition-all duration-200 ${
                          theme === "dark" 
                            ? "hover:bg-gray-700 text-gray-400 hover:text-white" 
                            : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Chat */}
            <div className={`flex-1 rounded-2xl overflow-hidden backdrop-blur-lg border ${
              theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200"
            }`}>
              {/* Chat Header */}
              <div className={`px-6 py-4 border-b ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                      <MessageCircle className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Room Chat
                      </h3>
                      <p className="text-sm text-gray-500">
                        {messages.length} messages
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[calc(100%-180px)] overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <MessageCircle className="text-white" size={32} />
                      </div>
                      <p className={`text-lg font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        No messages yet
                      </p>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                        Start the conversation!
                      </p>
                    </div>
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${m.type === "system" ? "justify-center" : m.isOwn ? "justify-end" : "justify-start"} animate-fadeIn`}
                    >
                      {m.type === "system" ? (
                        <div className={`px-4 py-2 rounded-full text-sm ${
                          theme === "dark" 
                            ? "bg-gray-700/50 text-gray-400" 
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {m.content}
                        </div>
                      ) : (
                        <div className={`max-w-[70%] group ${m.isOwn ? "order-2" : "order-1"}`}>
                          <div className="flex items-center gap-2 mb-1 px-1">
                            <span className={`text-xs font-medium ${
                              theme === "dark" ? "text-gray-500" : "text-gray-500"
                            }`}>
                              {m.username}
                            </span>
                            <span className={`text-xs ${
                              theme === "dark" ? "text-gray-600" : "text-gray-400"
                            }`}>
                              {m.timestamp}
                            </span>
                          </div>
                          <div className={`relative rounded-2xl px-4 py-3 ${
                            m.isOwn
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                              : theme === "dark"
                              ? "bg-gray-700 text-gray-200 rounded-bl-none"
                              : "bg-white text-gray-800 rounded-bl-none shadow-md"
                          }`}>
                            <p className="break-words">{m.content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className={`p-4 border-t ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}>
                <div className="flex gap-2">
                  <input
                    value={msg}
                    onChange={(e) => {
                      setMsg(e.target.value);
                      setIsTyping(e.target.value.length > 0);
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder={isArabic ? "اكتب رسالتك..." : "Type your message..."}
                    className={`flex-1 px-6 py-3 rounded-xl border-2 transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-500 focus:border-blue-500"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
                    } focus:outline-none focus:ring-4 ${
                      theme === "dark" ? "focus:ring-blue-500/20" : "focus:ring-purple-500/20"
                    }`}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!msg.trim()}
                    className={`p-3 rounded-xl font-medium  ${
                      msg.trim()
                        ? "bg-blue-600 text-white hover:shadow-xl transform hover:scale-105"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leave Room */}
        {joined && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                localStorage.removeItem("roomId");
                setJoined(false);
                setRoomId("");
                setMessages([]);
                endCall();
              }}
              className="group relative px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut size={20} />
                {isArabic ? "مغادرة الغرفة" : "Leave Room"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>

      <footer className="mt-auto">
        <FooterForDashboard />
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}