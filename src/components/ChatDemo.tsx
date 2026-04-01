import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";

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
    "Thank you for your message! I'm NexusAI, your intelligent assistant. I can help with appointment scheduling, answering FAQs, and much more. How can I assist you today?",
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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(userMsg.content) }]);
    }, 1500 + Math.random() * 1000);
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
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-semibold text-sm">NexusAI Receptionist</div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[420px] overflow-y-auto p-5 space-y-4 scrollbar-thin">
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
                  >
                    {msg.content}
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
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:shadow-[0_0_20px_hsl(190_100%_50%/0.4)] transition-all disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatDemo;
