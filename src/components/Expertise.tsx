import { motion } from 'motion/react';
import { Shield, Settings, Users } from 'lucide-react';

const expertise = [
  {
    title: "Core Management",
    icon: <Settings className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    items: ["LuckPerms", "EssentialsX", "Vault", "Multiverse-Core", "ClearLag", "ViaVersion"]
  },
  {
    title: "World Protection",
    icon: <Shield className="w-6 h-6" />,
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    items: ["WorldGuard", "WorldEdit", "CoreProtect", "GriefPrevention", "AntiCheat Systems"]
  },
  {
    title: "Community & Integration",
    icon: <Users className="w-6 h-6" />,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    items: ["DiscordSRV", "PlaceholderAPI", "Citizens", "HolographicDisplays", "Votifier"]
  }
];

export default function Expertise() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Technical Expertise</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Mastery over industry-standard plugins and server infrastructure to guarantee seamless gameplay and robust security.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {expertise.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
          >
            <div className={`p-4 rounded-2xl mb-6 ${cat.bg} ${cat.color}`}>
              {cat.icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{cat.title}</h3>
            <ul className="space-y-3 w-full">
              {cat.items.map((item, i) => (
                <li key={i} className="py-2 px-4 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700/50">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
