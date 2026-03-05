import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Edges, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, Shield, Users, Command, MessageSquare, 
  Brain, CheckCircle, Activity, Github, Code, Gamepad2,
  Music, CircleDot, ChevronRight, Terminal, Globe, Bot, Layout
} from 'lucide-react';
import * as THREE from 'three';
import kraftLogo from './logo/kraft.png';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Lanyard API Hook ---
const LANYARD_USER_ID = import.meta.env.VITE_LANYARD_USER_ID || '1459859699624186053';
const DISCORD_PROFILE_URL = import.meta.env.VITE_DISCORD_PROFILE_URL || 'https://discord.com/users/1459859699624186053';
const GITHUB_PROFILE_URL = import.meta.env.VITE_GITHUB_PROFILE_URL || 'https://github.com/ARTIILK';
const DEV_COMMUNITY_URL = import.meta.env.VITE_DEV_COMMUNITY_URL || 'https://discord.gg/z69mSaVSVb';

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: any[];
  discord_user: {
    username: string;
    avatar: string;
    id: string;
  };
  listening_to_spotify: boolean;
  spotify: {
    song: string;
    artist: string;
  } | null;
}

function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let heartbeatInterval: ReturnType<typeof setInterval>;

    const connect = () => {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.op === 1) {
          heartbeatInterval = setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
        } else if (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE') {
          setData(msg.d);
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeatInterval);
        setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      clearInterval(heartbeatInterval);
      if (ws) ws.close();
    };
  }, [userId]);

  return data;
}

// --- Age Calculator ---
function calculateAge(birthMonth: number, birthYear: number) {
  const today = new Date();
  let age = today.getFullYear() - birthYear;
  if (today.getMonth() + 1 < birthMonth) {
    age--;
  }
  return age;
}

// --- Custom Cursor ---
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.hover-trigger')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <div className="w-full h-full border-2 border-white rounded-full" />
      <div className="absolute w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
}

// --- 3D Background Component ---
function OrbitingNode({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  const { radius, speed, angle, yOffset, isBox } = useMemo(() => ({
    radius: 3 + Math.random() * 5,
    speed: 0.1 + Math.random() * 0.3,
    angle: Math.random() * Math.PI * 2,
    yOffset: (Math.random() - 0.5) * 6,
    isBox: Math.random() > 0.5
  }), []);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.x = Math.cos(angle + t * speed) * radius;
    ref.current.position.z = Math.sin(angle + t * speed) * radius;
    ref.current.position.y = yOffset + Math.sin(t * speed * 2) * 0.5;
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={ref}>
      {isBox ? <boxGeometry args={[0.3, 0.3, 0.3]} /> : <octahedronGeometry args={[0.2, 0]} />}
      <meshStandardMaterial color={isBox ? "#10b981" : "#3b82f6"} wireframe={!isBox} />
    </mesh>
  );
}

function CyberScene() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial color="#10b981" wireframe transparent opacity={0.2} />
          <Edges scale={1} threshold={15} color="#10b981" />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#059669" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      
      {Array.from({ length: 40 }).map((_, i) => (
        <OrbitingNode key={`node-${i}`} index={i} />
      ))}

      <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.3} color="#10b981" />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
    </group>
  );
}

// --- Data ---
const ROLES = [
  "Full Stack Web Developer",
  "Minecraft Server Developer",
  "Discord & Telegram Bot Dev",
  "Portfolio & UI/UX Creator"
];

const SERVERS = [
  "SkyPix MC", "Astro MC", "Nature MC", "Wood MC", "Cursed MC", 
  "Choco MC", "VIPMC", "BlueMC", "SoulMC", "Mango MC", "Flame MC"
];

const EXPERTISE = [
  {
    title: "Full Stack Web",
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
    items: ["React & Next.js", "Tailwind CSS", "Node.js & Express", "Database Management"]
  },
  {
    title: "Minecraft Servers",
    icon: <Server className="w-6 h-6 text-emerald-400" />,
    items: ["Network Architecture", "Plugin Configuration", "Performance Optimization", "Economy & Permissions"]
  },
  {
    title: "Bot Development",
    icon: <Bot className="w-6 h-6 text-emerald-400" />,
    items: ["Discord.js", "Telegram API", "Custom Integrations", "Automated Moderation"]
  },
  {
    title: "UI/UX & Portfolios",
    icon: <Layout className="w-6 h-6 text-emerald-400" />,
    items: ["Framer Motion", "Three.js / WebGL", "Responsive Design", "Glassmorphism"]
  }
];

