import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Owner, Bright Smile Dental",
    quote: "NexusAI cut our missed appointments by 60%. Patients love the instant booking experience.",
    avatar: "SM",
  },
  {
    name: "James Rodriguez",
    role: "CTO, ShopWave",
    quote: "We replaced 5 support agents with one AI bot. Response time went from 4 hours to 2 seconds.",
    avatar: "JR",
  },
  {
    name: "Aisha Patel",
    role: "Marketing Lead, PropHouse",
    quote: "Our WhatsApp bot generates 200+ qualified leads per month on autopilot. Game-changer.",
    avatar: "AP",
  },
];

const logos = ["TechCorp", "MedFlow", "ShopWave", "PropHouse", "EduPrime"];

const Testimonials = () => (
  <section className="relative py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold text-primary tracking-widest uppercase">Social Proof</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
          Trusted by <span className="text-gradient">Industry Leaders</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="glass rounded-2xl p-6 hover:neon-border transition-all duration-500"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed mb-6 italic">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center font-display font-bold text-xs">
                {t.avatar}
              </div>
              <div>
                <div className="font-display font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logo strip */}
      <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
        {logos.map((l) => (
          <span key={l} className="font-display font-bold text-lg tracking-wider">{l}</span>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
