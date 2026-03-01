import { motion } from 'motion/react';
import { Server, Target, Zap } from 'lucide-react';

const servers = [
  "Golden MC", "Universal MC", "Apple MC", "Zyper MC", 
  "Cursed MC", "Choco MC", "VIPMC", "BlueMC", 
  "SoulMC", "Mango MC", "Flame MC"
];

export default function Experience() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Overview</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            As an Elite Minecraft Server Management Specialist, I bring years of hands-on experience in scaling, optimizing, and leading Minecraft communities. My approach combines deep technical knowledge with strategic community management to build environments where players thrive and servers remain stable under pressure.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">The Vision</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            I am driven by a growth-focused mindset. My vision is to transform standard servers into industry-leading networks through unwavering stability, visionary leadership, and innovative gameplay experiences. I believe in proactive problem-solving and building resilient architectures that stand the test of time.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-8 md:p-12 rounded-3xl"
      >
        <div className="flex items-center gap-4 mb-8 justify-center">
          <Server className="w-8 h-8 text-indigo-500" />
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Servers Worked On</h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {servers.map((server, index) => (
            <span 
              key={index}
              className="px-6 py-3 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-semibold shadow-sm border border-slate-200 dark:border-slate-700/50 hover:scale-105 transition-transform cursor-default"
            >
              {server}
            </span>
          ))}
          <span className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-md hover:scale-105 transition-transform cursor-default">
            + 20 Additional Servers
          </span>
        </div>
      </motion.div>
    </section>
  );
}
