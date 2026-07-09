import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1501757546545-bcc19d7e8cec?w=1800&h=1100&fit=crop&auto=format",
  botanicals: "https://images.unsplash.com/photo-1779617113701-66d4df45645f?w=900&h=1200&fit=crop&auto=format",
  candles: "https://images.unsplash.com/photo-1734901404365-e93d979b575b?w=900&h=700&fit=crop&auto=format",
  incense: "https://images.unsplash.com/photo-1763994683525-885156ac4aa4?w=900&h=1100&fit=crop&auto=format",
  monk: "https://images.unsplash.com/photo-1772333171083-1b53655754a9?w=800&h=1100&fit=crop&auto=format",
  gathering: "https://images.unsplash.com/photo-1778778984602-40d539c752c1?w=1600&h=900&fit=crop&auto=format",
};

const practices = [
  {
    number: "I",
    name: "Lectura de Tarot",
    latin: "Tarot Reading",
    time: "Disponible 24/7",
    frequency: "Consulta",
    description:
      "Obtén orientación personalizada sobre situaciones sentimentales, decisiones importantes, bloqueos emocionales y caminos futuros mediante una lectura profunda del tarot.",
    element: "Aire",
  },

  {
    number: "II",
    name: "Amor y Restauración",
    latin: "Love & Restoration",
    time: "Consulta personalizada",
    frequency: "Especial",
    description:
      "Procesos enfocados en reconciliación, fortalecimiento emocional y restauración de vínculos afectivos.",
    element: "Agua",
  },

  {
    number: "III",
    name: "Suerte y Prosperidad",
    latin: "Luck & Prosperity",
    time: "Consulta personalizada",
    frequency: "Especial",
    description:
      "Orientación y rituales enfocados en oportunidades económicas, abundancia y apertura de caminos.",
    element: "Tierra",
  },

  {
    number: "IV",
    name: "Protección Espiritual",
    latin: "Spiritual Protection",
    time: "Disponible",
    frequency: "Consulta",
    description:
      "Sesiones enfocadas en equilibrio energético, protección espiritual y fortalecimiento personal.",
    element: "Fuego",
  },
];

const elements = [
  {
    name: "Amor",
    eng: "Love",
    symbol: "♥",
    desc: "Conexiones emocionales, reconciliación y fortalecimiento de relaciones.",
    color: "#8B1E3F",
  },

  {
    name: "Dinero",
    eng: "Money",
    symbol: "$",
    desc: "Abundancia, oportunidades y crecimiento económico.",
    color: "#B8860B",
  },

  {
    name: "Protección",
    eng: "Protection",
    symbol: "✦",
    desc: "Equilibrio energético y seguridad espiritual.",
    color: "#4A5A6A",
  },

  {
    name: "Destino",
    eng: "Destiny",
    symbol: "☾",
    desc: "Orientación y comprensión del camino personal.",
    color: "#786FA6",
  },
];

