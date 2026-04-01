import { motion } from "framer-motion";
import { Brain, Globe, CalendarClock, Languages, Zap, Shield, BarChart3, RefreshCw } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Memory", desc: "Remembers past conversations and personalizes every interaction." },
  { icon: Globe, title: "Multi-Platform", desc: "Deploy on web, WhatsApp, Instagram, Telegram, and more." },
  { icon: CalendarClock, title: "Smart Scheduling", desc: "Syncs with Google Calendar and auto-books appointments." },
  { icon: Languages, title: "Natural Language", desc: "Understands context, slang, and intent with human-like accuracy." },
  { icon: Zap, title: "Instant Responses", desc: "Sub-2-second response times, 24/7, across all channels." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant with end-to-end encryption and data isolation." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track conversations, conversions, and customer satisfaction." },
  { icon: RefreshCw, title: "Continuous Learning", desc: "Gets smarter with every interaction through feedback loops." },
];

const Features = () => (
  <section id="features" className="relative py-24 sm:py-32">
    <div className="absolute inset-0 particle-grid opacity-30 pointer-events-none" />
    <div className="container relative mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold text-primary tracking-widest uppercase">Features</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
          Everything You Need to <span className="text-gradient">Automate</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A complete platform that scales from startup to enterprise.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass rounded-xl p-5 group hover:border-primary/30 transition-all duration-300"
          >
            <f.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
