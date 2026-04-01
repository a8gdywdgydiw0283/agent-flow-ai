import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            <span className="text-xs font-medium text-primary tracking-wide uppercase">
              AI-Powered Automation
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Your Business on{" "}
            <span className="text-gradient">Autopilot</span>
            <br />
            with AI Agents
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Deploy intelligent AI agents that handle customer conversations,
            schedule appointments, and automate workflows — 24/7, across every channel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#demo"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:shadow-[0_0_40px_hsl(190_100%_50%/0.4)] transition-all duration-300 hover:scale-105"
            >
              Try Live Demo
            </a>
            <a
              href="#cta"
              className="px-8 py-3.5 rounded-lg border border-border text-foreground font-semibold text-base hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              Book a Call
            </a>
          </motion.div>

          {/* Floating metrics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 grid grid-cols-3 gap-8 sm:gap-16"
          >
            {[
              { value: "10K+", label: "Conversations/day" },
              { value: "99.9%", label: "Uptime" },
              { value: "<2s", label: "Response time" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">{m.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
