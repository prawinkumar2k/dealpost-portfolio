import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Menu, MoveUpRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const dealpostLogo = "https://cdn.builder.io/api/v1/image/assets%2F7ed07d18e9c74c61ae6c4e963ff0281d%2Fe77ecdba863d43509e2e5e0954c9337a?format=webp&width=800&height=1200";

const serviceGroups = [
  {
    number: "01",
    name: "Visual Identity & Branding",
    descriptor: "Make it unmistakable.",
    services: ["Logo Application", "Brand Consistency", "Business Cards & Letterheads", "Staff IDs & Uniforms", "Menu Design", "Stickers & Labels"],
  },
  {
    number: "02",
    name: "Marketing & Print Collateral",
    descriptor: "Make it tangible.",
    services: ["Brochures & Flyers", "Table Tent Cards", "QR Code Stands", "Thank You Cards", "Gift Vouchers", "Loyalty Cards"],
  },
  {
    number: "03",
    name: "Digital Presence & SEO",
    descriptor: "Make it discoverable.",
    services: ["Website Design", "Digital Menus", "Online Table Booking", "SEO Setup", "Google Maps Optimization", "Swiggy & Zomato Listings"],
  },
  {
    number: "04",
    name: "Social Media & Content",
    descriptor: "Make it engaging.",
    services: ["Instagram & Facebook Setup", "WhatsApp Business", "30 Monthly Videos & Reels", "Food & Interior Photography", "Chef & Team Portraits"],
  },
  {
    number: "05",
    name: "Campaigns & Promotions",
    descriptor: "Make it launch.",
    services: ["Teaser Campaigns", "Influencer Marketing", "Grand Opening Events", "Press Releases", "Paid Social Ads", "Offer & Festival Posters"],
  },
  {
    number: "06",
    name: "Packaging Production",
    descriptor: "Make it physical.",
    services: ["Paper Carry Bags", "Meal & Takeaway Boxes", "Coffee Sleeves & Paper Cups", "Tissue Paper", "Food Wrapping Paper", "Bottle & Sauce Labels"],
  },
];