const PILLARS = [
  { title: "Leadership", icon: <Command className="w-5 h-5 text-emerald-400" /> },
  { title: "Communication", icon: <MessageSquare className="w-5 h-5 text-emerald-400" /> },
  { title: "Calm Decision-Making", icon: <Brain className="w-5 h-5 text-emerald-400" /> },
  { title: "Structured Planning", icon: <Activity className="w-5 h-5 text-emerald-400" /> }
];

const SUCCESS_CHECKLIST = [
  "Optimized server performance (TPS/MSP) across large player bases.",
  "Managed staff teams and established clear guidelines.",
  "Configured complex permission nodes and economy systems.",
  "Resolved critical bugs and exploits under pressure.",
  "Bridged in-game and Discord communities seamlessly."
];

// --- Role Rotator Component ---
function RoleRotator() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 sm:h-12 overflow-hidden relative mb-8 flex justify-center md:justify-start">
      <AnimatePresence mode="wait">
        <motion.h2
          key={roleIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl text-emerald-400 font-medium absolute whitespace-nowrap"
        >
          {ROLES[roleIndex]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const age = calculateAge(9, 2008);
  const lanyard = useLanyard(LANYARD_USER_ID);

  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  const playingGame = lanyard?.activities.find(a => a.type === 0);

  const communities = useMemo(() => [
    {
      id: 'discord_profile',
      kind: 'discord_user',
      title: 'Discord',
      url: DISCORD_PROFILE_URL,
      displayName: 'AURTX'
    },
    {
      id: 'github',
      kind: 'link',
      title: 'GitHub',
      url: GITHUB_PROFILE_URL,
      icon: <Github className="w-5 h-5" />,
      username: 'ARTIILK'
    },
    {
      id: 'dev_community',
      kind: 'community',
      title: 'Kraftwork Collective Hub',
      url: DEV_COMMUNITY_URL,
      logo: kraftLogo,
      description: 'Join the Kraftwork Collective Hub to discuss dev projects & collabs'
    }
  ], []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <CustomCursor />

      {/* Over Screen Decent Animation (Grid Overlay) */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <CyberScene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        
        {/* Hero Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-8"
        >
          <div className="flex-1 w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono mb-6 hover-trigger">
              <Terminal className="w-4 h-4" />
              <span>SYSTEM.READY // AGE: {age}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Prince Prasad
            </h1>
            
            <RoleRotator />
            
            {/* Lanyard Status */}
            {lanyard && (
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 hover-trigger">
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="relative flex h-3 w-3">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", statusColors[lanyard.discord_status])}></span>
                    <span className={cn("relative inline-flex rounded-full h-3 w-3", statusColors[lanyard.discord_status])}></span>
                  </div>
                  <span className="text-sm font-medium capitalize">{lanyard.discord_status}</span>
                </div>
                
                {lanyard.listening_to_spotify && lanyard.spotify && (
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <Music className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {lanyard.spotify.song} - {lanyard.spotify.artist}
                    </span>
                  </div>
                )}

                {playingGame && (
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <Gamepad2 className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      Playing {playingGame.name}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.header>

        {/* Profile Overview & The Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover-trigger hover:bg-white/10 transition-colors"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CircleDot className="w-6 h-6 text-emerald-400" />
              Profile Overview
            </h3>
            <p className="text-gray-400 leading-relaxed">
              As a versatile developer, I bridge the gap between technical infrastructure, web experiences, and community engagement. I specialize in building, optimizing, and leading high-performance server networks, full-stack web applications, and intelligent bots.
            </p>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover-trigger hover:bg-white/10 transition-colors"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-400" />
              The Vision
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Focused on growth, stability, and leadership. My goal is to engineer environments—whether web, game servers, or automated systems—where performance is invisible, allowing the community and user experience to take center stage.
            </p>
          </motion.section>
        </div>

        {/* Technical Expertise Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center">Technical Expertise</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERTISE.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover-trigger hover:bg-white/10 hover:border-emerald-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {exp.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{exp.title}</h4>
                <ul className="space-y-3">
                  {exp.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                      <ChevronRight className="w-4 h-4 text-emerald-500/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Servers Worked On */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 p-8 md:p-12 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl text-center hover-trigger"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Servers Worked On</h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {SERVERS.map((server, idx) => (
              <span key={idx} className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm md:text-base font-medium hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors cursor-default">
                {server}
              </span>
            ))}
            <span className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm md:text-base font-bold cursor-default">
              + 20 Additional Servers
            </span>
          </div>
        </motion.section>

        {/* Pillars & Success */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover-trigger hover:bg-white/10 transition-colors"
          >
            <h3 className="text-2xl font-bold mb-6">Professional Pillars</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/5 hover:border-emerald-500/30 transition-colors">
                  {pillar.icon}
                  <span className="font-medium text-sm">{pillar.title}</span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover-trigger hover:bg-white/10 transition-colors"
          >
            <h3 className="text-2xl font-bold mb-6">Proven Success</h3>
            <ul className="space-y-4">
              {SUCCESS_CHECKLIST.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* Dynamic Social / Community Cards */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12"
        >
          {communities.map((c) => {
            if (c.kind === 'discord_user') {
              const avatarUrl = lanyard?.discord_user?.avatar && lanyard.discord_user.id
                ? `https://cdn.discordapp.com/avatars/${lanyard.discord_user.id}/${lanyard.discord_user.avatar}.png?size=256`
                : undefined;
              const username = lanyard?.discord_user?.username ?? 'Unknown';
              const status = lanyard?.discord_status ?? 'offline';
              const spotify = lanyard?.listening_to_spotify && lanyard?.spotify
                ? `${lanyard.spotify.song} — ${lanyard.spotify.artist}`
                : null;
              const activities = (lanyard?.activities ?? []).map((a: any) => a.name).filter(Boolean).join(', ') || null;

              return (
                <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer"
                  className="relative group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover-trigger hover:bg-white/8 transition-all overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="avatar" className="w-14 h-14 rounded-full border border-white/10 object-cover" />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm">N/A</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate">
                        <div className="font-medium">AURTX</div>
                        <div className="text-xs text-gray-400 truncate opacity-0 group-hover:opacity-100 transition-opacity">{username}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className={cn("h-3 w-3 rounded-full", {
                          'bg-green-500': status === 'online',
                          'bg-yellow-500': status === 'idle',
                          'bg-red-500': status === 'dnd',
                          'bg-gray-500': status === 'offline'
                        } as any)} />
                      </div>
                    </div>

                    {spotify && <div className="mt-2 text-xs text-emerald-300 font-mono truncate">{spotify}</div>}
                    {(!spotify && status !== 'offline') && <div className="mt-2 text-xs text-gray-400 truncate">Status: {status}</div>}
                  </div>

                  <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-emerald-400">Open Discord Profile</span>
                  </div>
                </a>
              );
            }

            if (c.kind === 'community') {
              return (
                <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover-trigger hover:bg-purple-500/6 transition-all overflow-hidden"
                >
                  <div className="flex-shrink-0">
                    {c.logo ? (
                      <img src={c.logo} alt={c.title} className="w-14 h-14 rounded-lg object-cover border border-white/8" />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-white/6 flex items-center justify-center text-sm">{c.title[0]}</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-gray-400 truncate">{c.description}</div>
                  </div>

                  <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-purple-300">Join Community</span>
                  </div>
                </a>
              );
            }

            return (
              <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover-trigger hover:bg-white/10 transition-all overflow-hidden"
              >
                {c.icon ?? <MessageSquare className="w-5 h-5 group-hover:text-white transition-colors" />}
                <div className="flex flex-col">
                  <span className="font-medium">{c.title}</span>
                  {(c.username || c.displayName) && (
                    <span className="text-xs text-gray-400">@{c.username || c.displayName}</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white">Open</span>
                </div>
              </a>
            );
          })}
        </motion.footer>

        {/* end of dynamic social/community cards */}
      </div>
    </div>
  );
}
