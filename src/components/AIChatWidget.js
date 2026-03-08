import React, { useState } from "react";

export const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I'm your AI study assistant. Ask me anything!",
    },
  ]);
  const [input, setInput] = useState("");

  /* ---------- SIMPLE AI ENGINE ---------- */

  const getAIResponse = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("course") || msg.includes("study")) {
      return "Based on your APS, you can explore courses like IT, Business, Education, and Health Sciences.";
    }

    if (msg.includes("chance") || msg.includes("admission")) {
      return "Your admission chances depend on APS score, subject requirements, and competition levels.";
    }

    if (msg.includes("career")) {
      return "You may enjoy careers in Software Development, Engineering, Data Science, or Business Analytics.";
    }

    if (msg.includes("bursary") || msg.includes("bursaries")) {
      return "You can qualify for NSFAS, Merit Bursaries, and Private Sponsorships depending on your APS.";
    }

    return "I can help with courses, admissions, careers, and bursaries. What would you like to know?";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const aiMsg = { sender: "ai", text: getAIResponse(input) };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setOpen(!open)} style={styles.fab}>
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div style={styles.chatBox}>
          <div style={styles.header}>
            AI Assistant
            <span style={styles.close} onClick={() => setOpen(false)}>
              ✕
            </span>
          </div>

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
                  background: m.sender === "user" ? "#1e3a8a" : "#e2e8f0",
                  color: m.sender === "user" ? "white" : "black",
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.send}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ---------- STYLES ---------- */

const styles = {
  fab: {
    position: "fixed",
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "none",
    background: "#1e3a8a",
    color: "white",
    fontSize: 26,
    cursor: "pointer",
    zIndex: 9999,
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
  },

  chatBox: {
    position: "fixed",
    bottom: 100,
    right: 25,
    width: 320,
    height: 420,
    background: "white",
    borderRadius: 12,
    boxShadow: "0 12px 35px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999,
  },

  header: {
    background: "#1e3a8a",
    color: "white",
    padding: 12,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
  },

  close: { cursor: "pointer" },

  messages: {
    flex: 1,
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflowY: "auto",
  },

  message: {
    padding: "8px 12px",
    borderRadius: 10,
    maxWidth: "80%",
  },

  inputArea: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },

  input: {
    flex: 1,
    padding: 10,
    border: "none",
  },

  send: {
    padding: "10px 15px",
    border: "none",
    background: "#1e3a8a",
    color: "white",
    cursor: "pointer",
  },
};
