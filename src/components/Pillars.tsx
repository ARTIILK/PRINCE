import { motion } from 'motion/react';
import { CheckCircle2, Compass, MessageSquare, Brain, LayoutList } from 'lucide-react';

const pillars = [
  { icon: <Compass className="w-5 h-5 text-indigo-500" />, title: "Leadership" },
  { icon: <MessageSquare className="w-5 h-5 text-blue-500" />, title: "Communication" },
  { icon: <Brain className="w-5 h-5 text-purple-500" />, title: "Calm Decision-Making" },
  { icon: <LayoutList className="w-5 h-5 text-emerald-500" />, title: "Structured Planning" }
];

const checklist = [
  "Successfully managed and scaled multiple 100+ concurrent player networks.",
  "Implemented zero-downtime deployment strategies for major server updates.",
  "Resolved critical economy exploits and dupes within minutes of discovery.",
  "Trained and led staff teams of 10+ moderators and administrators.",
  "Optimized server TPS from 12 to a stable 20 under heavy load.",
  "Designed custom rank economies that increased server revenue by 40%."
];

export default function Pillars() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-10 rounded-3xl"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Professional Pillars</h2>
          <div className="space-y-6">
            {pillars.map((pillar, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                  {pillar.icon}
                </div>
                <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">{pillar.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-10 rounded-3xl bg-gradient-to-br from-slate-900/10 to-transparent dark:from-slate-800/50 dark:to-transparent"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Proven Success</h2>
          <ul className="space-y-5">
            {checklist.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-lg">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
