import { useState, useRef, useEffect } from "react";
import { ChevronDown, Phone, Menu, X } from "lucide-react";

const NAVY = "#1c2035";
const GREEN = "#8dc63f";
const YELLOW = "#c8d400";

const leistungen = [
  { title: "Elektro-Dienstleistungen für Privatkunden", sub: "Elektroinstallationen für Ihr Zuhause", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { title: "Elektro-Dienstleistungen für Gewerbekunden", sub: "Einbau, Austausch und Wartung", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80" },
  { title: "Smart-Home Lösungen", sub: "Smart-Home Lösungen für Ihr Zuhause", img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80" },
  { title: "Lichtdesign und -installation", sub: "Lichtdesign und -installation", img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80" },
  { title: "Notfallreparaturen", sub: "Schnelle Hilfe rund um die Uhr", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80" },
];

const energieloesungen = [
  { title: "Photovoltaik-Anlagen", sub: "Einbau, Austausch und Wartung", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80" },
  { title: "Solaranlagen-Installation", sub: "Einbau, Austausch und Wartung", img: "https://images.unsplash.com/photo-1655300256335-beef51a914fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80" },
  { title: "Energieeffiziente Beleuchtung", sub: "Lichtdesign und -installation", img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&q=80" },
  { title: "Ladestationen für E-Fahrzeuge", sub: "Lichtdesign und -installation", img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80" },
];

function Logo() {
  return (
    <svg width="30" height="36" viewBox="0 0 36 44" fill="none">
      {/* vertical stem with bottom-left hook */}
      <path d="M10 4 L10 38 Q10 42 5 42" stroke={GREEN} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* top bar */}
      <path d="M10 4 L28 4" stroke={GREEN} strokeWidth="4.5" strokeLinecap="round" />
      {/* middle bar (shorter) */}
      <path d="M10 23 L22 23" stroke={GREEN} strokeWidth="4.5" strokeLinecap="round" />
      {/* bottom bar */}
      <path d="M10 38 L26 38" stroke={GREEN} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Dropdown ── */
function DropdownPanel({ items, navRef }: { items: typeof leistungen; navRef: React.RefObject<HTMLElement | null> }) {
  const [top, setTop] = useState(64);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState("100vw");

  useEffect(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setTop(rect.bottom);
      setLeft(rect.left);
      setWidth(`${rect.width}px`);
    }
  }, [navRef]);

  return (
    <div
      style={{
        position: "fixed",
        top,
        left,
        width,
        background: NAVY,
        borderTop: `2px solid ${GREEN}`,
        zIndex: 50,
        padding: "24px 32px",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 16 }}>
        {items.map((item) => (
          <a key={item.title} href="#" className="flex flex-col gap-2 group">
            <div style={{ aspectRatio: "16/10", overflow: "hidden", borderRadius: 4 }}>
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-white text-xs font-semibold leading-snug group-hover:text-[#8dc63f] transition-colors">
              {item.title}
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{item.sub}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function NavItem({ label, items, navRef }: { label: string; items?: typeof leistungen; navRef: React.RefObject<HTMLElement | null> }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!items) {
    return (
      <a href="#" className="text-sm font-medium whitespace-nowrap transition-colors" style={{ color: "rgba(255,255,255,0.85)" }}
        onMouseEnter={e => (e.currentTarget.style.color = "white")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}>
        {label}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 text-sm font-medium whitespace-nowrap transition-colors"
        style={{ color: open ? "white" : "rgba(255,255,255,0.85)" }}
      >
        {label}
        <ChevronDown size={13} style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && <DropdownPanel items={items} navRef={navRef} />}
    </div>
  );
}

/* ── Mobile menu ── */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [
    { label: "Über uns", items: null },
    { label: "Leistungen", items: leistungen },
    { label: "Nachhaltigkeit & Energielösungen", items: energieloesungen },
    { label: "Offene Stellen", items: null },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: NAVY }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <Logo />
        <button onClick={onClose} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
          Schließen <X size={16} />
        </button>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto">
        {sections.map(({ label, items }) => (
          <div key={label} style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
            {!items ? (
              <a href="#" onClick={onClose} className="flex items-center px-6 py-4 text-sm font-semibold transition-colors"
                style={{ color: "rgba(255,255,255,0.85)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}>
                {label}
              </a>
            ) : (
              <>
                <button
                  onClick={() => setOpenSection(openSection === label ? null : label)}
                  className="flex items-center justify-between w-full px-6 py-4 text-sm font-semibold transition-colors"
                  style={{ color: openSection === label ? "white" : "rgba(255,255,255,0.85)" }}
                >
                  {label}
                  <ChevronDown
                    size={15}
                    style={{ color: openSection === label ? GREEN : "rgba(255,255,255,0.4)", transition: "transform .2s", transform: openSection === label ? "rotate(180deg)" : "none" }}
                  />
                </button>

                {openSection === label && (
                  <div style={{ background: "rgba(0,0,0,0.2)" }}>
                    {items.map((item) => (
                      <a
                        key={item.title}
                        href="#"
                        onClick={onClose}
                        className="flex items-center gap-4 px-6 py-3 group"
                        style={{ borderTop: `1px solid rgba(255,255,255,0.04)` }}
                      >
                        <div style={{ width: 48, height: 34, borderRadius: 3, overflow: "hidden", flexShrink: 0 }}>
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-medium leading-snug group-hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>
                          {item.title}
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-6 flex flex-col gap-3" style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}>
        <a href="tel:+4912345678" className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          <Phone size={14} strokeWidth={1.5} style={{ color: GREEN }} />
          +49 12345 6789
        </a>
        <a href="#" className="flex items-center justify-center py-3 rounded text-sm font-bold" style={{ background: GREEN, color: NAVY }}>
          Kontakt
        </a>
      </div>
    </div>
  );
}

/* ── Navbar ── */
export default function NavbarB() {
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  return (
    <>
      <nav ref={navRef} className="w-full h-16 flex items-center" style={{ background: NAVY }}>
        <div className="w-full max-w-screen-xl mx-auto px-6 flex items-center gap-8">
          <a href="#" className="flex-shrink-0"><Logo /></a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7 flex-1">
            <NavItem label="Über uns" navRef={navRef} />
            <NavItem label="Leistungen" items={leistungen} navRef={navRef} />
            <NavItem label="Nachhaltigkeit & Energielösungen" items={energieloesungen} navRef={navRef} />
            <NavItem label="Offene Stellen" navRef={navRef} />
          </div>
          <div className="hidden lg:flex items-center gap-5 ml-auto">
            <a href="#" className="px-5 py-[7px] rounded text-sm font-bold" style={{ background: GREEN, color: NAVY }}>Kontakt</a>
            <a href="tel:+4912345678" className="flex items-center gap-2 text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.8)" }}>
              <Phone size={14} strokeWidth={1.5} />&nbsp;+49 12345 6789
            </a>
          </div>

          {/* Tablet */}
          <div className="hidden md:flex lg:hidden items-center gap-3 ml-auto">
            <a href="#" className="px-4 py-[7px] rounded text-sm font-bold" style={{ background: GREEN, color: NAVY }}>Kontakt</a>
            <a href="tel:+4912345678" className="flex items-center gap-2 text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.8)" }}>
              <Phone size={14} strokeWidth={1.5} />&nbsp;+49 12345 6789
            </a>
            <button onClick={() => setMobile(true)} style={{ color: "rgba(255,255,255,0.7)" }}><Menu size={22} /></button>
          </div>

          {/* Small */}
          <div className="hidden sm:flex md:hidden items-center gap-3 ml-auto">
            <a href="tel:+4912345678" className="flex items-center gap-2 text-sm whitespace-nowrap" style={{ color: "rgba(255,255,255,0.8)" }}>
              <Phone size={14} strokeWidth={1.5} />&nbsp;+49 12345 6789
            </a>
            <button onClick={() => setMobile(true)} style={{ color: "rgba(255,255,255,0.7)" }}><Menu size={22} /></button>
          </div>

          {/* XS */}
          <div className="flex sm:hidden ml-auto">
            <button onClick={() => setMobile(true)} style={{ color: "rgba(255,255,255,0.7)" }}><Menu size={22} /></button>
          </div>
        </div>
      </nav>

      {mobile && <MobileMenu onClose={() => setMobile(false)} />}
    </>
  );
}
