import { motion } from "framer-motion";
import { Plug, Brain, MessageSquare, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Plug,
    title: "Connect Your Business",
    description: "Integrate with your website, WhatsApp, Instagram, or any platform in minutes.",
  },
  {
    icon: Brain,
    title: "Train the AI",
    description: "Feed it your FAQs, services, and tone of voice. It learns and adapts.",
  },
  {
    icon: MessageSquare,
    title: "Automate Conversations",
    description: "Your AI agent handles bookings, inquiries, and support around the clock.",
  },
  {
    icon: TrendingUp,
    title: "Scale Effortlessly",
    description: "Handle 10x the volume without hiring. Analytics give you full visibility.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="relative py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <span className="text-xs font-semibold text-primary tracking-widest uppercase">How It Works</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
          Four Steps to <span className="text-gradient">AI Automation</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Go from zero to fully automated in less than a day.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-4 gap-8 relative">
        {/* Connection line */}
        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-2xl glass neon-border flex items-center justify-center group-hover:shadow-[0_0_40px_hsl(190_100%_50%/0.3)] transition-all duration-500">
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground font-display font-bold text-xs flex items-center justify-center">
                {i + 1}
              </div>
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
