import { motion } from "framer-motion";
import { Stethoscope, ShoppingCart, Headphones, MessageCircle, Building2, GraduationCap } from "lucide-react";

const cases = [
  { icon: Stethoscope, title: "Dental Clinics", desc: "AI receptionist that books appointments, answers insurance questions, and sends reminders." },
  { icon: ShoppingCart, title: "E-Commerce", desc: "Automated customer support, order tracking, product recommendations, and returns." },
  { icon: Headphones, title: "Customer Support", desc: "Handle tier-1 support tickets, FAQs, and escalation — at 10x capacity." },
  { icon: MessageCircle, title: "WhatsApp Bots", desc: "Engage leads, qualify prospects, and close sales through WhatsApp automation." },
  { icon: Building2, title: "Real Estate", desc: "Schedule viewings, answer property queries, and pre-qualify buyers automatically." },
  { icon: GraduationCap, title: "Education", desc: "Enrollment assistance, course recommendations, and student support automation." },
];

const UseCases = () => (
  <section id="use-cases" className="relative py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold text-primary tracking-widest uppercase">Use Cases</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
          Built for <span className="text-gradient">Every Industry</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Our AI agents adapt to your business — not the other way around.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-6 group hover:neon-border transition-all duration-500 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <c.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases;
