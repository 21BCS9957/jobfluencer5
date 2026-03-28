"use client";

import { useEffect, useRef, useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { getGsap } from "@/animations/gsapClient";
import { Send, Search, Phone, MoreVertical, MessageSquare } from "lucide-react";

export function MessagesView() {
  const conversations = useDashboardStore((s) => s.conversations);
  const activeConversationId = useDashboardStore((s) => s.activeConversationId);
  const setActiveConversation = useDashboardStore(
    (s) => s.setActiveConversation
  );
  const sendMessage = useDashboardStore((s) => s.sendMessage);

  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  const filteredConversations = searchQuery
    ? conversations.filter((c) =>
        c.brandName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  useEffect(() => {
    const gsap = getGsap();
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages.length]);

  useEffect(() => {
    const gsap = getGsap();
    if (chatRef.current && activeConversationId) {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [activeConversationId]);

  const handleSend = () => {
    if (!messageInput.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, messageInput.trim());
    setMessageInput("");
  };

  return (
    <div ref={containerRef} className="flex h-screen">
      {/* Conversations List */}
      <div className="flex w-[340px] flex-shrink-0 flex-col border-r border-gray-200 dark:border-white/[0.06] bg-[#FAFAFA] dark:bg-black">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-white/[0.06] px-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
            {conversations.reduce((a, c) => a + c.unread, 0)}
          </span>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/25"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-300 dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-white/[0.12] dark:focus:bg-white/[0.05]"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => {
            const isActive = conv.id === activeConversationId;

            return (
              <button
                key={conv.id}
                onClick={() => setActiveConversation(conv.id)}
                className={[
                  "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all duration-200",
                  isActive
                    ? "bg-gray-100 dark:bg-white/[0.06]"
                    : "hover:bg-gray-50 dark:hover:bg-white/[0.03]",
                ].join(" ")}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.brandAvatar}
                    alt={conv.brandName}
                    className="h-11 w-11 rounded-full object-cover ring-1 ring-gray-200 dark:ring-white/[0.08]"
                  />
                  {conv.unread > 0 && (
                    <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-[#0A0A0A]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={[
                        "truncate text-sm",
                        conv.unread > 0
                          ? "font-semibold text-gray-900 dark:text-white"
                          : "font-medium text-gray-600 dark:text-white/70",
                      ].join(" ")}
                    >
                      {conv.brandName}
                    </p>
                    <span className="flex-shrink-0 text-[10px] text-gray-400 dark:text-white/25">
                      {conv.lastTimestamp}
                    </span>
                  </div>
                  <p
                    className={[
                      "mt-0.5 truncate text-xs",
                      conv.unread > 0 ? "text-gray-900 font-medium dark:text-white/50" : "text-gray-500 dark:text-white/25",
                    ].join(" ")}
                  >
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Window */}
      {activeConversation ? (
        <div ref={chatRef} className="flex flex-1 flex-col bg-[#FAFAFA] dark:bg-black">
          {/* Chat Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-white/[0.06] px-6">
            <div className="flex items-center gap-3">
              <img
                src={activeConversation.brandAvatar}
                alt={activeConversation.brandName}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200 dark:ring-white/[0.08]"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {activeConversation.brandName}
                </p>
                <p className="text-[10px] font-medium text-emerald-500 dark:text-emerald-400/70">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-white/30 dark:hover:bg-white/[0.05] dark:hover:text-white/60">
                <Phone size={16} />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-white/30 dark:hover:bg-white/[0.05] dark:hover:text-white/60">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mx-auto max-w-2xl space-y-4">
              {activeConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={[
                    "flex",
                    msg.isOwn ? "justify-end" : "justify-start",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
                      msg.isOwn
                        ? "rounded-br-md bg-black text-white dark:bg-white dark:text-black"
                        : "rounded-bl-md border border-gray-200 bg-white text-gray-900 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/80",
                    ].join(" ")}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={[
                        "mt-1.5 text-right text-[10px]",
                        msg.isOwn 
                          ? "text-white/50 dark:text-black/40" 
                          : "text-gray-400 dark:text-white/25",
                      ].join(" ")}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white dark:border-white/[0.06] dark:bg-black px-6 py-4">
            <div className="mx-auto flex max-w-2xl items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:border-gray-300 focus:bg-white dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white dark:placeholder-white/20 dark:focus:border-white/[0.15] dark:focus:bg-white/[0.05]"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!messageInput.trim()}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-black text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-md disabled:opacity-20 disabled:hover:scale-100 dark:bg-white dark:text-black dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-1 items-center justify-center bg-[#FAFAFA] dark:bg-black">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.03]">
              <MessageSquare
                size={24}
                strokeWidth={1.5}
                className="text-gray-400 dark:text-white/25"
              />
            </div>
            <p className="text-base font-medium text-gray-900 dark:text-white/40">
              Select a conversation
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-white/20">
              Choose from your existing conversations to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

