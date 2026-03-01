import { motion } from 'motion/react';
import { Github, MessageSquare, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 text-center border-t border-slate-200/50 dark:border-slate-800/50 mt-20">
      <div className="flex justify-center gap-8 mb-8">
        <div className="group relative">
          <a href="#" className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#5865F2] hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
            <MessageSquare className="w-6 h-6" />
          </a>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Let's connect on Discord
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
        </div>

        <div className="group relative">
          <a href="#" className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
            <Terminal className="w-6 h-6" />
          </a>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Read my DEV articles
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
        </div>

        <div className="group relative">
          <a href="#" className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
            <Github className="w-6 h-6" />
          </a>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Check my code on GitHub
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
        </div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 font-medium">
        © {new Date().getFullYear()} Prince Prasad. All rights reserved.
      </p>
    </footer>
  );
}
