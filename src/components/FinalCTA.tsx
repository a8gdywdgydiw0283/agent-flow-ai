import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => (
  <section id="cta" className="relative py-24 sm:py-32">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
    <div className="container relative mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary tracking-wide uppercase">Limited Early Access</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
          Ready to Put Your Business on{" "}
          <span className="text-gradient">Autopilot</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Join 500+ businesses already saving 40+ hours per week with intelligent AI automation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_50px_hsl(190_100%_50%/0.4)] transition-all duration-300 hover:scale-105"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
          >
            Schedule a Demo
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-6">No credit card required · Setup in 5 minutes · Cancel anytime</p>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
