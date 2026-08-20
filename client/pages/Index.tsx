import { useEffect, useState, useRef, type ReactNode } from "react";
import { ArrowUpRight, Menu, X, Play, Volume2, Monitor, Code, Database, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from "framer-motion";
import Lenis from "lenis";

const dealpostLogo = "https://cdn.builder.io/api/v1/image/assets%2F7ed07d18e9c74c61ae6c4e963ff0281d%2Fe77ecdba863d43509e2e5e0954c9337a?format=webp&width=800&height=1200";

// Custom theme colors based on guidelines
const theme = {
  primary: "#0E544C",
  secondary: "#126F65",
  accent: "#138F84",
  light: "#F3FAF7",
  white: "#FFFFFF",
  dark: "#061F1C"
};

// --- REUSABLE COMPONENTS ---

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        setCursorVariant(cursorTarget.getAttribute('data-cursor') || "hover");
      } else if (target.closest('button') || target.closest('a')) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as any,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "normal" as any,
    },
    explore: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: "rgba(19, 143, 132, 1)",
      mixBlendMode: "normal" as any,
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden md:flex items-center justify-center text-white font-bold text-[10px] tracking-widest text-center"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <AnimatePresence>
          {cursorVariant === 'explore' && (
            <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              EXPLORE
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function MagneticButton({ children, className = "", ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed right-0 top-0 bottom-0 w-2 md:w-3 z-[90] pointer-events-none flex flex-col justify-end">
      <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[8px] md:text-[10px] font-bold tracking-widest text-[#138F84] rotate-90 origin-right whitespace-nowrap opacity-50 mix-blend-difference hidden md:block">
        SCROLL PROGRESS
      </div>
      <motion.div
        className="w-full bg-[#138F84] origin-top"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLink({ id, children, className = "", onClick }: { id: string; children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        if (onClick) onClick();
      }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
}

// --- SECTIONS ---

function Loader() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0E544C]"
        >
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={dealpostLogo} 
            alt="Dealpost" 
            className="h-16 mb-8 filter brightness-0 invert" 
          />
          <div className="overflow-hidden h-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              className="text-white tracking-[0.3em] font-black uppercase text-xl"
            >
              Dealpost
            </motion.h1>
          </div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            className="h-[1px] bg-[var(--accent)] mt-6"
            style={{ backgroundColor: theme.accent }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  return (
    <section ref={containerRef} id="home" className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 lg:px-[58px] bg-[#061F1C] text-white overflow-hidden pt-20">
      {/* Background Grid Pattern */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-32 md:w-48 aspect-video bg-[#138F84]/20 rounded-lg border border-[#138F84]/50 backdrop-blur-sm hidden md:flex items-center justify-center pointer-events-none z-0"
      >
        <span className="text-[10px] font-bold tracking-widest uppercase text-[#138F84]">DASHBOARD</span>
      </motion.div>
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] left-[10%] w-24 md:w-32 aspect-square bg-[#0E544C]/40 rounded-full border border-[#138F84]/30 backdrop-blur-sm hidden md:flex items-center justify-center pointer-events-none z-0"
      >
        <span className="text-[8px] font-bold tracking-widest uppercase text-white/50 text-center">BRAND<br/>IDENTITY</span>
      </motion.div>

      <div className="max-w-[1600px] mx-auto w-full relative z-10 flex flex-col items-start gap-12 mt-12 md:mt-24">
        <Reveal delay={0.1}>
          <div className="inline-block border border-[rgba(255,255,255,0.2)] px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
            INTERACTIVE DIGITAL EXPERIENCE
          </div>
        </Reveal>
        
        <div className="flex flex-col uppercase">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="text-7xl md:text-9xl lg:text-[140px] font-black tracking-tighter leading-[0.85] text-white"
            >
              WE BUILD
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-center gap-6">
            <motion.h1 
              initial={{ y: "100%", clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
              animate={{ y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="text-7xl md:text-9xl lg:text-[140px] font-black tracking-tighter leading-[0.85] text-[#138F84]"
            >
              BRANDS
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
              className="text-7xl md:text-9xl lg:text-[140px] font-black tracking-tighter leading-[0.85] text-white italic pr-4"
            >
              THAT MOVE.
            </motion.h1>
          </div>
        </div>

        <motion.div style={{ opacity }} className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mt-12 gap-12">
          <Reveal delay={1.4} className="max-w-md">
            <p className="text-sm md:text-base font-bold opacity-70 leading-relaxed">
              We are a creative studio, digital product lab, and performance marketing powerhouse united in one connected ecosystem.
            </p>
          </Reveal>
          
          <Reveal delay={1.5}>
            <MagneticButton 
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#138F84] text-[#061F1C] px-10 py-6 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-4 hover:bg-white transition-colors duration-300"
            >
              EXPLORE OUR WORLD <ArrowUpRight size={16} />
            </MagneticButton>
          </Reveal>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-[58px] flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-bold tracking-widest uppercase opacity-50 rotate-90 mb-6">SCROLL</span>
        <motion.div 
          animate={{ height: [0, 40, 0], y: [0, 0, 40] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-white opacity-30"
        />
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section id="about" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#F3FAF7] text-[#061F1C]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-[#126F65] mb-20 border-b border-[rgba(14,84,76,0.1)] pb-4">
          <span>01 / DEALPOST</span>
          <span>WHO WE ARE</span>
        </div>
        
        <Reveal>
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.9] mb-24">
            GREAT DESIGN<br />
            HAS CREATIVITY<br />
            <em className="text-[#138F84] not-italic">AND STRATEGY.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          <Reveal delay={0.2}>
            <p className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
              At Dealpost, creativity isn't created in isolation.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-col gap-8 text-lg opacity-80 font-medium">
            <p>
              We combine ideas, design, technology, content and strategy to create experiences that people notice, remember and act on.
            </p>
            <p>
              From the first concept to the final campaign, we bring the thinking and execution together. Good ideas deserve great execution.
            </p>
            <div className="mt-8 p-8 bg-white rounded-2xl shadow-sm border border-[rgba(14,84,76,0.05)]">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#138F84] mb-4">THE DIFFERENCE</h4>
              <strong className="text-xl font-black tracking-tight leading-snug block">ONE PARTNER.<br/>MULTIPLE CAPABILITIES.<br/>ONE CLEAR DIRECTION.</strong>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const steps = [
    "BRAND", "CONTENT", "SOCIAL", "CAMPAIGNS", "PERFORMANCE", "DIGITAL", "TECHNOLOGY", "SPACE", "GROWTH"
  ];
  
  return (
    <section id="services" className="py-40 overflow-hidden bg-[#061F1C] text-white relative">
      <div className="px-6 md:px-10 lg:px-[58px] mb-24 max-w-[1400px] mx-auto">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">02 / WHAT WE DO</span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mt-4 leading-none">
            WE DON'T JUST<br />PROVIDE SERVICES.
          </h2>
          <p className="text-2xl md:text-4xl font-bold text-[#138F84] mt-8 tracking-tight">WE BUILD THE SYSTEM AROUND YOUR BRAND.</p>
        </Reveal>
      </div>

      <div className="relative flex flex-nowrap items-center w-[200vw] md:w-auto overflow-x-auto pb-12 hide-scrollbar px-6 md:px-10 lg:px-[58px] gap-8 md:gap-16">
        {steps.map((step, i) => (
          <Reveal key={step} delay={i * 0.1} className="flex-shrink-0 flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-[#138F84] mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-[#138F84] animate-ping opacity-50" />
              </div>
              <strong className="text-2xl md:text-4xl lg:text-6xl font-black tracking-tighter uppercase">{step}</strong>
            </div>
            {i !== steps.length - 1 && (
              <div className="h-[2px] w-16 md:w-32 bg-gradient-to-r from-[#138F84] to-transparent mx-4 md:mx-8 opacity-50" />
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Performance() {
  return (
    <section id="performance" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#0E544C] text-white">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-16">
            ATTENTION<br />
            IS GOOD.<br />
            <em className="text-[#138F84] not-italic">PERFORMANCE<br />IS BETTER.</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.2} className="text-lg opacity-90 font-medium">
            <p className="mb-6">Creative gets attention. Performance marketing turns that attention into measurable action.</p>
            <p>We build campaigns around the complete journey — from audience discovery and creative testing to clicks, leads, conversions and optimisation.</p>
            
            <div className="mt-12 flex flex-wrap gap-4">
              {['Meta Advertising', 'Google Ads', 'Conversion Campaigns', 'Retargeting', 'Analytics'].map(s => (
                <span key={s} className="px-6 py-3 rounded-full border border-[rgba(255,255,255,0.2)] text-xs font-bold uppercase tracking-widest">{s}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4} className="relative">
            <div className="bg-[#061F1C] p-8 rounded-3xl border border-[rgba(255,255,255,0.1)] shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 right-6 text-[8px] uppercase tracking-widest text-[#138F84] font-bold opacity-60">ILLUSTRATIVE DASHBOARD</div>
              
              <div className="flex items-center gap-4 mb-8 border-b border-[rgba(255,255,255,0.05)] pb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-bold tracking-widest opacity-50 ml-4">CAMPAIGN_COMMAND_CENTER</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: "REACH", value: "2.4M", trend: "+14%" },
                  { label: "CLICKS", value: "84K", trend: "+22%" },
                  { label: "LEADS", value: "1,240", trend: "+8%" },
                  { label: "CONVERSIONS", value: "312", trend: "+45%" },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex flex-col"
                  >
                    <span className="text-[10px] uppercase font-bold opacity-60 tracking-widest mb-2">{stat.label}</span>
                    <strong className="text-3xl font-black tracking-tight">{stat.value}</strong>
                    <span className="text-[10px] font-bold text-[#138F84] mt-1">{stat.trend}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 h-32 w-full flex items-end gap-2">
                {[40, 60, 45, 80, 55, 90, 75, 100, 85, 120].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.8 + i * 0.05, ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-[#138F84] to-[#126F65] rounded-t-sm opacity-80"
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SocialFeed() {
  return (
    <section id="social" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#F3FAF7] text-[#061F1C] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#126F65]">03 / SOCIAL MEDIA</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4 mb-16">
            YOUR BRAND<br />DESERVES A FEED<br />
            <em className="text-[#138F84] not-italic">WORTH FOLLOWING.</em>
          </h2>
        </Reveal>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-[40%] flex flex-col gap-6 font-medium text-lg opacity-80">
            <p>Social isn't just about posting. It's about building a recognisable voice, creating content people want to engage with and turning attention into meaningful action.</p>
            <p>We plan, create, publish, manage and optimise social content around your brand and business goals.</p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest"><div className="w-2 h-2 bg-[#138F84]" /> CONTENT STRATEGY</div>
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest"><div className="w-2 h-2 bg-[#138F84]" /> SHORT-FORM VIDEO / REELS</div>
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest"><div className="w-2 h-2 bg-[#138F84]" /> COMMUNITY MANAGEMENT</div>
            </div>
          </div>
          
          <div className="w-full lg:w-[60%] relative h-[600px] flex justify-center items-center">
            {/* Fake Dealpost Social Post */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-[340px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(14,84,76,0.15)] border border-[rgba(14,84,76,0.05)] overflow-hidden z-20 absolute"
            >
              <div className="p-4 flex items-center gap-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-full bg-[#0E544C] flex items-center justify-center p-2">
                  <img src={dealpostLogo} alt="DP" className="filter brightness-0 invert object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold">Dealpost</span>
                  <span className="text-[9px] uppercase tracking-widest opacity-50">Creative Studio</span>
                </div>
              </div>
              <div className="aspect-[4/5] bg-[#0E544C] relative flex items-center justify-center p-8 overflow-hidden group">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-[#126F65] to-[#061F1C]" 
                />
                <h3 className="relative z-10 text-white text-4xl font-black tracking-tighter leading-none text-center">
                  DESIGN<br />THAT WORKS<br />BEYOND<br />THE FEED.
                </h3>
              </div>
              <div className="p-4 flex justify-between items-center bg-gray-50">
                <div className="flex gap-4 font-bold text-xs opacity-70">
                  <span>♡ 12.8K</span>
                  <span>💬 438</span>
                </div>
                <span className="text-[10px] font-bold text-[#138F84] uppercase tracking-widest flex items-center gap-1">
                  REACH ↗ 1.2M
                </span>
              </div>
            </motion.div>
            
            {/* Background elements */}
            <motion.div 
              animate={{ y: [20, -20, 20], rotate: -5 }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-[300px] h-[400px] bg-[#126F65] rounded-3xl absolute -left-10 opacity-20 blur-sm z-10"
            />
            <motion.div 
              animate={{ y: [-20, 20, -20], rotate: 5 }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-[300px] h-[400px] bg-[#138F84] rounded-3xl absolute -right-10 opacity-20 blur-sm z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="technology" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#061F1C] text-white">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">04 / TECHNOLOGY</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4 mb-16">
            WE DON'T JUST<br />DESIGN SOFTWARE.<br />
            <em className="text-[#138F84] not-italic">WE BUILD IT.</em>
          </h2>
        </Reveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal delay={0.2} className="relative h-[400px] flex items-center">
            {/* Tech Assembly Animation */}
            <div className="flex flex-col gap-4 text-2xl font-black tracking-tighter w-full">
              {[
                { name: "IDEA", icon: <Monitor size={20} /> },
                { name: "DESIGN", icon: <Layout size={20} /> },
                { name: "FRONTEND", icon: <Code size={20} /> },
                { name: "BACKEND", icon: <Database size={20} /> }
              ].map((step, i) => (
                <motion.div 
                  key={step.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.2 }}
                  className="flex items-center gap-6"
                >
                  <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#138F84]">
                    {step.icon}
                  </div>
                  <span>{step.name}</span>
                  {i !== 3 && <div className="flex-1 h-[1px] bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-transparent" />}
                </motion.div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.4} className="flex flex-col justify-center">
            <p className="text-xl font-medium opacity-80 mb-10">
              From internal business tools to complete digital platforms, we design and develop software around real business workflows.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                "Web Applications", "CMS Development", "API Integration", "Database Systems", 
                "E-commerce", "Admin Dashboards", "UI/UX Design", "Cloud Platforms"
              ].map(s => (
                <div key={s} className="flex flex-col border-b border-[rgba(255,255,255,0.1)] pb-4">
                  <span className="text-sm font-bold uppercase tracking-widest">{s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Podcast() {
  return (
    <section className="py-32 px-6 md:px-10 lg:px-[58px] bg-white text-[#061F1C] overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">05 / MEDIA</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4 mb-8">
            CONVERSATIONS<br />
            WORTH<br />
            LISTENING TO.
          </h2>
          <p className="max-w-xl mx-auto text-lg font-medium opacity-70 mb-16">
            From the first conversation to the final clip, we help turn ideas and expertise into engaging audio and video content.
          </p>
        </Reveal>
        
        {/* Waveform Animation */}
        <div className="flex items-center justify-center gap-1 h-32">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
              className="w-2 md:w-3 bg-[#0E544C] rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "Performance Marketing", message: "" });
  
  return (
    <section id="contact" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#0E544C] text-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Reveal>
            <h2 className="text-6xl md:text-[100px] font-black tracking-tighter leading-none mb-8">
              READY TO<br />BUILD<br /><em className="text-[#138F84] not-italic">SOMETHING<br />BIGGER?</em>
            </h2>
            <p className="text-xl font-medium opacity-80 mb-12">Tell us what you're building, launching or trying to grow.</p>
            
            <div className="space-y-6">
              <div>
                <strong className="text-[10px] uppercase tracking-widest font-bold opacity-50 block mb-2">EMAIL</strong>
                <a href="mailto:hello@dealpost.co.in" className="text-2xl font-bold hover:text-[#138F84] transition-colors">hello@dealpost.co.in</a>
              </div>
              <div>
                <strong className="text-[10px] uppercase tracking-widest font-bold opacity-50 block mb-2">PHONE</strong>
                <a href="tel:+918015004952" className="text-2xl font-bold hover:text-[#138F84] transition-colors">+91 8015004952</a>
              </div>
            </div>
          </Reveal>
        </div>
        
        <Reveal delay={0.2} className="bg-[#061F1C] p-10 md:p-16 rounded-[40px] border border-[rgba(255,255,255,0.05)]">
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Name</span>
                <input type="text" className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Email</span>
                <input type="email" className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold" />
              </label>
            </div>
            
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">What do you need?</span>
              <select className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold appearance-none cursor-pointer">
                <option value="Branding" className="bg-[#061F1C]">Branding</option>
                <option value="Social Media" className="bg-[#061F1C]">Social Media</option>
                <option value="Performance Marketing" className="bg-[#061F1C]">Performance Marketing</option>
                <option value="Website" className="bg-[#061F1C]">Website Development</option>
                <option value="Software" className="bg-[#061F1C]">Software Development</option>
                <option value="Podcast" className="bg-[#061F1C]">Podcast & Media</option>
                <option value="Interiors" className="bg-[#061F1C]">Interior Design</option>
              </select>
            </label>
            
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Message</span>
              <textarea rows={3} className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold resize-none" />
            </label>
            
            <button className="mt-8 bg-[#138F84] text-[#061F1C] py-6 px-10 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-between hover:bg-white transition-colors w-full group">
              START A CONVERSATION <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-8"}`}>
        <div className={`mx-6 md:mx-10 lg:mx-[58px] flex items-center justify-between transition-all duration-500 ${scrolled ? "bg-[rgba(6,31,28,0.85)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] px-8 py-4 rounded-full" : ""}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#138F84] flex items-center justify-center p-2">
              <img src={dealpostLogo} alt="DP" className="filter brightness-0 invert object-contain" />
            </div>
            <span className="text-white font-black tracking-widest uppercase text-sm">DEALPOST</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase font-bold tracking-widest text-white opacity-80">
            <SectionLink id="about" className="hover:text-[#138F84] transition-colors">About</SectionLink>
            <SectionLink id="services" className="hover:text-[#138F84] transition-colors">Services</SectionLink>
            <SectionLink id="performance" className="hover:text-[#138F84] transition-colors">Performance</SectionLink>
            <SectionLink id="technology" className="hover:text-[#138F84] transition-colors">Tech</SectionLink>
            <SectionLink id="contact" className="hover:text-white text-[#138F84] transition-colors">Let's Talk →</SectionLink>
          </nav>
          
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0E544C] flex flex-col justify-center px-10"
          >
            <nav className="flex flex-col gap-8 text-3xl font-black uppercase tracking-tighter text-white">
              <SectionLink id="home" onClick={() => setMenuOpen(false)}>Home</SectionLink>
              <SectionLink id="about" onClick={() => setMenuOpen(false)}>About</SectionLink>
              <SectionLink id="services" onClick={() => setMenuOpen(false)}>Services</SectionLink>
              <SectionLink id="performance" onClick={() => setMenuOpen(false)}>Performance</SectionLink>
              <SectionLink id="social" onClick={() => setMenuOpen(false)}>Social</SectionLink>
              <SectionLink id="technology" onClick={() => setMenuOpen(false)}>Technology</SectionLink>
              <SectionLink id="contact" className="text-[#138F84]" onClick={() => setMenuOpen(false)}>Let's Talk</SectionLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-[#061F1C] text-white py-16 px-6 md:px-10 lg:px-[58px] border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 opacity-50">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1.5">
              <img src={dealpostLogo} alt="DP" className="filter object-contain" />
            </div>
            <span className="font-black tracking-widest uppercase text-xs">DEALPOST</span>
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">CREATIVITY × STRATEGY × TECHNOLOGY</p>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase opacity-50">
          <a href="https://dealpost.co.in" className="hover:opacity-100 transition-opacity">dealpost.co.in</a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

function Projects() {
  const projects = [
    { title: "TIDEL", category: "REBRANDING / BRAND IDENTITY", desc: "Monogram, Wordmark, Business Cards, Signage, Digital Display, Uniform, Stationery, ID cards", image: "/project7.png", featured: true },
    { title: "CHENNAI AEROSPACE PARK", category: "BRAND IDENTITY", desc: "Logo, Monogram, Wordmark, Brand system, Applications", image: "/project2.png", featured: true },
    { title: "TAMIL NADU TOURISM", category: "BRAND IDENTITY / COMMUNICATION", desc: "Sketches, Logo concepts, Identity, Applications, Campaign work", image: "/project3.png", featured: true },
    { title: "MADURAI SMART CITY", category: "PROJECT COMMUNICATION", desc: "Brand Identity, Strategy, Applications", image: "/project14.png", featured: true },
    { title: "KINGSFORD", category: "BRANDING & DIGITAL", desc: "Branding, Brochure, Marketing, Campaign, Website, Digital experience", image: "/project8.png", featured: false },
    { title: "VALENCIA", category: "IDENTITY & MARKETING", desc: "Identity, Fingerprint/heart concept, Brochure, Marketing collateral", image: "/project10.png", featured: false },
    { title: "KOVAI KONGU MESS", category: "RESTAURANT BRANDING", desc: "Logo design, Mascot, Brand colors", image: "/project1.png", featured: false },
    { title: "FOODBAE", category: "RESTAURANT BRANDING", desc: "Logo, Packaging, Marketing Collateral", image: "/project4.png", featured: false },
    { title: "ARENA SPORTS & RESORT", category: "LEISURE BRANDING", desc: "Visual identity, Resort branding", image: "/project5.jpeg", featured: false },
    { title: "CANVASWORKSPACE", category: "SOFTWARE BRANDING", desc: "Logo, Identity system, UI design", image: "/project6.png", featured: false },
    { title: "LUX", category: "BRAND COMMUNICATION", desc: "Logo, Application, Typography", image: "/project9.png", featured: false },
    { title: "NANO HOSPITALS", category: "HEALTHCARE BRANDING", desc: "Logo, Identity System", image: "/project11.png", featured: false },
  ];

  return (
    <section id="work" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#F3FAF7] text-[#061F1C] overflow-hidden">
      <div className="max-w-[1400px] mx-auto mb-20">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#126F65]">10 / SELECTED WORK</span>
          <h2 className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.85] mt-4 mb-8">
            PROOF<br />
            IS IN THE<br />
            <em className="text-[#138F84] not-italic">WORK.</em>
          </h2>
        </Reveal>
      </div>

      <div className="relative flex flex-nowrap items-center w-[400vw] md:w-auto overflow-x-auto pb-12 hide-scrollbar px-6 md:px-10 lg:px-[58px] gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={project.title}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`flex-shrink-0 ${project.featured ? 'w-[400px] md:w-[650px]' : 'w-[300px] md:w-[450px]'} group cursor-pointer`}
          >
            <div className={`aspect-[4/5] rounded-[30px] p-8 flex flex-col justify-between mb-8 shadow-md transition-all duration-500 group-hover:-translate-y-4 relative overflow-hidden bg-[#0E544C] ${project.featured ? 'ring-4 ring-[#138F84] shadow-[0_0_40px_rgba(19,143,132,0.3)]' : ''}`}>
              <div className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${project.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061F1C] via-[#061F1C]/40 to-transparent opacity-90" />
              <div className="relative z-10 flex justify-between items-start text-white">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${project.featured ? 'px-3 py-1 bg-[#138F84] rounded-full' : 'opacity-90'}`}>
                  {project.featured ? '⭐ FLAGSHIP CASE STUDY' : 'CASE STUDY'}
                </span>
                <ArrowUpRight size={project.featured ? 32 : 24} className={`opacity-0 group-hover:opacity-100 transition-opacity ${project.featured ? 'text-white' : 'text-[#138F84]'}`} />
              </div>
              <div className="relative z-10 text-white">
                <h3 className={`${project.featured ? 'text-4xl md:text-7xl' : 'text-3xl md:text-5xl'} font-black tracking-tighter leading-none mb-4 uppercase drop-shadow-lg`}>{project.title}</h3>
                <div className={`text-[10px] md:text-xs uppercase font-bold tracking-widest ${project.featured ? 'text-white' : 'text-[#138F84]'} mb-2`}>{project.category}</div>
                <p className={`${project.featured ? 'text-base opacity-100' : 'text-sm opacity-80'} font-medium`}>{project.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Clients() {
  const clientsData = [
    { name: "TIDEL", type: "Technology Park", image: "/project7.png" },
    { name: "CHENNAI AEROSPACE PARK", type: "Government", image: "/project2.png" },
    { name: "MADURAI CORPORATION", type: "Government", image: "/project14.png" },
    { name: "MADURAI SMART CITY", type: "Government", image: "/project15.png" },
    { name: "TAMIL NADU TOURISM (TTDC)", type: "Government / Tourism", image: "/project3.png" },
    { name: "Kovai Kongu Mess", type: "Restaurant / Hospitality", image: "/project1.png" },
    { name: "FOODBAE", type: "Food & Beverage", image: "/project4.png" },
    { name: "Arena Sports & Resort", type: "Sports & Leisure", image: "/project5.jpeg" },
    { name: "CanvasWorkspace", type: "Software & Technology", image: "/project6.png" },
    { name: "Suraksha Group", type: "Real Estate", image: "/project8.png" },
    { name: "Lux", type: "Fashion & Lifestyle", image: "/project9.png" },
    { name: "Sri Mahalaxmi Jewellers", type: "Retail & Jewelry", image: "/project10.png" },
    { name: "Nano Hospitals", type: "Healthcare", image: "/project11.png" },
    { name: "Regal Hospital", type: "Healthcare", image: "/project12.png" },
    { name: "SST Global", type: "Corporate / Logistics", image: "/project13.png" },
    { name: "eterneD", type: "Retail & Jewelry", image: "/project16.png" },
    { name: "PEEPAI Brewery & Kitchen", type: "Food & Beverage", image: "/project17.png" },
    { name: "m5 Ecity", type: "Real Estate", image: "/project18.png" },
    { name: "ATHLETEFIT", type: "Health & Fitness", image: "/project19.png" },
    { name: "ACTS School", type: "Education", image: "/project20.png" },
    { name: "INDIQUBE", type: "Workspace & Corporate", image: "/project21.png" },
    { name: "Nandus", type: "Retail & FMCG", image: "/project22.png" },
    { name: "Supertails", type: "Retail & E-commerce", image: "/project23.png" },
    { name: "Hillrock National Public School", type: "Education", image: "/project24.png" },
    { name: "Raj Fashion Academy", type: "Education", image: "/project25.png" }
  ];

  return (
    <section id="clients" className="py-32 px-6 md:px-10 lg:px-[58px] bg-white text-[#061F1C]">
      <div className="max-w-[1400px] mx-auto">
        <Reveal className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">11 / CLIENTS</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mt-4">
            BUILT WITH<br />
            BRANDS THAT<br />
            THINK FORWARD.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {clientsData.map((client, i) => (
            <Reveal key={client.name} delay={i * 0.05} className="group cursor-pointer">
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-[#F3FAF7] flex flex-col justify-end p-4 border border-[rgba(14,84,76,0.1)] shadow-sm group-hover:border-[#138F84] transition-colors">
                <div className="absolute inset-0 bg-cover bg-center opacity-100 transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${client.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061F1C] via-transparent to-transparent opacity-70" />
                <div className="relative z-10 text-white">
                  <h4 className="font-black text-sm md:text-base leading-tight uppercase tracking-tight drop-shadow-md">{client.name}</h4>
                  <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                    <span className="text-[8px] font-bold tracking-widest mt-2 block text-[#138F84] uppercase drop-shadow-md">{client.type}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#126F65] text-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">12 / THE PERSON BEHIND THE VISION</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-8 mb-12 uppercase">
            BUILDING<br />
            A COMPANY<br />
            WHERE<br />
            CREATIVITY<br />
            MEETS<br />
            <em className="text-[#138F84] not-italic">EXECUTION.</em>
          </h2>
          <div className="flex items-center gap-6 border-t border-[rgba(255,255,255,0.1)] pt-8">
            <div className="w-16 h-16 rounded-full bg-[#061F1C] flex items-center justify-center font-black text-2xl tracking-tighter border border-[rgba(255,255,255,0.05)]">
              HJ
            </div>
            <div>
              <strong className="block text-xl font-black tracking-widest uppercase">HARIHARAN J V</strong>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">FOUNDER — DEALPOST</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.3} className="bg-[#061F1C] p-12 md:p-16 rounded-[40px] border border-[rgba(255,255,255,0.05)] relative overflow-hidden">
          <div className="text-[120px] font-black text-[#138F84] opacity-20 absolute -top-10 -left-4 leading-none">"</div>
          <p className="text-2xl md:text-4xl font-bold tracking-tight leading-tight relative z-10">
            Great ideas are only valuable when they can be turned into something people see, feel, use and remember.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Index() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="bg-[#0E544C] min-h-screen selection:bg-[#138F84] selection:text-white cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <Loader />
      <Navigation />
      <Hero />
      <Intro />
      <Ecosystem />
      <Performance />
      <SocialFeed />
      <Technology />
      <Podcast />
      <Projects />
      <Clients />
      <Founder />
      <Contact />
      <Footer />
    </main>
  );
}
