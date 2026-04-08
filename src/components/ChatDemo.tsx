import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, MessageSquare, Mail, Calendar, Database } from "lucide-react";
import { parseWebhookReply } from "@/lib/chat-response";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const preloadedConversation: Message[] = [
  { role: "user", content: "Hi, I'd like to book a dental appointment." },
  { role: "assistant", content: "Hello! I'd be happy to help you schedule an appointment at Bright Smile Dental. 😊\n\nWhat type of appointment are you looking for?\n\n1. General Checkup\n2. Teeth Cleaning\n3. Whitening\n4. Emergency" },
  { role: "user", content: "I need a general checkup please." },
  { role: "assistant", content: "Great choice! We have the following slots available this week:\n\n📅 **Tuesday, April 3** — 10:00 AM, 2:30 PM\n📅 **Wednesday, April 4** — 9:00 AM, 11:30 AM\n📅 **Friday, April 6** — 3:00 PM\n\nWhich time works best for you?" },
  { role: "user", content: "Wednesday at 9 AM would be perfect." },
  { role: "assistant", content: "Wonderful! I've reserved **Wednesday, April 4 at 9:00 AM** for your general checkup with Dr. Sarah Chen.\n\n✅ Appointment confirmed!\n📍 Bright Smile Dental, 123 Health Ave\n⏰ Please arrive 10 minutes early\n\nI'll send you a reminder the day before. Is there anything else I can help with?" },
];

const simulatedResponses: Record<string, string> = {
  default:
    "Thank you for your message! I'm Nour, your intelligent assistant. I can help with appointment scheduling, answering FAQs, and much more. How can I assist you today?",
  hello:
    "Hello! Welcome to Bright Smile Dental. I'm your AI receptionist. Would you like to book an appointment, ask about our services, or check your existing booking?",
  price:
    "Here are our current rates:\n\n💰 General Checkup — $75\n💰 Professional Cleaning — $120\n💰 Whitening Session — $250\n💰 Emergency Visit — $150\n\nWe also accept most insurance plans. Would you like to schedule a visit?",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi")) return simulatedResponses.hello;
  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) return simulatedResponses.price;
  return simulatedResponses.default;
};

const ChatDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [demoPhase, setDemoPhase] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef("nexus-web-demo-fixed-session");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Auto-play preloaded conversation
  useEffect(() => {
    if (demoPhase >= preloadedConversation.length) return;

    const msg = preloadedConversation[demoPhase];
    const delay = msg.role === "user" ? 1200 : 1800;

    const timer = setTimeout(() => {
      if (msg.role === "assistant") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, msg]);
          setDemoPhase((p) => p + 1);
        }, 1500);
      } else {
        setMessages((prev) => [...prev, msg]);
        setDemoPhase((p) => p + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [demoPhase]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://n8n.mohamed-rabiee.tech/webhook/6e7a6309-785b-458c-8d39-d00e387db539",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
          body: JSON.stringify({ value: userMsg.content, sessionId: sessionIdRef.current }),
        }
      );
      let reply = await parseWebhookReply(response);
      if (!reply) {
        reply = "⏳ I reached your n8n workflow, but it returned an empty reply. Please try again in a moment.";
      }
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't get a valid response from n8n right now. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary tracking-widest uppercase">Live Demo</span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
            See the AI Agent <span className="text-gradient">in Action</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Watch how our AI receptionist handles a real booking flow — then try it yourself.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto"
        >
          <div className="glass neon-border rounded-2xl overflow-hidden">
            {/* Chat header — Onyx style */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-display font-bold text-base tracking-wide">Nour</div>
                  <p className="text-xs text-muted-foreground">AI Receptionist</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-xs font-medium mb-1.5 justify-end">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-[11px]">ONLINE</span>
                  <span className="text-muted-foreground text-[11px]">| 0ms</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-[10px] text-muted-foreground mr-1">Integrations:</span>
                  {[
                    { icon: <MessageSquare className="w-3 h-3" />, bg: "bg-green-500" },
                    { icon: <Mail className="w-3 h-3" />, bg: "bg-secondary" },
                    { icon: <Calendar className="w-3 h-3" />, bg: "bg-secondary" },
                    { icon: <Database className="w-3 h-3" />, bg: "bg-secondary" },
                  ].map((item, i) => (
                    <div key={i} className={`${item.bg} text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center`}>
                      {item.icon}
                    </div>
                  ))}
                  <div className="bg-secondary text-secondary-foreground rounded text-[9px] font-bold px-1.5 py-0.5">CRM</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="h-[420px] overflow-y-auto p-5 space-y-4 scrollbar-thin flex flex-col">
              <div className="flex-1" />
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-secondary text-secondary-foreground rounded-bl-sm"
                    }`}
                  dir="auto"
                  style={{ unicodeBidi: "plaintext" }}
                >
                    {msg.content.split("\n").map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <User className="w-3.5 h-3.5 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center justify-between px-1 mb-1">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[8px] font-bold">AI</span>
                    AI Integrated
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="اكتب رسالتك..."
                    dir="rtl"
                    className="flex-1 bg-secondary border border-border rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all text-right"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:shadow-[0_0_20px_hsl(190_100%_50%/0.4)] transition-all disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatDemo;