const projects = [
  { name: "Kovai Kongu Mess", category: "Restaurant Branding", tag: "01", art: "kovai", detail: "Logo design / mascot illustration / brand colors / restaurant branding", bg: "/project1.png" },
  { name: "Kamarajar Educational Trust", category: "Project Branding", tag: "02", art: "aerospace", detail: "Logo / monogram / wordmark / identity system", bg: "/project2.png" },
  { name: "A School of Difference", category: "Education Branding", tag: "03", art: "school", detail: "Identity / application / color palette / typography", bg: "/project3.png" },
  { name: "FOODBAE", category: "Restaurant Branding", tag: "04", art: "foodbae", detail: "Logo / brand identity / packaging / marketing collateral", bg: "/project4.png" },
  { name: "Arena Sports & Resort", category: "Leisure Branding", tag: "05", art: "arena", detail: "Logo / visual identity / resort branding / marketing materials", bg: "/project5.jpeg" },
  { name: "CanvasWorkspace", category: "Software Branding", tag: "06", art: "canvas", detail: "Logo / application icon / identity system / UI design", bg: "/project6.png" },
  { name: "Bangalore Development Authority", category: "Civic Branding", tag: "07", art: "bda", detail: "Identity / visual system", bg: "/project7.png" },
  { name: "Suraksha Group", category: "Corporate Identity", tag: "08", art: "suraksha", detail: "Logo / brand identity / marketing collateral", bg: "/project8.png" },
  { name: "Lux", category: "Brand Communication", tag: "09", art: "lux", detail: "Logo / application / typography", bg: "/project9.png" },
  { name: "Sri Mahalaxmi Jewellers", category: "Retail Branding", tag: "10", art: "mahalaxmi", detail: "Logo / visual identity", bg: "/project10.png" },
  { name: "Nano Hospitals", category: "Healthcare Branding", tag: "11", art: "nano", detail: "Logo / identity system", bg: "/project11.png" },
  { name: "Regal Hospital", category: "Healthcare Branding", tag: "12", art: "regal", detail: "Logo / visual identity", bg: "/project12.png" },
  { name: "SST Global", category: "Corporate Identity", tag: "13", art: "sst", detail: "Logo / branding / stationery", bg: "/project13.png" },
  { name: "Regal Jewellers", category: "Retail Branding", tag: "14", art: "regaljewel", detail: "Logo / brand identity", bg: "/project14.png" },
  { name: "Blossoms", category: "Retail Branding", tag: "15", art: "blossoms", detail: "Logo / visual system", bg: "/project15.png" },
  { name: "eterneD", category: "Retail Branding", tag: "16", art: "eterned", detail: "Logo / brand identity", bg: "/project16.png" },
  { name: "PEEPAI Brewery & Kitchen", category: "Restaurant Branding", tag: "17", art: "peepai", detail: "Logo / brand identity / packaging", bg: "/project17.png" },
  { name: "m5 Ecity", category: "Real Estate Branding", tag: "18", art: "m5", detail: "Logo / visual identity", bg: "/project18.png" },
  { name: "ATHLETEFIT", category: "Fitness Branding", tag: "19", art: "athletefit", detail: "Logo / brand identity", bg: "/project19.png" },
  { name: "ACTS School", category: "Education Branding", tag: "20", art: "acts", detail: "Logo / visual system", bg: "/project20.png" },
  { name: "INDIQUBE", category: "Corporate Branding", tag: "21", art: "indiqube", detail: "Logo / brand identity", bg: "/project21.png" },
  { name: "Nandus", category: "Retail Branding", tag: "22", art: "nandus", detail: "Logo / brand identity", bg: "/project22.png" },
  { name: "Supertails", category: "Pet Care Branding", tag: "23", art: "supertails", detail: "Logo / e-commerce identity", bg: "/project23.png" },
  { name: "Hillrock National Public School", category: "Education Branding", tag: "24", art: "hillrock", detail: "Logo / institutional identity", bg: "/project24.png" },
  { name: "Raj Fashion Academy", category: "Fashion Education", tag: "25", art: "rajfashion", detail: "Logo / visual system", bg: "/project25.png" },
  { name: "Oral DNA Labs", category: "Healthcare Branding", tag: "26", art: "oraldna", detail: "Logo / brand identity", bg: "/project26.png" },
];

const clientsData = [
  { name: "Kovai Kongu Mess", type: "Restaurant / Hospitality", image: "/project1.png" },
  { name: "Kamarajar Educational Trust", type: "Education", image: "/project2.png" },
  { name: "A School of Difference", type: "Education", image: "/project3.png" },
  { name: "FOODBAE", type: "Food & Beverage", image: "/project4.png" },
  { name: "Arena Sports & Resort", type: "Sports & Leisure", image: "/project5.jpeg" },
  { name: "CanvasWorkspace", type: "Software & Technology", image: "/project6.png" },
  { name: "Bangalore Development Authority", type: "Government", image: "/project7.png" },
  { name: "Suraksha Group", type: "Real Estate", image: "/project8.png" },
  { name: "Lux", type: "Fashion & Lifestyle", image: "/project9.png" },
  { name: "Sri Mahalaxmi Jewellers", type: "Retail & Jewelry", image: "/project10.png" },
  { name: "Nano Hospitals", type: "Healthcare", image: "/project11.png" },
  { name: "Regal Hospital", type: "Healthcare", image: "/project12.png" },
  { name: "SST Global", type: "Corporate / Logistics", image: "/project13.png" },
  { name: "Regal Jewellers", type: "Retail & Jewelry", image: "/project14.png" },
  { name: "Blossoms", type: "Retail / Bookstore", image: "/project15.png" },
  { name: "eterneD", type: "Retail & Jewelry", image: "/project16.png" },
  { name: "PEEPAI Brewery & Kitchen", type: "Food & Beverage", image: "/project17.png" },
  { name: "m5 Ecity", type: "Real Estate", image: "/project18.png" },
  { name: "ATHLETEFIT", type: "Health & Fitness", image: "/project19.png" },
  { name: "ACTS School", type: "Education", image: "/project20.png" },
  { name: "INDIQUBE", type: "Workspace & Corporate", image: "/project21.png" },
  { name: "Nandus", type: "Retail & FMCG", image: "/project22.png" },
  { name: "Supertails", type: "Retail & E-commerce", image: "/project23.png" },
  { name: "Hillrock National Public School", type: "Education", image: "/project24.png" },
  { name: "Raj Fashion Academy", type: "Education", image: "/project25.png" },
  { name: "Oral DNA Labs", type: "Healthcare", image: "/project26.png" },
];

