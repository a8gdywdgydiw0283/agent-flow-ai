import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    desc: "Perfect for small businesses getting started with AI.",
    features: ["1 AI Agent", "500 conversations/mo", "Website widget", "Email support", "Basic analytics"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    desc: "For growing teams that need multi-channel automation.",
    features: ["5 AI Agents", "5,000 conversations/mo", "WhatsApp + Web + Instagram", "Priority support", "Advanced analytics", "Smart scheduling", "Custom branding"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Unlimited scale with dedicated infrastructure.",
    features: ["Unlimited agents", "Unlimited conversations", "All channels", "Dedicated CSM", "Custom integrations", "SLA guarantee", "SSO & SAML", "On-prem option"],
    popular: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="relative py-24 sm:py-32">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-semibold text-primary tracking-widest uppercase">Pricing</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-4">
          Simple, <span className="text-gradient">Transparent</span> Pricing
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Start free, scale as you grow. No hidden fees.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`relative rounded-2xl p-7 transition-all duration-500 ${
              plan.popular
                ? "neon-border bg-card scale-[1.03]"
                : "glass hover:border-primary/20"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase">
                Most Popular
              </div>
            )}
            <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-5">{plan.desc}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-display text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className={`block text-center px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                plan.popular
                  ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(190_100%_50%/0.4)]"
                  : "border border-border hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
