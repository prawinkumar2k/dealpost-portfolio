import { useEffect, useState, useRef, type ReactNode } from "react";
import { ArrowUpRight, Menu, X, Play, Volume2, Monitor, Code, Database, Layout, Zap, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from "framer-motion";
import Lenis from "lenis";

const dealpostLogo = "/pdf_img_1.jpeg";

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
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, y: "-100%", scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#061F1C] overflow-hidden"
        >
          {/* Geometric Expansion */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: [0, 1, 50], opacity: [0, 1, 0], rotate: [0, 45, 90] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute w-32 h-32 border border-[#138F84]/50 pointer-events-none"
          />

          <motion.img 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1.2], filter: ["blur(10px)", "blur(0px)", "blur(10px)"] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            src={dealpostLogo} 
            alt="Dealpost" 
            className="absolute h-16 filter brightness-0 invert" 
          />
          
          <div className="absolute flex flex-col items-center justify-center text-white font-black uppercase tracking-[0.3em] text-2xl md:text-5xl drop-shadow-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: [0, 1, 0], y: [20, 0, -20], filter: ["blur(5px)", "blur(0px)", "blur(5px)"] }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute whitespace-nowrap"
            >
              CREATIVE
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: [0, 1, 0], y: [20, 0, -20], filter: ["blur(5px)", "blur(0px)", "blur(5px)"] }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute whitespace-nowrap text-[#138F84]"
            >
              MARKETING
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: [0, 1, 0], y: [20, 0, -20], filter: ["blur(5px)", "blur(0px)", "blur(5px)"] }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="absolute whitespace-nowrap"
            >
              TECHNOLOGY
            </motion.span>
          </div>
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

      {/* Floating Elements / Parallax Images */}
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 800], [0, -100]) }}
        animate={{ y: [-15, 15, -15], rotate: [0, 3, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[5%] lg:right-[15%] w-40 md:w-64 aspect-video rounded-xl overflow-hidden shadow-2xl hidden md:block z-0 pointer-events-none opacity-40 border border-[#138F84]/20"
      >
        <img src="/project7.png" alt="Tidel" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#061F1C]/40 mix-blend-multiply" />
      </motion.div>
      
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 800], [0, -200]) }}
        animate={{ y: [20, -20, 20], rotate: [0, -4, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] left-[5%] lg:left-[10%] w-32 md:w-48 aspect-square rounded-2xl overflow-hidden shadow-2xl hidden md:block z-0 pointer-events-none opacity-30 border border-[#138F84]/20"
      >
        <img src="/project2.png" alt="Aerospace" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#061F1C]/40 mix-blend-multiply" />
      </motion.div>

      <motion.div 
        style={{ y: useTransform(scrollY, [0, 800], [0, 150]) }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }} 
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[60%] right-[25%] w-24 h-24 border border-[#138F84]/30 rounded-full hidden lg:block z-0 pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 800], [0, 100]) }}
        className="absolute top-[40%] left-[30%] w-16 h-16 border border-white/10 rotate-45 hidden lg:block z-0 pointer-events-none"
      />

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

function BrandingTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const steps = [
    { label: "BLANK CANVAS", icon: <Layout size={24} /> },
    { label: "LOGO", icon: <Code size={24} /> },
    { label: "COLOUR", icon: <Play size={24} /> },
    { label: "TYPOGRAPHY", icon: <Menu size={24} /> },
    { label: "STATIONERY", icon: <Database size={24} /> },
    { label: "PACKAGING", icon: <Monitor size={24} /> },
    { label: "SOCIAL POST", icon: <Share2 size={24} /> },
    { label: "SIGNAGE", icon: <Monitor size={24} /> },
    { label: "COMPLETE BRAND", icon: <Zap size={24} /> }
  ];

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#F3FAF7] text-[#061F1C] relative overflow-hidden min-h-[120vh] flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full">
        
        <div className="flex flex-col lg:flex-row gap-16 items-center justify-between mb-24">
          <Reveal className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#126F65]">01 / BRANDING</span>
            <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter leading-[0.9] mt-4 mb-8">
              MAKE YOUR BRAND<br />
              <em className="text-[#138F84] not-italic">RECOGNISABLE.</em>
            </h2>
            <p className="text-xl md:text-3xl font-bold tracking-tight leading-tight opacity-80">
              A brand is more than a logo.
            </p>
            <p className="text-lg opacity-70 font-medium mt-6 max-w-xl">
              We create visual systems that keep a business consistent across print, digital, social media, packaging, advertising, spaces and customer touchpoints.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="hidden lg:grid grid-cols-2 gap-x-12 gap-y-4 text-sm font-bold tracking-widest uppercase opacity-60">
            <span>Brand Strategy</span>
            <span>Logo Design</span>
            <span>Corporate Identity</span>
            <span>Brand Guidelines</span>
            <span>Typography</span>
            <span>Colour Systems</span>
            <span>Packaging</span>
            <span>Marketing Collateral</span>
          </Reveal>
        </div>

        {/* The Animated Branding Journey */}
        <div className="relative w-full bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden border border-[#138F84]/10 h-[500px] flex items-center justify-center">
          
          <div className="absolute top-10 left-10 text-[10px] uppercase font-bold tracking-widest text-[#138F84]">
            BRAND CONSTRUCTION SEQUENCE
          </div>

          {/* Central Animated Element */}
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            <AnimatePresence>
              {steps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], rotate: [-10, 0, 10] }}
                  viewport={{ once: true, margin: "-200px" }}
                  transition={{ 
                    duration: 2, 
                    delay: 0.5 + index * 1.5,
                    times: [0, 0.5, 1],
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#F3FAF7] rounded-3xl shadow-xl border border-[#138F84]/20"
                >
                  <div className="w-16 h-16 rounded-full bg-[#061F1C] text-white flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black tracking-tight uppercase text-[#061F1C]">
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Final State */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ delay: 0.5 + steps.length * 1.5, duration: 1, type: "spring" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#061F1C] text-white rounded-3xl shadow-2xl ring-4 ring-[#138F84]"
            >
              <div className="w-24 h-24 rounded-full bg-white border-4 border-[#138F84] shadow-[0_0_30px_rgba(19,143,132,0.5)] overflow-hidden flex items-center justify-center mb-6 animate-pulse">
                <img src={dealpostLogo} alt="DP" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <span className="text-3xl font-black tracking-tight uppercase">
                COMPLETE<br/>BRAND
              </span>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#138F84] rounded-full opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#126F65] rounded-full opacity-5 blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const nodes = [
    { id: "brand", label: "BRAND", x: -30, y: -30, details: ["Strategy", "Identity", "Guidelines"] },
    { id: "social", label: "SOCIAL", x: 30, y: -30, details: ["Instagram", "LinkedIn", "Reels"] },
    { id: "performance", label: "PERFORMANCE", x: -40, y: 0, details: ["Ads", "PPC", "Analytics"] },
    { id: "digital", label: "DIGITAL", x: 40, y: 0, details: ["Websites", "UI/UX", "Apps"] },
    { id: "content", label: "CONTENT", x: -30, y: 30, details: ["Copy", "Video", "Photo"] },
    { id: "software", label: "SOFTWARE", x: 30, y: 30, details: ["Dashboards", "CMS", "API"] }
  ];

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <section ref={containerRef} id="services" className="py-32 px-6 md:px-10 lg:px-[58px] bg-white text-[#061F1C] min-h-[120vh] flex flex-col justify-center relative overflow-hidden">
      <Reveal className="text-center mb-24 relative z-20">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">02 / ECOSYSTEM</span>
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4 uppercase">
          One Connected<br />System.
        </h2>
      </Reveal>

      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full max-w-[800px] aspect-square md:aspect-video mx-auto flex items-center justify-center mt-12"
      >
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="-50 -50 100 100" preserveAspectRatio="none">
          {nodes.map((node, i) => (
            <motion.line
              key={`line-${node.id}`}
              x1="0" y1="0"
              x2={node.x} y2={node.y}
              stroke="#0E544C"
              strokeWidth="0.5"
              strokeDasharray="1 1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
        </svg>

        {/* Center Node */}
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute z-20 w-32 h-32 md:w-40 md:h-40 bg-[#0E544C] rounded-full flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer hover:scale-110 transition-transform"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-white font-black tracking-widest uppercase text-xs md:text-sm">DEALPOST</span>
        </motion.div>

        {/* Orbiting Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            whileInView={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 + i * 0.1 }}
            className="absolute group z-10"
            style={{ left: `calc(50% + ${node.x}%)`, top: `calc(50% + ${node.y}%)` }}
            onClick={() => {
              let type = 'Branding';
              if (node.label === 'SOCIAL') type = 'Social Media';
              if (node.label === 'PERFORMANCE') type = 'Performance Marketing';
              if (node.label === 'DIGITAL') type = 'Website Development';
              if (node.label === 'SOFTWARE') type = 'Software Development';
              window.dispatchEvent(new CustomEvent('dealpost-contact', { detail: { type } }));
            }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-[#138F84]/20 transition-all duration-300 group-hover:scale-110 group-hover:border-[#138F84] group-hover:shadow-[0_0_30px_rgba(19,143,132,0.2)] cursor-pointer">
              <span className="font-black text-[10px] md:text-xs tracking-widest text-[#061F1C] group-hover:text-[#138F84] transition-colors">{node.label}</span>
            </div>
            
            {/* Hover Details Popup */}
            <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none bg-[#061F1C] text-white p-4 rounded-xl whitespace-nowrap z-30 shadow-2xl">
              <div className="flex flex-col gap-2">
                {node.details.map(detail => (
                  <span key={detail} className="text-[10px] font-bold uppercase tracking-widest opacity-80 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#138F84] rounded-full" /> {detail}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function DealpostEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const steps = [
    "STRATEGY", "CREATIVE", "CONTENT", "DISTRIBUTION", 
    "PERFORMANCE", "DATA", "TECHNOLOGY", "OPTIMISATION", "GROWTH"
  ];

  return (
    <section ref={containerRef} id="engine" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#0E544C] text-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">03 / THE ENGINE</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-24 mt-4">
            ONE<br />
            CONNECTED<br />
            <em className="text-[#138F84] not-italic">SYSTEM.</em>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15, type: "spring" }}
                className="bg-[#061F1C] border border-[#138F84]/30 px-8 py-6 rounded-2xl w-full md:w-1/2 flex justify-between items-center group cursor-pointer hover:bg-white hover:text-[#061F1C] transition-colors duration-500"
                data-cursor="hover"
                onClick={() => {
                  let type = 'Branding';
                  if (step === 'PERFORMANCE' || step === 'DATA' || step === 'GROWTH') type = 'Performance Marketing';
                  if (step === 'TECHNOLOGY') type = 'Software Development';
                  if (step === 'CONTENT') type = 'Social Media';
                  window.dispatchEvent(new CustomEvent('dealpost-contact', { detail: { type } }));
                }}
              >
                <span className="text-2xl font-black tracking-tight">{step}</span>
                <div className="w-2 h-2 rounded-full bg-[#138F84] group-hover:scale-150 transition-transform" />
              </motion.div>
              
              {i < steps.length - 1 && (
                <div className="hidden md:flex flex-1 items-center">
                  <motion.div 
                    className="h-[2px] bg-gradient-to-r from-[#138F84] to-transparent w-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: i * 0.15 + 0.3 }}
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.2, delay: i * 0.15 + 1.2 }}
                  >
                    <ArrowUpRight className="text-[#138F84] rotate-45" size={24} />
                  </motion.div>
                </div>
              )}
              
              {/* Mobile Arrow */}
              {i < steps.length - 1 && (
                <motion.div 
                  className="md:hidden w-[2px] h-8 bg-gradient-to-b from-[#138F84] to-transparent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentMultiplication() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const cards = [
    { label: "INSTAGRAM REEL", rotate: -10, x: -150, y: -50, zIndex: 10, scale: 0.9 },
    { label: "LINKEDIN POST", rotate: 5, x: 150, y: -80, zIndex: 8, scale: 0.85 },
    { label: "YOUTUBE SHORT", rotate: -5, x: -100, y: 100, zIndex: 15, scale: 0.95 },
    { label: "ADVERTISEMENT", rotate: 12, x: 120, y: 120, zIndex: 20, scale: 1 },
    { label: "WEBSITE HERO", rotate: -2, x: 0, y: -180, zIndex: 5, scale: 1.1 }
  ];

  return (
    <section ref={containerRef} id="social" className="py-40 px-6 md:px-10 lg:px-[58px] bg-[#F3FAF7] text-[#061F1C] overflow-hidden min-h-[120vh] relative flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full relative z-30 pointer-events-none mb-32">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#126F65]">04 / CONTENT MULTIPLICATION</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4">
            START WITH<br />
            <em className="text-[#138F84] not-italic">ONE IDEA.</em>
          </h2>
        </Reveal>
      </div>
      
      <div className="relative w-full h-[60vh] flex items-center justify-center max-w-[1000px] mx-auto mt-10">
        
        {/* Core Idea */}
        <motion.div 
          className="absolute z-50 w-64 h-80 bg-[#061F1C] text-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center border-4 border-[#138F84] cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={containerRef}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 15 }}
          data-cursor="hover"
        >
          <div className="w-12 h-12 rounded-full bg-[#138F84] animate-pulse mb-6 flex items-center justify-center">
            <Zap className="text-[#061F1C]" size={20} />
          </div>
          <span className="font-black text-3xl tracking-tighter uppercase text-center leading-none">CORE<br/>IDEA</span>
        </motion.div>

        {/* Multiplied Assets */}
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            className="absolute bg-white rounded-2xl shadow-[0_20px_50px_rgba(14,84,76,0.15)] border border-[rgba(14,84,76,0.05)] w-56 h-72 p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing hover:shadow-[0_20px_50px_rgba(19,143,132,0.3)] transition-shadow"
            drag
            dragConstraints={containerRef}
            initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 0 }}
            whileInView={{ x: card.x, y: card.y, rotate: card.rotate, scale: card.scale, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 20, delay: 0.5 + i * 0.15 }}
            style={{ zIndex: card.zIndex }}
            data-cursor="explore"
          >
            <div className="flex justify-between items-start">
              <div className="w-8 h-8 rounded-full bg-[#F3FAF7] flex items-center justify-center">
                <Share2 size={12} className="text-[#138F84]" />
              </div>
              <span className="text-[8px] font-bold text-[#138F84] uppercase tracking-widest">{card.label}</span>
            </div>
            
            <div className="w-full aspect-square bg-[#F3FAF7] rounded-lg mt-4 flex items-center justify-center relative overflow-hidden group">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ duration: 3 + i, repeat: Infinity }}
                className="absolute inset-0 bg-[#E8F6F2]" 
              />
              <Play className="text-[#138F84] relative z-10 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-125 duration-300" size={24} />
            </div>

            <div className="mt-4 flex gap-2">
              <div className="h-1 flex-1 bg-[#E8F6F2] rounded-full" />
              <div className="h-1 w-1/3 bg-[#138F84] rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Visual connecting lines drawn using SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="-500 -300 1000 600">
          {cards.map((card, i) => (
            <motion.path
              key={`path-${i}`}
              d={`M 0 0 Q ${card.x / 2} ${card.y - 100} ${card.x} ${card.y}`}
              fill="transparent"
              stroke="#138F84"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
            />
          ))}
        </svg>

      </div>
    </section>
  );
}

function SoftwareDevelopment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  return (
    <section ref={containerRef} id="technology" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#061F1C] text-white overflow-hidden relative min-h-[120vh] flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">05 / TECHNOLOGY & SOFTWARE</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4 mb-16">
            WE DON'T JUST<br />DESIGN SOFTWARE.<br />
            <em className="text-[#138F84] not-italic">WE BUILD IT.</em>
          </h2>
        </Reveal>
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch h-[600px] w-full mt-12">
          
          {/* Left Side: Code Visual */}
          <div className="hidden lg:flex w-[35%] bg-[#0A2A26] rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-2xl p-6 flex-col overflow-hidden relative font-mono text-[10px] leading-relaxed text-[#138F84]">
            <div className="flex items-center gap-2 mb-6 border-b border-[rgba(255,255,255,0.05)] pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-4 opacity-50">terminal — build</span>
            </div>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-white opacity-50">&gt; initializing dealpost application framework...</p>
              <p className="text-white opacity-50">&gt; compiling assets...</p>
            </motion.div>
            
            {[
              "import { DashboardLayout } from '@dealpost/ui';",
              "import { createAnalyticsEngine } from '@core/analytics';",
              "",
              "const engine = createAnalyticsEngine({",
              "  mode: 'real-time',",
              "  cache: true",
              "});",
              "",
              "export default function App() {",
              "  return (",
              "    <DashboardLayout>",
              "      <Sidebar metrics={engine.getMetrics()} />",
              "      <MainContent>",
              "        <DataVisualization />",
              "      </MainContent>",
              "    </DashboardLayout>",
              "  );",
              "}"
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="my-1 whitespace-pre"
              >
                {line}
              </motion.div>
            ))}

            <motion.div
              className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#0A2A26] to-transparent pointer-events-none"
            />
          </div>

          {/* Right Side: The Application Building Itself */}
          <div className="w-full lg:w-[65%] bg-white rounded-3xl overflow-hidden relative flex shadow-2xl">
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: "-100%" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0, delay: 2.5 }}
              className="w-[20%] h-full border-r border-gray-100 bg-gray-50 flex flex-col p-4 z-20 absolute lg:relative"
            >
              <div className="w-8 h-8 rounded-full bg-[#061F1C] mb-8" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-3 bg-gray-200 rounded-full mb-4 opacity-50" />
              ))}
            </motion.div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col bg-white h-full relative z-10 w-full pl-[20%] lg:pl-0">
              
              {/* Header */}
              <motion.div 
                initial={{ y: "-100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", bounce: 0, delay: 3 }}
                className="h-16 border-b border-gray-100 flex items-center px-8 justify-between"
              >
                <div className="w-32 h-4 bg-gray-100 rounded-full" />
                <div className="w-8 h-8 rounded-full bg-gray-100" />
              </motion.div>

              {/* Dashboard Content */}
              <div className="p-8 flex-1 flex flex-col gap-6">
                
                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-6 h-24">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 3.5 + i * 0.15 }}
                      className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col justify-between"
                    >
                      <div className="w-16 h-2 bg-gray-200 rounded-full mb-4" />
                      <div className="w-24 h-6 bg-[#138F84]/20 rounded-full" />
                    </motion.div>
                  ))}
                </div>

                {/* Main Chart Area */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 4.2 }}
                  className="flex-1 bg-gray-50 rounded-xl border border-gray-100 p-6 flex flex-col relative overflow-hidden"
                >
                  <div className="w-32 h-3 bg-gray-200 rounded-full mb-8" />
                  
                  {/* Fake Bar Chart */}
                  <div className="flex-1 flex items-end gap-2 justify-between">
                    {[40, 70, 45, 90, 65, 100, 85].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 4.5 + i * 0.1, type: "spring" }}
                        className="w-full bg-[#138F84] rounded-t-md opacity-80"
                      />
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>
            
            {/* Reveal Overlay */}
            <motion.div 
              className="absolute inset-0 bg-[#138F84] z-50 flex items-center justify-center"
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.5, ease: [0.76, 0, 0.24, 1] }}
              style={{ transformOrigin: "right" }}
            >
              <motion.span 
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 1.3 }}
                className="text-white font-black tracking-widest text-sm"
              >
                COMPILING...
              </motion.span>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

function CompleteBusinessSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const steps = [
    { label: "NEW BUSINESS IDEA", icon: <Zap size={24} />, top: "5%" },
    { label: "BRANDING", icon: <Monitor size={24} />, top: "15%" },
    { label: "MENU", icon: <Layout size={24} />, top: "25%" },
    { label: "PACKAGING", icon: <Database size={24} />, top: "35%" },
    { label: "PHOTOGRAPHY", icon: <Play size={24} />, top: "45%" },
    { label: "SOCIAL MEDIA", icon: <Share2 size={24} />, top: "55%" },
    { label: "WEBSITE", icon: <Code size={24} />, top: "65%" },
    { label: "GOOGLE MAPS", icon: <Monitor size={24} />, top: "75%" },
    { label: "LAUNCH CAMPAIGN", icon: <Zap size={24} />, top: "85%" },
    { label: "GROWTH", icon: <ArrowUpRight size={24} />, top: "95%" },
  ];

  const yPos = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="complete-solution" className="bg-[#126F65] text-white py-20 md:py-32 px-6 md:px-10 lg:px-[58px] min-h-[300vh] relative">
      <div className="sticky top-0 min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 max-w-[1400px] mx-auto py-10 md:py-20">
        
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <Reveal>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84] mb-4 block">06 / THE COMPLETE SYSTEM</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              THE FULL<br/>LIFECYCLE.
            </h2>
            <p className="text-lg font-medium opacity-80 mt-8">
              We take a business from a simple idea to a launched brand with a full digital presence, automated marketing, and sustainable growth. This is the complete Dealpost Operating System.
            </p>
          </Reveal>
        </div>

        <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh] relative border-l border-white/20 pl-6 md:pl-20 py-4 md:py-10 flex flex-col overflow-hidden">
          <motion.div 
            className="absolute top-0 left-[-2px] w-[3px] bg-white h-[20%] shadow-[0_0_20px_white]"
            style={{ top: yPos }}
          />

          <div className="relative h-full w-full">
            {/* Background Parallax Images for Complete Business Solution */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
              className="absolute right-0 top-[20%] w-48 aspect-square rounded-2xl overflow-hidden opacity-20 pointer-events-none border border-[#138F84]/20 mix-blend-screen hidden md:block"
            >
              <img src="/project1.png" alt="Brand" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
              className="absolute right-[20%] top-[60%] w-64 aspect-video rounded-2xl overflow-hidden opacity-30 pointer-events-none border border-[#138F84]/20 mix-blend-screen hidden md:block"
            >
              <img src="/project8.png" alt="Digital" className="w-full h-full object-cover" />
            </motion.div>

            {steps.map((step, i) => (
              <motion.div 
                key={step.label}
                className="absolute flex items-center gap-6"
                style={{ top: step.top }}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#061F1C] border border-[#138F84]/50 flex items-center justify-center text-[#138F84] shadow-xl">
                  {step.icon}
                </div>
                <span className="text-xl md:text-3xl font-black tracking-tighter uppercase drop-shadow-md">{step.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "Performance Marketing", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleContactEvent = (e: CustomEvent) => {
      if (e.detail?.type) {
        setFormData(prev => ({ ...prev, type: e.detail.type }));
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('dealpost-contact' as any, handleContactEvent);
    return () => window.removeEventListener('dealpost-contact' as any, handleContactEvent);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSent(true);
        setFormData({ name: "", email: "", type: "Performance Marketing", message: "" });
        setTimeout(() => setSent(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
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
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Name</span>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">Email</span>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold" />
              </label>
            </div>
            
            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">What do you need?</span>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold appearance-none cursor-pointer">
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
              <textarea required rows={3} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-transparent border-b border-[rgba(255,255,255,0.2)] pb-4 outline-none focus:border-[#138F84] transition-colors text-xl font-bold resize-none" />
            </label>
            
            <button type="submit" disabled={loading} className={`mt-8 py-6 px-10 rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-between transition-colors w-full group ${sent ? 'bg-white text-[#061F1C]' : 'bg-[#138F84] text-[#061F1C] hover:bg-white'} disabled:opacity-50`}>
              {loading ? "SENDING..." : sent ? "MESSAGE SENT" : "START A CONVERSATION"} {!sent && !loading && <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
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
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm border border-white/10">
              <img src={dealpostLogo} alt="DP" className="w-full h-full object-cover mix-blend-multiply" />
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
          <div className="flex items-center gap-3 opacity-80">
            <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex items-center justify-center">
              <img src={dealpostLogo} alt="DP" className="w-full h-full object-cover mix-blend-multiply" />
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
    { title: "TIDEL", category: "Brand Identity, Strategy", image: "/pdf_img_8.jpeg", featured: true, desc: "A comprehensive brand narrative encompassing Logo, Monogram, Wordmark, Business Cards, Signage, and ID cards." },
    { title: "CHENNAI AEROSPACE PARK", category: "Strategy, Brand Implementation", image: "/pdf_img_14.jpeg", featured: false },
    { title: "KARI KALAM", category: "IDENTITY & MARKETING", desc: "Identity, Traditional Concept", image: "/pdf_img_17.png", featured: false },
    { title: "KOVAI KONGU MESS", category: "RESTAURANT BRANDING", desc: "Logo design, Mascot, Brand colors", image: "/project1.png", featured: false },
    { title: "FOODBAE", category: "RESTAURANT BRANDING", desc: "Logo, Packaging, Marketing Collateral", image: "/project4.png", featured: false },
    { title: "ARENA SPORTS & RESORT", category: "LEISURE BRANDING", desc: "Visual identity, Resort branding", image: "/project5.jpeg", featured: false },
    { title: "CANVASWORKSPACE", category: "SOFTWARE BRANDING", desc: "Logo, Identity system, UI design", image: "/project6.png", featured: false },
    { title: "LUX", category: "BRAND COMMUNICATION", desc: "Logo, Application, Typography", image: "/project9.png", featured: false },
    { title: "NANO HOSPITALS", category: "HEALTHCARE BRANDING", desc: "Logo, Identity System", image: "/project11.png", featured: false },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  
  // Calculate horizontal translation based on number of projects to ensure full scrolling
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={containerRef} id="work" className="relative h-[600vh] bg-[#F3FAF7] text-[#061F1C]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-12 pb-12">
        
        <div className="px-6 md:px-10 lg:px-[58px] mb-12 shrink-0">
          <Reveal>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#126F65]">06 / SELECTED WORK</span>
            <h2 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.85] mt-4">
              PROOF<br />
              IS IN THE <em className="text-[#138F84] not-italic">WORK.</em>
            </h2>
          </Reveal>
        </div>

        <motion.div style={{ x }} className="flex gap-16 px-6 md:px-10 lg:px-[58px] w-max items-center h-full max-h-[70vh]">
          {projects.map((project, i) => (
            <div 
              key={project.title}
              className={`flex-shrink-0 ${project.featured ? 'w-[75vw] md:w-[60vw]' : 'w-[50vw] md:w-[40vw]'} h-full group relative`}
              data-cursor="explore"
            >
              <div className={`w-full h-full rounded-[40px] p-8 md:p-12 flex flex-col justify-end shadow-2xl relative overflow-hidden bg-[#0E544C] ${project.featured ? 'ring-4 ring-[#138F84] shadow-[0_0_60px_rgba(19,143,132,0.4)]' : ''}`}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url(${project.image})` }} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#061F1C] via-[#061F1C]/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
                
                <div className="absolute top-8 md:top-12 right-8 md:right-12 z-10 flex justify-end text-white">
                  <ArrowUpRight size={project.featured ? 48 : 32} className={`opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ${project.featured ? 'text-white' : 'text-[#138F84]'}`} />
                </div>
                
                <div className="relative z-10 text-white transform transition-transform duration-500 group-hover:-translate-y-4">
                  <span className={`inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 ${project.featured ? 'px-4 py-2 bg-[#138F84] rounded-full' : 'opacity-90'}`}>
                    {project.featured ? '⭐ FLAGSHIP CASE STUDY' : 'CASE STUDY'}
                  </span>
                  
                  <h3 className={`${project.featured ? 'text-5xl md:text-8xl' : 'text-4xl md:text-6xl'} font-black tracking-tighter leading-none mb-6 uppercase drop-shadow-2xl`}>{project.title}</h3>
                  <div className={`text-xs md:text-sm uppercase font-bold tracking-widest ${project.featured ? 'text-white' : 'text-[#138F84]'} mb-4`}>{project.category}</div>
                  
                  {project.featured && (
                    <p className="text-lg md:text-2xl font-medium max-w-2xl opacity-90 drop-shadow-md">
                      {project.desc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}

function Clients() {
  const clientsData = [
    { name: "TIDEL", type: "Technology Park", image: "/pdf_img_3.jpeg" },
    { name: "CHENNAI AEROSPACE PARK", type: "Government", image: "/pdf_img_13.png" },
    { name: "KOVAI KONGU MESS", type: "Restaurant / Hospitality", image: "/project1.png" },
    { name: "KAMARAJAR EDUCATIONAL TRUST", type: "Education", image: "/project2.png" },
    { name: "ACTS School", type: "Education", image: "/project3.png" },
    { name: "FOODBAE", type: "Food & Beverage", image: "/project4.png" },
    { name: "Arena Sports & Resort", type: "Sports & Leisure", image: "/project5.jpeg" },
    { name: "CanvasWorkspace", type: "Software & Technology", image: "/project6.png" },
    { name: "Bangalore Dev Authority", type: "Government", image: "/project7.png" },
    { name: "Suraksha Group", type: "Real Estate", image: "/project8.png" },
    { name: "Lux", type: "Fashion & Lifestyle", image: "/project9.png" },
    { name: "Sri Mahalaxmi Jewellers", type: "Retail & Jewelry", image: "/project10.png" },
    { name: "Nano Hospitals", type: "Healthcare", image: "/project11.png" },
    { name: "Regal Hospital", type: "Healthcare", image: "/project12.png" },
    { name: "SST Global", type: "Corporate / Logistics", image: "/project13.png" },
    { name: "Regal Jewellers", type: "Retail & Jewelry", image: "/project14.png" },
    { name: "Blossoms", type: "Apparel", image: "/project15.png" },
    { name: "eterneD", type: "Retail & Jewelry", image: "/project16.png" },
    { name: "PEEPAI Brewery & Kitchen", type: "Food & Beverage", image: "/project17.png" },
    { name: "m5 Ecity", type: "Real Estate", image: "/project18.png" },
    { name: "ATHLETEFIT", type: "Health & Fitness", image: "/project19.png" },
    { name: "INDIQUBE", type: "Workspace & Corporate", image: "/project21.png" },
    { name: "Nandus", type: "Retail & FMCG", image: "/project22.png" },
    { name: "Supertails", type: "Retail & E-commerce", image: "/project23.png" },
    { name: "Hillrock National Public School", type: "Education", image: "/project24.png" },
    { name: "Raj Fashion Academy", type: "Education", image: "/project25.png" },
    { name: "ORALDNA LABS", type: "Healthcare", image: "/project26.png" }
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
  const name = "HARIHARAN J V";
  
  return (
    <section id="founder" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#126F65] text-white overflow-hidden relative">
      {/* Background Geometry */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -right-64 -top-64 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -left-64 -bottom-64 w-[800px] h-[800px] border border-[#138F84]/10 rounded-full pointer-events-none" 
      />
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
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
              <strong className="block text-xl font-black tracking-widest uppercase flex">
                {name.split("").map((char, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </strong>
              <motion.span 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }}
                transition={{ duration: 1, delay: name.length * 0.05 + 0.2 }}
                className="text-[10px] uppercase tracking-widest font-bold text-[#138F84] block mt-1"
              >
                FOUNDER — DEALPOST
              </motion.span>
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

// Custom Animated Counter Component
function Counter({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (to - from) + from);
      node.textContent = currentCount.toString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [from, to, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

function PerformanceDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} id="performance" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#061F1C] text-white">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/3">
          <Reveal>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">07 / PERFORMANCE MARKETING</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mt-4 mb-6 uppercase">
              ATTENTION IS GOOD.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#138F84]">PERFORMANCE</span><br />
              IS THE POINT.
            </h2>
            <p className="text-lg opacity-70 font-medium">
              We track, test, and optimize every campaign. Because creative without data is just art.
            </p>
          </Reveal>
        </div>

        <div className="w-full lg:w-2/3">
          <div className="bg-[#0E544C] rounded-[30px] p-8 border border-white/10 shadow-2xl overflow-hidden relative min-h-[400px]">
            <div className="absolute top-6 left-8 text-[10px] uppercase font-bold tracking-widest text-[#138F84]">
              ILLUSTRATIVE PERFORMANCE VIEW
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12">
              {[
                { label: "REACH", value: 2.4, suffix: "M", delay: 0.2 },
                { label: "CONVERSIONS", value: 84, suffix: "K", delay: 0.4 },
                { label: "ROAS", value: 4.2, suffix: "x", delay: 0.6 }
              ].map((metric, i) => (
                <motion.div 
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: metric.delay }}
                  className="bg-[#061F1C] rounded-2xl p-4 md:p-6 border border-white/5 flex flex-col justify-center"
                >
                  <span className="text-[8px] md:text-[10px] uppercase font-bold tracking-widest opacity-50">{metric.label}</span>
                  <div className="text-2xl md:text-4xl font-black mt-2 text-[#138F84]">
                    {isInView ? <Counter from={0} to={metric.value} suffix={metric.suffix} /> : "0" + metric.suffix}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-[#061F1C] rounded-2xl p-6 border border-white/5 h-48 md:h-64 flex items-end justify-between gap-2 md:gap-4 relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  d="M0,80 Q10,70 20,60 T40,50 T60,30 T80,20 T100,10"
                  fill="none"
                  stroke="#138F84"
                  strokeWidth="3"
                  className="drop-shadow-[0_0_10px_rgba(19,143,132,0.8)]"
                />
              </svg>
              {[20, 40, 30, 60, 50, 80, 70, 90, 85, 100].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${h}%` } : {}}
                  transition={{ duration: 0.8, delay: 1 + i * 0.1, type: "spring" }}
                  className="w-full bg-white/5 rounded-t-md relative z-10"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagingDesign() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-10 lg:px-[58px] bg-[#F3FAF7] text-[#061F1C] overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <Reveal>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">08 / PACKAGING</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4 mb-8">
            YOUR BRAND<br />
            SHOULD TRAVEL<br />
            WITH YOUR PRODUCT.
          </h2>
        </Reveal>

        <div className="relative w-full h-[300px] md:h-[500px] mt-8 md:mt-16 flex items-center justify-center">
          <motion.div
            initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
            animate={isInView ? {
              scale: [1, 0.8, 1],
              rotateX: [0, 60, 10],
              rotateY: [0, 0, -20],
              borderRadius: ["0%", "5%", "10%"]
            } : {}}
            transition={{ duration: 2, delay: 0.5, times: [0, 0.5, 1], ease: "easeInOut" }}
            className="w-64 h-64 md:w-96 md:h-96 bg-[#0E544C] border-2 border-[#138F84] relative shadow-[0_20px_50px_rgba(14,84,76,0.3)] flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
             <motion.div 
                initial={{ opacity: 1 }}
                animate={isInView ? { opacity: [1, 0, 0] } : {}}
                transition={{ duration: 2, delay: 0.5, times: [0, 0.5, 1] }}
                className="absolute text-[#138F84] font-black tracking-widest text-2xl z-20"
             >
               FLAT ARTWORK
             </motion.div>
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: [0, 0, 1], scale: [0.8, 1, 1] } : {}}
                transition={{ duration: 2, delay: 0.5, times: [0, 0.5, 1] }}
                className="absolute inset-0 w-full h-full object-cover rounded-xl overflow-hidden shadow-2xl"
                style={{ transform: "translateZ(50px)" }}
             >
               <img src="/project4.png" alt="Packaging" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-[#0E544C]/30 mix-blend-multiply" />
             </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InteriorSpatial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-10 lg:px-[58px] bg-white text-[#061F1C] overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#138F84]">09 / SPATIAL DESIGN</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mt-4 mb-8">
              BRANDS DON'T<br />
              ONLY LIVE<br />
              ON SCREENS.
            </h2>
            <p className="text-lg font-medium opacity-70">
              From floor plans to physical experiences, we design spaces that embody your brand identity and guide your customers.
            </p>
          </Reveal>
        </div>

        <div className="relative h-[300px] md:h-[500px] bg-[#F3FAF7] rounded-[40px] border border-[#138F84]/20 p-4 md:p-8 flex items-center justify-center overflow-hidden">
          {/* Blueprint Grid */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#138F84 1px, transparent 1px), linear-gradient(90deg, #138F84 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <AnimatePresence>
            {isInView && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-8"
              >
                {/* 2D Floor Plan -> 3D Space Sequence */}
                <motion.div 
                  initial={{ borderRadius: "0%", borderWidth: "2px", backgroundColor: "transparent" }}
                  animate={{ borderRadius: "20px", borderWidth: "0px", backgroundColor: "#0E544C" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                  className="w-48 h-48 border-[#138F84] flex items-center justify-center shadow-xl relative"
                >
                   <motion.span 
                     initial={{ opacity: 1 }}
                     animate={{ opacity: 0 }}
                     transition={{ duration: 0.5, delay: 1 }}
                     className="text-[#138F84] font-bold text-xs tracking-widest uppercase z-10 relative"
                   >
                     FLOOR PLAN
                   </motion.span>
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.5, delay: 1.5 }}
                     className="absolute inset-0 rounded-[20px] overflow-hidden"
                   >
                     <img src="/project17.png" alt="Spatial Design" className="w-full h-full object-cover" />
                   </motion.div>
                </motion.div>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 2.5 }}
                  className="h-1 bg-[#138F84] rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
      <BrandingTransformation />
      <Ecosystem />
      <DealpostEngine />
      <ContentMultiplication />
      <PerformanceDashboard />
      <SoftwareDevelopment />
      <PackagingDesign />
      <InteriorSpatial />
      <CompleteBusinessSolution />
      <Projects />
      <Clients />
      <Founder />
      <Contact />
      <Footer />
    </main>
  );
}