const offerings = [
  {
    name: "Consulta Tarot Premium",
    material: "Lectura personalizada",
    duration: "45 minutos",
    note: "Sesión privada enfocada en orientación y claridad",
    img: "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?w=600",
  },

  {
    name: "Ritual de Amor",
    material: "Consulta y acompañamiento",
    duration: "Proceso personalizado",
    note: "Enfocado en restauración emocional y relaciones",
    img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
  },

  {
    name: "Ritual Prosperidad",
    material: "Orientación energética",
    duration: "Sesión personalizada",
    note: "Enfocado en oportunidades y abundancia",
    img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600",
  },
];
function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "", style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-700"
        style={{
          background: scrolled ? "rgba(12,10,7,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,134,78,0.12)" : "1px solid transparent",
        }}
      >
        <span
          className="text-xs tracking-[0.25em] uppercase"
          style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
        >
          VÍNCULOS DEL DESTINO
        </span>
        <div className="hidden md:flex items-center gap-10">
          {[["Prácticas", "practicas"], ["Elementos", "elementos"], ["Ofrenda", "ofrenda"], ["Contacto", "contacto"]].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-xs tracking-widest uppercase transition-colors duration-300"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "var(--muted-foreground)",
                fontWeight: 300,
                letterSpacing: "0.18em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-xs tracking-widest uppercase"
          style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Cerrar" : "Menú"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-background"
          onClick={() => setMenuOpen(false)}
        >
          {[["Prácticas", "practicas"], ["Elementos", "elementos"], ["Ofrenda", "ofrenda"], ["Contacto", "contacto"]].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-2xl tracking-widest"
              style={{ fontFamily: "'IM Fell English', serif", color: "var(--foreground)" }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Hero */}
     <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-22 overflow-hidden bg-[#0c0a07]">
        <img
          src={IMAGES.hero}
          alt="Rows of white candles in a dark ceremonial space"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.28 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(12,10,7,0.2) 0%, rgba(12,10,7,0.1) 50%, rgba(12,10,7,0.95) 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-12"
            style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
          >
            Tarot • Amor • Destino • Prosperidad • Protección
          </p>
          <h1
            className="text-6xl md:text-8xl leading-none mb-8"
            style={{
              fontFamily: "'IM Fell English', serif",
              color: "var(--foreground)",
              fontWeight: 400,
              letterSpacing: "0.04em",
            }}
          >
            VÍNCULOS DEL DESTINO
          </h1>
          <p
            className="text-xl md:text-2xl leading-relaxed italic max-w-lg"
            style={{ color: "rgba(229,217,193,0.6)", fontWeight: 300 }}
          >
            Encuentra respuestas, claridad y guía espiritual para tu camino.
          </p>
          <div
            className="mt-16 flex flex-col items-center gap-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            <span className="text-xs tracking-widest" style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300 }}>
              DESCUBRIR
            </span>
            <svg width="1" height="48" viewBox="0 0 1 48" fill="none">
              <line x1="0.5" y1="0" x2="0.5" y2="48" stroke="rgba(184,134,78,0.4)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-28 md:py-40">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <Reveal className="md:col-span-5">
            <div className="relative">
              <img
                src={IMAGES.botanicals}
                alt="Dried botanicals glowing softly in dim light"
                className="w-full object-cover bg-[#1a1409]"
                style={{ height: "520px" }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{ background: "linear-gradient(to top, #0c0a07, transparent)" }}
              />
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-7 md:pt-20">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-8"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
            >
              Sobre Nosotros
            </p>
            <h2
              className="text-3xl md:text-4xl leading-snug mb-8"
              style={{ fontFamily: "'IM Fell English', serif", color: "var(--foreground)" }}
            >
              Conectamos tu energía con nuevas posibilidades
            </h2>
            <p className="text-lg leading-loose mb-6" style={{ color: "rgba(229,217,193,0.7)", fontWeight: 300 }}>
              Nos enfocamos en brindar orientación espiritual y acompañamiento personalizado mediante consultas y rituales enfocados en el amor, la prosperidad, la protección y el crecimiento personal. <em>Este momento es diferente, este momento importa.</em>
            </p>
            <p className="text-lg leading-loose" style={{ color: "rgba(229,217,193,0.7)", fontWeight: 300 }}>
              Cada consulta busca ofrecer claridad y apoyo para ayudarte a comprender mejor las situaciones que atraviesas.
            </p>
            <div
              className="mt-12 pt-8"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <p
                className="text-xs tracking-[0.25em]"
                style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", fontWeight: 300 }}
              >
                Consultas personalizadas — Atención online
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Practices */}
      <section
        id="practicas"
        className="py-24 md:py-36"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
            >
              Nuestros Servicios
            </p>
            <h2
              className="text-3xl md:text-5xl mb-20 max-w-lg leading-tight"
              style={{ fontFamily: "'IM Fell English', serif" }}
            >
              Servicios diseñados para orientación y acompañamiento espiritual.
            </h2>
          </Reveal>

          {/* Practice tabs */}
          <div className="flex gap-0 mb-16 overflow-x-auto">
            {practices.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="flex-shrink-0 px-6 py-4 text-xs tracking-widest uppercase transition-all duration-300"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  borderBottom: activeTab === i ? "1px solid var(--accent)" : "1px solid var(--border)",
                  color: activeTab === i ? "var(--foreground)" : "var(--muted-foreground)",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {p.number} — {p.element}
              </button>
            ))}
          </div>

          <div
            key={activeTab}
            className="grid md:grid-cols-12 gap-12"
            style={{ animation: "fadeIn 0.5s ease" }}
          >
            <div className="md:col-span-7">
              <p
                className="text-xs tracking-widest uppercase mb-4"
                style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", fontWeight: 300 }}
              >
                {practices[activeTab].latin}
              </p>
              <h3
                className="text-3xl md:text-4xl mb-8 leading-tight"
                style={{ fontFamily: "'IM Fell English', serif", color: "var(--foreground)" }}
              >
                {practices[activeTab].name}
              </h3>
              <p className="text-xl leading-relaxed mb-10" style={{ color: "rgba(229,217,193,0.72)", fontWeight: 300 }}>
                {practices[activeTab].description}
              </p>
              <div className="flex gap-12">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", fontWeight: 300 }}
                  >
                    Horario
                  </p>
                  <p style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>
                    {practices[activeTab].time}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", fontWeight: 300 }}
                  >
                    Frecuencia
                  </p>
                  <p style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>
                    {practices[activeTab].frequency}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex items-center justify-center">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 200,
                  height: 200,
                  border: "1px solid var(--border)",
                  borderRadius: "50%",
                }}
              >
                <span
                  className="text-8xl"
                  style={{ fontFamily: "'IM Fell English', serif", color: "var(--accent)", opacity: 0.5 }}
                >
                  {practices[activeTab].number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed quote */}
      <section className="relative py-36 overflow-hidden bg-[#0c0a07]">
        <img
          src={IMAGES.gathering}
          alt="People gathered around a smoking incense burner in ceremony"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(12,10,7,0.6)" }} />
        <Reveal className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p
            className="text-4xl md:text-6xl leading-tight italic"
            style={{ fontFamily: "'IM Fell English', serif", color: "var(--foreground)" }}
          >
            "Cada respuesta comienza con una pregunta."
          </p>
          <div
            className="mt-8 mx-auto"
            style={{ width: 40, height: 1, background: "var(--accent)" }}
          />
          <p
            className="mt-6 text-sm tracking-widest uppercase"
            style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", fontWeight: 300 }}
          >
            Nuestra Filosofía
          </p>
        </Reveal>
      </section>

      {/* Elements */}
      <section
        id="elementos"
        className="py-28 md:py-40"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
            >
              Áreas de Orientación
            </p>
            <h2
              className="text-3xl md:text-5xl mb-20 max-w-lg leading-tight"
              style={{ fontFamily: "'IM Fell English', serif" }}
            >
              Distintas áreas para ayudarte a encontrar claridad.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-px" style={{ background: "var(--border)" }}>
            {elements.map((el, i) => (
              <Reveal
                key={el.name}
                delay={i * 80}
                className="p-8 md:p-10 flex flex-col gap-6 group transition-colors duration-500 cursor-default"
                style={{ background: "var(--background)" }}
              >
                <div
                  className="text-3xl"
                  style={{ color: el.color, transition: "opacity 0.3s" }}
                >
                  {el.symbol}
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", fontWeight: 300 }}
                  >
                    {el.eng}
                  </p>
                  <h3
                    className="text-2xl"
                    style={{ fontFamily: "'IM Fell English', serif", color: "var(--foreground)" }}
                  >
                    {el.name}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(229,217,193,0.55)", fontWeight: 300 }}
                >
                  {el.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Monk image + incense side by side */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pb-28 md:pb-40">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="relative overflow-hidden bg-[#1a1409]" style={{ height: 480 }}>
              <img
                src={IMAGES.monk}
                alt="Robed figure standing near trees in contemplation"
                className="w-full h-full object-cover"
                style={{ opacity: 0.85 }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(12,10,7,0.3), transparent)" }}
              />
              <div className="absolute bottom-8 left-8">
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'DM Mono', monospace", color: "rgba(229,217,193,0.5)", fontWeight: 300 }}
                >
                  Orientación y equilibrio
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden bg-[#1a1409]" style={{ height: 480 }}>
              <img
                src={IMAGES.incense}
                alt="Man lighting incense sticks in a temple"
                className="w-full h-full object-cover"
                style={{ opacity: 0.75 }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(12,10,7,0.3), transparent)" }}
              />
              <div className="absolute bottom-8 left-8">
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'DM Mono', monospace", color: "rgba(229,217,193,0.5)", fontWeight: 300 }}
                >
                  Conexión espiritual
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Offerings */}
      <section
        id="ofrenda"
        className="py-28 md:py-40"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
            >
              Servicios Destacados
            </p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
              <h2
                className="text-3xl md:text-5xl leading-tight max-w-md"
                style={{ fontFamily: "'IM Fell English', serif" }}
              >
                Consultas y procesos personalizados
              </h2>
              <a
                href="#"
                className="text-xs tracking-widest uppercase self-start md:self-end pb-1 transition-colors duration-300"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "var(--accent)",
                  borderBottom: "1px solid var(--accent)",
                  fontWeight: 300,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Ver todo
              </a>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {offerings.map((item, i) => (
              <Reveal key={item.name} delay={i * 100}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden mb-6 bg-[#1a1409]" style={{ height: 340 }}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ opacity: 0.82 }}
                    />
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <h3
                      className="text-xl"
                      style={{ fontFamily: "'IM Fell English', serif", color: "var(--foreground)" }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="text-xs pt-1"
                      style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
                    >
                      {item.duration}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace", fontWeight: 300 }}
                  >
                    {item.material}
                  </p>
                  <p className="text-sm italic" style={{ color: "rgba(229,217,193,0.45)" }}>
                    {item.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Close */}
      <section
        id="contacto"
        className="py-28 md:py-40"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--accent)", fontWeight: 300 }}
            >
              Contáctanos
            </p>
            <h2
              className="text-3xl md:text-5xl mb-6 leading-tight"
              style={{ fontFamily: "'IM Fell English', serif" }}
            >
              Solicita tu consulta personalizada
            </h2>
            <p className="text-lg mb-12 leading-relaxed" style={{ color: "rgba(229,217,193,0.6)", fontWeight: 300 }}>
              Orientación y apoyo personalizado para ayudarte a navegar por las diferentes etapas de tu vida.
            </p>
            <div className="flex gap-0 max-w-md mx-auto" style={{ borderBottom: "1px solid var(--border)" }}>
              <input
                type="email"
                placeholder="correo@tudominio.com"
                className="flex-1 bg-transparent text-foreground outline-none py-3 text-base"
                style={{ fontFamily: "'Crimson Pro', serif", color: "var(--foreground)", caretColor: "var(--accent)" }}
              />
              <button
                className="px-6 py-3 text-xs tracking-widest uppercase transition-colors duration-300"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: "var(--accent)",
                  fontWeight: 300,
                  background: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--accent)")}
              >
                Suscribir
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
<footer
  className="w-full mt-24 border-t"
  style={{ borderColor: "rgba(229,217,193,0.12)" }}
>
  <div className="max-w-6xl mx-auto py-14 px-6 flex flex-col items-center justify-center">

    <h3
      className="text-lg tracking-[0.35em] uppercase mb-8"
      style={{ color: "var(--muted-foreground)" }}
    >
      Vínculos del Destino
    </h3>

    <div className="flex items-center justify-center gap-10 text-3xl">

      <a
        href="https://www.instagram.com/vinculosdestino?igsh=NGZzbzV6YXpxeW00&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-125"
        style={{ color: "var(--muted-foreground)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
      >
        <FaInstagram />
      </a>

      <a
        href="https://wa.me/message/KYXYN7UEKJM6N1"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-125"
        style={{ color: "var(--muted-foreground)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
      >
        <FaWhatsapp />
      </a>

      <a
        href="https://www.tiktok.com/@tuusuario"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-125"
        style={{ color: "var(--muted-foreground)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
      >
        <FaTiktok />
      </a>

      <a
        href="https://wa.me/message/KYXYN7UEKJM6N1"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-125"
        style={{ color: "var(--muted-foreground)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
      >
        <FaFacebook/>
      </a>

      <a
        href="mailto:correo@dominio.com"
        className="transition-all duration-300 hover:scale-125"
        style={{ color: "var(--muted-foreground)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
      >
        <MdEmail />
      </a>

    </div>

    <p
      className="mt-10 text-sm tracking-wider text-center"
      style={{ color: "var(--muted-foreground)" }}
    >
      © {new Date().getFullYear()} Vínculos del Destino · Todos los derechos reservados.
    </p>

  </div>
</footer>

     <style>
  {`
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    html {
      scroll-behavior: smooth;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #090806;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(
        to bottom,
        #6d532b,
        #b8864e,
        #d8b16c
      );
      border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(
        to bottom,
        #8d6a34,
        #d6aa59,
        #f2cb7d
      );
    }

    ::placeholder {
      color: rgba(229, 217, 193, 0.25);
    }
  `}
</style>
    </div>
  );
}
