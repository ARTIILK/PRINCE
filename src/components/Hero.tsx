import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Music, Circle } from 'lucide-react';

const calculateAge = (birthYear: number, birthMonth: number) => {
  const today = new Date();
  let age = today.getFullYear() - birthYear;
  if (today.getMonth() < birthMonth - 1) {
    age--;
  }
  return age;
};

interface LanyardData {
  discord_status: string;
  activities: any[];
  spotify: any;
}

export default function Hero() {
  const age = calculateAge(2008, 9);
  const [lanyard, setLanyard] = useState<LanyardData | null>(null);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const res = await fetch('https://api.lanyard.rest/v1/users/1459859699624186053');
        const data = await res.json();
        if (data.success) {
          setLanyard(data.data);
        }
      } catch (e) {
        console.error('Failed to fetch Lanyard data', e);
      }
    };
    fetchLanyard();
    const interval = setInterval(fetchLanyard, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'idle': return 'text-yellow-500';
      case 'dnd': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-3xl max-w-3xl w-full relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-700/50 flex items-center justify-center text-3xl font-bold text-slate-800 dark:text-white shadow-xl">
              PP
            </div>
            {lanyard && (
              <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${getStatusColor(lanyard.discord_status)}`}>
                <Circle className="w-3 h-3 fill-current" />
              </div>
            )}
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          Prince Prasad
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-6">
          Elite Minecraft Server Management Specialist
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
            {age} Years Old
          </span>
          <span className="px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-sm font-medium backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
            Visionary Leader
          </span>
        </div>

        {lanyard && (lanyard.spotify || (lanyard.activities && lanyard.activities.length > 0)) && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50 flex flex-col items-center gap-3">
            {lanyard.spotify && (
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-800/30 px-4 py-2 rounded-xl">
                <Music className="w-4 h-4 text-green-500" />
                <span>Listening to <strong className="text-slate-900 dark:text-white">{lanyard.spotify.song}</strong> by {lanyard.spotify.artist}</span>
              </div>
            )}
            {lanyard.activities && lanyard.activities.filter(a => a.type === 0).map((activity, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-slate-800/30 px-4 py-2 rounded-xl">
                <Gamepad2 className="w-4 h-4 text-blue-500" />
                <span>Playing <strong className="text-slate-900 dark:text-white">{activity.name}</strong></span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