function SectionLink({ id, children, className = "", onClick }: { id: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };
  return <a href={`#${id}`} className={className} onClick={handleClick}>{children}</a>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <SectionLink id="top" className={`dealpost-logo ${light ? "dealpost-logo-light" : ""}`}><img src={dealpostLogo} alt="Dealpost" /></SectionLink>;
}

// Upgraded Reveal using Framer Motion
function Reveal({ children, className = "", delay = 0, yOffset = 40 }: { children: ReactNode; className?: string; delay?: number; yOffset?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: yOffset, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}


// Infinite auto-scrolling marquee
function InfiniteMarquee({ text, speed = 30 }: { text: string; speed?: number }) {
  // Repeat text enough times to fill screen width seamlessly
  const items = Array(8).fill(text);
  return (
    <div className="overflow-hidden whitespace-nowrap py-16 pointer-events-none select-none border-y border-[rgba(212,175,55,0.12)]">
      <motion.div
        className="flex gap-0 font-black tracking-tighter uppercase w-max"
        style={{ fontSize: "clamp(32px, 6vw, 80px)", color: "var(--teal)", opacity: 0.18 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {/* Duplicate set so it loops seamlessly */}
        {[...items, ...items].map((t, i) => (
          <span key={i} className="px-12">{t} <span className="text-[var(--ink)] opacity-40 mx-4">✦</span></span>
        ))}
      </motion.div>
    </div>
  );
}


function CursorFollower() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      setLabel(target?.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <motion.div 
      className={`cursor-follower ${label ? "cursor-active" : ""}`} 
      animate={{ left: position.x, top: position.y }}
      transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
    >
      {label}
    </motion.div>
  );
}

function MagneticLink({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  const [shift, setShift] = useState({ x: 0, y: 0 });
  return <SectionLink id={id} className={`magnetic-link ${className}`} onClick={() => setShift({ x: 0, y: 0 })}>
    <motion.span 
      onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setShift({ x: (event.clientX - rect.left - rect.width / 2) * 0.25, y: (event.clientY - rect.top - rect.height / 2) * 0.25 }); }} 
      onMouseLeave={() => setShift({ x: 0, y: 0 })} 
      animate={{ x: shift.x, y: shift.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  </SectionLink>;
}

function ProjectArt({ project, large = false }: { project: (typeof projects)[number]; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden project-art aspect-square ${large ? "md:aspect-[1.2]" : ""} rounded-sm group`} style={{ backgroundColor: 'var(--ink)' }}>
      <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${project.bg})` }} />
      <div className="absolute inset-0 art-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#042116] via-transparent to-transparent opacity-80" />
      
      <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
         <span className="text-[var(--teal)] text-xs font-bold tracking-widest uppercase mb-2">{project.tag} / 05</span>
         <h3 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-2 group-hover:text-[var(--teal)] transition-colors">{project.name}</h3>
         <p className="text-[var(--mint)] opacity-70 text-sm">{project.category}</p>
      </div>
    </div>
  );
}


function WorkRail() {
  const [active, setActive] = useState(0);
  const total = projects.length;

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setActive(a => (a - 1 + total) % total);
  const next = () => setActive(a => (a + 1) % total);

  return (
    <section id="work" className="py-32 bg-[var(--ink)] text-[var(--mint)] relative overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-10 lg:px-[58px] mb-16">
        <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[var(--teal)]">05 / Selected work</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mt-4 leading-none">
          Work<br /><em className="text-[var(--teal)] not-italic">that</em><br />speaks<span className="text-[var(--teal)]">.</span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${active * 100}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {projects.map((project, index) => (
              <div key={project.name} className="w-full flex-shrink-0 px-6 md:px-10 lg:px-[58px]">
                <div className="grid md:grid-cols-2 gap-12 items-center min-h-[60vh]">
                  {/* Project image */}
                  <motion.div
                    className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    style={{ backgroundColor: "var(--deep)" }}
                  >
                    <img
                      src={project.bg}
                      alt={project.name}
                      className="w-full h-full object-scale-down p-12 bg-white opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 drop-shadow-2xl"
                      style={{ transition: "transform 0.8s ease, opacity 0.5s ease" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#042116] via-transparent to-transparent" />

                  </motion.div>

                  {/* Project info */}
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-6"
                  >
                    <span className="text-[var(--teal)] text-xs font-bold tracking-widest uppercase">{project.category}</span>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">{project.name}</h3>
                    <p className="text-[rgba(253,251,247,0.55)] text-sm tracking-widest uppercase leading-relaxed border-l-2 border-[var(--teal)] pl-4">{project.detail}</p>

                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Arrows */}
        <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[var(--teal)] text-[var(--teal)] flex items-center justify-center hover:bg-[var(--teal)] hover:text-[var(--ink)] transition-all z-10 text-xl font-bold">‹</button>
        <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[var(--teal)] text-[var(--teal)] flex items-center justify-center hover:bg-[var(--teal)] hover:text-[var(--ink)] transition-all z-10 text-xl font-bold">›</button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-3 mt-12">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === active ? "32px" : "8px",
              height: "8px",
              background: i === active ? "var(--teal)" : "rgba(212,175,55,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}



function Services() {
  const [active, setActive] = useState(0);
  const group = serviceGroups[active];
  return (
    <section id="services" className="min-h-screen py-32 px-6 md:px-10 lg:px-[58px] bg-[var(--deep)] text-[var(--mint)] relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[60%] aspect-square bg-[var(--teal)] rounded-full mix-blend-overlay blur-[120px] opacity-10 pointer-events-none" />
      
      <Reveal><span className="text-[9px] uppercase tracking-[0.15em] font-bold text-[var(--teal)]">04 / Capabilities</span></Reveal>
      <Reveal delay={0.1}><h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mt-12 leading-none">End-to-end.<br /><em className="text-[var(--teal)] not-italic">One creative</em><br />partner<span className="text-[var(--teal)]">.</span></h2></Reveal>
      
      <div className="grid md:grid-cols-2 gap-16 mt-24">
        <div className="flex flex-col border-t border-[rgba(253,251,247,0.15)]">
          {serviceGroups.map((item, index) => (
            <button key={item.name} className={`flex items-center text-left py-8 border-b border-[rgba(253,251,247,0.15)] transition-all duration-300 ${active === index ? 'text-[var(--mint)] pl-8 bg-[rgba(253,251,247,0.02)]' : 'text-[rgba(253,251,247,0.4)] hover:text-[var(--mint)] hover:pl-4'}`} onClick={() => setActive(index)}>
              <strong className="flex-1 text-3xl md:text-5xl tracking-tighter font-black">{item.name}</strong>
              <ArrowUpRight size={24} className={`transition-opacity duration-300 ${active === index ? 'opacity-100 text-[var(--teal)]' : 'opacity-0'}`} />
            </button>
          ))}
        </div>
        
        <div className="min-h-[500px] border border-[rgba(253,251,247,0.15)] p-12 relative overflow-hidden bg-[rgba(4,33,22,0.4)] backdrop-blur-md rounded-lg">
          <div className="absolute -bottom-32 -right-32 w-[400px] aspect-square border border-[var(--teal)] rounded-full opacity-30" />
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <div className="flex justify-between text-[rgba(253,251,247,0.5)] text-xs font-bold tracking-widest uppercase mb-24">
                <span>{group.descriptor}</span>
                <span>{group.number} / 06</span>
              </div>
              <h3 className="text-[var(--teal)] text-5xl md:text-7xl font-black tracking-tighter mb-12">{group.name}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {group.services.map((service, index) => (
                  <motion.div key={service} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="text-sm md:text-base opacity-90 flex items-center">
                    {service} <span className="text-[var(--teal)] ml-4 font-bold">/</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="clients" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[var(--mint)] text-[var(--ink)] relative">
      <div className="flex justify-between text-[9px] uppercase tracking-[0.15em] font-bold text-[rgba(6,33,22,0.5)] mb-24 border-b border-[var(--line)] pb-4">
        <span>06 / Clients</span>
        <span>Selected company</span>
      </div>
      <Reveal>
        <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black tracking-tighter leading-none mb-24 relative z-20">
          Trusted<br />
          <em className="text-[var(--teal)] not-italic">by brands</em><br />
          with purpose<span className="text-[var(--teal)]">.</span>
        </h2>
      </Reveal>
      
      <div className="flex flex-col lg:flex-row justify-between relative z-20 gap-16">
        <div className="w-full lg:w-[60%] border-t border-[var(--line)] relative" onMouseLeave={() => setHovered(null)}>
          {clientsData.map((client, index) => (
            <Reveal key={client.name} delay={index * 0.08}>
              <div 
                className="group flex items-center justify-between min-h-[100px] border-b border-[var(--line)] px-0 transition-all duration-300 hover:pl-8 hover:bg-[rgba(212,175,55,0.03)] cursor-default"
                onMouseEnter={() => setHovered(index)}
              >
                <div className="flex items-center gap-8">
                  <div>
                    <strong className="text-2xl md:text-5xl font-black tracking-tight group-hover:text-[var(--teal)] transition-colors block">{client.name}</strong>
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity text-[var(--ink)] mt-2 block h-0 group-hover:h-auto overflow-hidden">{client.type}</span>
                  </div>
                </div>
                <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 text-[var(--teal)] transition-opacity" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="hidden lg:block w-[35%]"></div>
      </div>

      {/* Render fixed image outside of Reveal to prevent stacking context clipping */}
      <div className="fixed top-[20%] right-6 md:right-10 lg:right-[58px] bottom-[20%] w-[40vw] max-w-[600px] pointer-events-none z-0 hidden lg:block perspective-1000">
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(6,64,43,0.3)] border border-[rgba(212,175,55,0.2)]"
            >
              <img 
                src={clientsData[hovered].image} 
                alt={clientsData[hovered].name} 
                className="w-full h-full object-scale-down p-12 bg-white" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 text-white text-[10px] font-bold tracking-widest uppercase">
                <span className="text-[var(--teal)]">Client /</span> {clientsData[hovered].name}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[rgba(253,251,247,0.03)] p-12 rounded-2xl border border-[rgba(253,251,247,0.1)] backdrop-blur-md relative overflow-hidden">
      {status === "success" && (
        <div className="absolute inset-0 bg-[var(--teal)] text-[var(--ink)] flex flex-col items-center justify-center z-20">
          <h3 className="text-3xl font-black mb-2">Message Sent!</h3>
          <p className="font-bold opacity-80 text-sm tracking-widest uppercase">We'll be in touch shortly.</p>
        </div>
      )}
      <p className="text-xl font-bold mb-10 opacity-90">Have an idea? Let's talk.</p>
      {status === "error" && <p className="text-red-400 mb-6 text-sm">{errorMessage}</p>}
      <div className="flex flex-col gap-8">
        <label className="flex flex-col gap-2 text-[10px] uppercase tracking-widest font-bold opacity-70">
          Name <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-transparent border-b border-[rgba(253,251,247,0.2)] pb-2 text-base focus:border-[var(--teal)] outline-none transition-colors mt-2 text-white" />
        </label>
        <label className="flex flex-col gap-2 text-[10px] uppercase tracking-widest font-bold opacity-70">
          Email <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-transparent border-b border-[rgba(253,251,247,0.2)] pb-2 text-base focus:border-[var(--teal)] outline-none transition-colors mt-2 text-white" />
        </label>
        <label className="flex flex-col gap-2 text-[10px] uppercase tracking-widest font-bold opacity-70">
          Message <textarea rows={3} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="bg-transparent border-b border-[rgba(253,251,247,0.2)] pb-2 text-base focus:border-[var(--teal)] outline-none transition-colors mt-2 resize-none text-white" />
        </label>
        <button type="submit" disabled={status === "loading"} data-cursor="SEND" className="bg-[var(--teal)] text-[var(--ink)] py-5 px-8 rounded-full font-bold uppercase tracking-widest text-[10px] flex items-center justify-between hover:bg-white transition-colors mt-4 disabled:opacity-50">
          {status === "loading" ? "Sending..." : "Start a conversation"} <ArrowUpRight size={16} />
        </button>
      </div>
    </form>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);


  return (
    <main id="top" className="bg-[var(--mint)] text-[var(--ink)] overflow-x-hidden selection:bg-[var(--teal)] selection:text-white font-['Montserrat']">
      <CursorFollower />



      <header className={`fixed top-0 left-0 right-0 h-24 px-6 md:px-10 lg:px-[58px] z-50 flex items-center justify-between transition-colors duration-300 ${menuOpen ? "bg-[var(--deep)]" : "bg-gradient-to-b from-[rgba(6,64,43,0.9)] to-transparent backdrop-blur-sm"} border-b border-[rgba(255,255,255,0.1)]`}>
        <Logo light />
        <nav className="hidden md:flex gap-8 ml-auto mr-12 text-[10px] font-bold uppercase tracking-widest text-white opacity-80" aria-label="Main navigation">
          <SectionLink className="hover:opacity-100 hover:text-[var(--teal)] transition-colors" id="about">About</SectionLink>
          <SectionLink className="hover:opacity-100 hover:text-[var(--teal)] transition-colors" id="services">Services</SectionLink>
          <SectionLink className="hover:opacity-100 hover:text-[var(--teal)] transition-colors" id="work">Work</SectionLink>
          <SectionLink className="hover:opacity-100 hover:text-[var(--teal)] transition-colors" id="clients">Clients</SectionLink>
          <SectionLink className="hover:opacity-100 hover:text-[var(--teal)] transition-colors" id="contact">Contact</SectionLink>
        </nav>
        <MagneticLink id="contact" className="hidden md:flex gap-2 items-center text-[10px] font-bold uppercase tracking-widest text-white border-b border-white pb-1 hover:text-[var(--teal)] hover:border-[var(--teal)] transition-colors">
          Let's talk <ArrowUpRight size={14} />
        </MagneticLink>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--deep)] pt-24 px-6 md:px-10 lg:px-[58px] flex flex-col gap-8 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tight text-white mt-12">
              <SectionLink className="hover:text-[var(--teal)] transition-colors" id="about" onClick={closeMenu}>About</SectionLink>
              <SectionLink className="hover:text-[var(--teal)] transition-colors" id="services" onClick={closeMenu}>Services</SectionLink>
              <SectionLink className="hover:text-[var(--teal)] transition-colors" id="work" onClick={closeMenu}>Work</SectionLink>
              <SectionLink className="hover:text-[var(--teal)] transition-colors" id="clients" onClick={closeMenu}>Clients</SectionLink>
              <SectionLink className="hover:text-[var(--teal)] transition-colors" id="contact" onClick={closeMenu}>Contact</SectionLink>
            </nav>
            <div className="mt-auto mb-12">
              <p className="text-[var(--teal)] text-sm font-bold tracking-widest uppercase mb-4">Connect</p>
              <SectionLink id="contact" className="text-white font-bold" onClick={closeMenu}>Start a conversation <ArrowUpRight size={16} className="inline" /></SectionLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="relative h-screen min-h-[500px] md:min-h-[700px] flex flex-col justify-center bg-[var(--deep)] text-[var(--mint)] px-6 md:px-10 lg:px-[58px] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-[var(--teal)] opacity-20 blur-[140px] mix-blend-screen" />
           <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[var(--rich)] opacity-40 blur-[120px] mix-blend-screen" />
        </div>
        
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 pt-24">
          <div className="flex justify-between text-[9px] uppercase tracking-[0.15em] font-bold text-[rgba(253,251,247,0.7)] mb-16">
            <span>DEALPOST / CREATIVE + STRATEGY</span>
          </div>
          
          <Reveal delay={0.2}><p className="text-[var(--teal)] text-[11px] tracking-widest uppercase font-bold mb-6">The all-in-one marketing hub</p></Reveal>
          <Reveal delay={0.4}>
            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-black tracking-tighter leading-[0.85] max-w-6xl">
              Great Design<br />
              <em className="text-[var(--teal)] not-italic">has Creativity</em><br />
              and Strategy<span className="text-[var(--teal)]">.</span>
            </h1>
          </Reveal>
        </motion.div>
        
        <div className="absolute bottom-12 left-6 md:left-10 lg:left-[58px] right-6 md:right-10 lg:right-[58px] flex justify-between text-[9px] uppercase tracking-[0.15em] font-bold z-10 border-t border-[rgba(255,255,255,0.1)] pt-6">
          <span className="flex items-center gap-2">Scroll to explore <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}><ArrowDown size={14} /></motion.div></span>
          <span className="hidden md:block">Branding · Digital · Consulting</span>
        </div>
      </section>

      <InfiniteMarquee text="Dealpost — Creative + Strategy — Brand Narratives — " speed={70} />

      <section id="about" className="py-32 px-6 md:px-10 lg:px-[58px] min-h-screen relative">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.15em] font-bold text-[rgba(6,33,22,0.5)] mb-24 border-b border-[var(--line)] pb-4">
          <span>01 / Introduction</span>
          <span>Creativity + Strategy</span>
        </div>
        
        <div className="grid lg:grid-cols-[1fr_3fr_1.5fr] gap-12 items-center">
          <div className="text-[var(--teal)] text-[120px] md:text-[200px] leading-[0.5] font-black">“</div>
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
              Great Design<br />
              <em className="text-[var(--teal)] not-italic">has Creativity</em><br />
              and Strategy<span className="text-[var(--teal)]">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.3} className="self-end pb-8">
            <p className="text-sm leading-relaxed opacity-70 mb-8 border-l-2 border-[var(--teal)] pl-6">
              Great design, by harmonising creativity and strategy, not only captivates viewers, but also promotes engagement and helps directly to meeting business goals.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="what-we-do" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[var(--ink)] text-[var(--mint)] relative">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.15em] font-bold text-[rgba(253,251,247,0.5)] mb-24 border-b border-[rgba(253,251,247,0.1)] pb-4">
          <span>03 / What we do</span>
          <span>More than an agency</span>
        </div>
        
        <div className="grid lg:grid-cols-[1fr_2fr] gap-24">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none sticky top-32">
              More than<br />
              <em className="text-[var(--teal)] not-italic">an agency</em><span className="text-[var(--teal)]">.</span>
            </h2>
          </Reveal>
          
          <div className="flex flex-col gap-8">
            {[
              ["01", "Collaborative Extension", "Dealpost acts as an integrated extension of your team, fostering collaboration for a unified approach to marketing success."],
              ["02", "All-Encompassing Solutions", "A holistic suite of marketing solutions, covering creative, branding, digital strategies, and more, all conveniently available under one roof."],
              ["03", "All-in-One Marketing Hub", "A comprehensive marketing hub, from creative ideation to strategic implementation, find everything you need for marketing success."]
            ].map(([num, title, desc], i) => (
              <Reveal key={num} delay={i * 0.15}>
                <div className="group bg-[rgba(253,251,247,0.02)] border border-[rgba(253,251,247,0.05)] hover:bg-[rgba(253,251,247,0.05)] hover:border-[var(--teal)] transition-all duration-500 rounded-xl p-10 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--teal)] rounded-full mix-blend-screen opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500" />
                  <span className="text-[var(--teal)] text-sm font-bold block mb-4">{num}</span>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{title}</h3>
                  <p className="opacity-60 text-sm leading-relaxed max-w-xl">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <WorkRail />
      <Clients />

      {/* PHILOSOPHY */}
      <section className="py-32 px-6 md:px-10 lg:px-[58px] bg-[var(--ink)] text-[var(--mint)] min-h-screen relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] aspect-square border border-[rgba(212,175,55,0.15)] rounded-full pointer-events-none" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[60vw] aspect-square border border-[rgba(212,175,55,0.1)] rounded-full pointer-events-none" />
        <div className="flex justify-between text-[9px] uppercase tracking-[0.15em] font-bold text-[rgba(253,251,247,0.5)] mb-24 border-b border-[rgba(253,251,247,0.1)] pb-4">
          <span>07 / Philosophy</span>
          <span>Creativity + Strategy</span>
        </div>
        <div className="flex flex-col gap-24 ml-[8%] relative z-10">
          {[
            { text: ["Creativity", <em key="n" className="text-[var(--teal)] not-italic">needs</em>, "direction."], delay: 0 },
            { text: ["Strategy", <em key="n" className="text-[var(--teal)] not-italic">needs</em>, "imagination."], delay: 0.15, indent: true },
            { text: ["We bring", <em key="n" className="text-[var(--teal)] not-italic">both</em>, "together."], delay: 0.3 },
          ].map((line, i) => (
            <Reveal key={i} delay={line.delay}>
              <p className={`text-4xl md:text-6xl lg:text-[85px] font-black tracking-tighter leading-none ${line.indent ? "ml-8 md:ml-[16%]" : ""}`}>
                {line.text.map((part, j) => typeof part === "string" ? <span key={j}>{part} </span> : part)}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PERSONALITY */}
      <section className="py-32 px-6 md:px-10 lg:px-[58px] bg-[var(--mint)] text-[var(--ink)] relative overflow-hidden">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.15em] font-bold text-[rgba(6,33,22,0.5)] mb-16 border-b border-[var(--line)] pb-4">
          <span>08 / Personality</span>
          <span>Powerful / Human</span>
        </div>
        <div className="relative flex items-center justify-center min-h-[600px]">
          <motion.div 
            className="w-48 h-48 rounded-full bg-[var(--teal)] flex items-center justify-center text-[var(--ink)] font-black text-8xl relative z-10 cursor-default select-none"
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 40px rgba(212,175,55,0.3)", "0 0 80px rgba(212,175,55,0.5)", "0 0 40px rgba(212,175,55,0.3)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >d</motion.div>
          {[
            { text: "POWERFUL", pos: "top-[18%] left-[8%]", color: "" },
            { text: "FRIENDLY", pos: "top-[28%] right-[6%]", color: "text-[var(--teal)]" },
            { text: "PLAYFUL", pos: "bottom-[18%] left-[14%]", color: "" },
            { text: "KNOWLEDGEABLE", pos: "bottom-[28%] right-[4%]", color: "text-[var(--teal)]" },
          ].map(({ text, pos, color }) => (
            <Reveal key={text}>
              <p className={`absolute ${pos} text-2xl md:text-4xl lg:text-5xl font-black tracking-tight ${color}`}>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-10 lg:px-[58px] bg-[var(--ink)] text-[var(--mint)] min-h-screen flex flex-col justify-center border-t border-[rgba(253,251,247,0.1)]">

        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85]">
              Let's<br />
              <em className="text-[var(--teal)] not-italic">make</em><br />
              something<br />
              memorable<span className="text-[var(--teal)]">.</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.3}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="bg-[var(--deep)] text-white py-16 px-6 md:px-10 lg:px-[58px] border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-16 border-b border-[rgba(255,255,255,0.1)]">
          <div>
            <Logo light />
            <p className="mt-8 font-bold text-lg opacity-80">Architects of<br />Unique Brand Narratives.</p>
          </div>
          <MagneticLink id="top" className="text-xs uppercase tracking-widest font-bold opacity-70 hover:opacity-100 hover:text-[var(--teal)] flex items-center gap-2">
            Back to top <MoveUpRight size={16} />
          </MagneticLink>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 opacity-60 text-xs font-bold uppercase tracking-widest">
          <div className="flex flex-col gap-4">
            <span className="text-[var(--teal)] mb-2">Navigate</span>
            <SectionLink id="about" className="hover:text-white">About</SectionLink>
            <SectionLink id="services" className="hover:text-white">Services</SectionLink>
            <SectionLink id="work" className="hover:text-white">Work</SectionLink>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[var(--teal)] mb-2">Connect</span>
            <a href="https://dealpost.co.in" target="_blank" rel="noreferrer" className="hover:text-white">dealpost.co.in</a>
            <SectionLink id="contact" className="hover:text-white">Start a conversation</SectionLink>
          </div>
          <div className="lg:col-span-2 flex flex-col justify-end lg:text-right gap-2">
            <p>Chennai / India</p>
            <p>© {new Date().getFullYear()} Dealpost</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
