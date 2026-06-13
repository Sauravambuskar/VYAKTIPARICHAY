import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Search, Menu, X, Phone, Mail, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "larger">("normal");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/profiles", label: "Directory" },
    { href: "/create-profile", label: "Submit Profile" },
    { href: "#about", label: "About Us" },
    { href: "#contact", label: "Contact" },
  ];

  const fontSizeClass = fontSize === "large" ? "text-lg" : fontSize === "larger" ? "text-xl" : "";

  return (
    <div className={cn("min-h-screen flex flex-col bg-white text-foreground", fontSizeClass)}>

      {/* ── TOP UTILITY BAR ── */}
      <div className="bg-[#1a2d4f] text-white text-xs py-1.5 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-white/70">
            <a href="#main" className="hover:text-white transition-colors px-2 py-0.5 hover:underline">Skip to Main Content</a>
            <span className="text-white/30">|</span>
            <a href="/" className="hover:text-white transition-colors px-2 py-0.5">Home</a>
            <span className="text-white/30">|</span>
            <a href="#about" className="hover:text-white transition-colors px-2 py-0.5">About Us</a>
            <span className="text-white/30">|</span>
            <a href="#contact" className="hover:text-white transition-colors px-2 py-0.5">Contact Us</a>
            <span className="text-white/30">|</span>
            <a href="#" className="hover:text-white transition-colors px-2 py-0.5">Sitemap</a>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/50 px-1">Font:</span>
            <button onClick={() => setFontSize("normal")} className={cn("px-2 py-0.5 text-xs rounded", fontSize === "normal" ? "text-white font-bold" : "text-white/50 hover:text-white")}>A-</button>
            <button onClick={() => setFontSize("large")} className={cn("px-2 py-0.5 text-sm rounded", fontSize === "large" ? "text-white font-bold" : "text-white/50 hover:text-white")}>A</button>
            <button onClick={() => setFontSize("larger")} className={cn("px-2 py-0.5 text-base rounded", fontSize === "larger" ? "text-white font-bold" : "text-white/50 hover:text-white")}>A+</button>
            <span className="text-white/30 mx-1">|</span>
            <button className="text-[#FF9933] font-bold px-2 py-0.5 hover:text-white transition-colors">हिंदी</button>
            <span className="text-white/30">|</span>
            <button className="text-white/70 px-2 py-0.5 hover:text-white transition-colors">English</button>
            <span className="text-white/30 mx-1">|</span>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white px-1"><Facebook className="w-3 h-3" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white px-1"><Twitter className="w-3 h-3" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white px-1"><Youtube className="w-3 h-3" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white px-1"><Instagram className="w-3 h-3" /></a>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <header className="bg-white border-b-4 border-primary shadow-md sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] border-2 border-primary flex items-center justify-center shadow-md">
              <div className="w-5 h-5 rounded-full bg-[#000080] border-2 border-white" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold text-[#1a2d4f] leading-tight tracking-tight">Vyakti Parichay</div>
              <div className="text-[10px] text-muted-foreground tracking-wide hidden sm:block">व्यक्ति परिचय | India's Premier Identity Platform</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold px-3 py-5 border-b-4 transition-colors whitespace-nowrap",
                  location === link.href
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-[#1a2d4f] hover:border-primary hover:text-primary hover:bg-primary/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded border border-border hover:bg-muted transition-colors">
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>
            <Link
              href="/create-profile"
              className="hidden md:inline-flex items-center bg-primary text-white text-sm font-bold px-4 py-2 rounded hover:bg-primary/90 transition-colors shadow-sm"
            >
              Get Featured
            </Link>
            <button className="lg:hidden p-2 rounded border border-border" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white px-4 py-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={cn("block py-2.5 px-3 text-sm font-bold border-b border-border/50", location === link.href ? "text-primary" : "text-foreground")}>
                {link.label}
              </Link>
            ))}
            <Link href="/create-profile" onClick={() => setMobileOpen(false)}
              className="block mt-3 mb-2 text-center bg-primary text-white text-sm font-bold py-2.5 rounded">
              Get Featured
            </Link>
          </div>
        )}
      </header>

      {/* ── ANNOUNCEMENT TICKER ── */}
      <div className="bg-primary text-white py-2 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-3">
          <span className="shrink-0 bg-white text-primary text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">New</span>
          <div className="overflow-hidden whitespace-nowrap">
            <span className="inline-block animate-marquee text-sm font-medium">
              Vyakti Parichay now features 500+ verified professionals across India &nbsp;|&nbsp; Submit your profile and get a verified digital identity &nbsp;|&nbsp; Recognition Ceremony 2025 – Register Now &nbsp;|&nbsp; New categories added: Healthcare, Arts, Technology, Sports &nbsp;|&nbsp; Contact: +91 8888116157 &nbsp;|&nbsp;
            </span>
          </div>
        </div>
      </div>

      <main id="main" className="flex-1">{children}</main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a2d4f] text-white">
        <div className="max-w-[1200px] mx-auto px-4 pt-12 pb-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] border-2 border-white/30 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#000080] border-2 border-white" />
              </div>
              <div>
                <div className="font-bold text-[#FF9933]">Vyakti Parichay</div>
                <div className="text-white/50 text-[10px]">व्यक्ति परिचय</div>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed mb-4">
              India's premier digital identity platform. We immortalize the journeys of inspiring individuals, creating a lasting legacy for future generations.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded bg-white/10 hover:bg-primary transition-colors flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Vyakti Parichay links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-white/20 pb-2">Vyakti Parichay</h4>
            <ul className="space-y-2 text-white/60">
              {["Home", "Directory", "Submit Profile", "Featured Profiles", "About Us"].map(l => (
                <li key={l}><a href="#" className="hover:text-[#FF9933] hover:underline transition-colors text-xs">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-white/20 pb-2">Useful Links</h4>
            <ul className="space-y-2 text-white/60">
              {["Privacy Policy", "Terms of Service", "Disclaimer", "Accessibility", "Sitemap", "RTI"].map(l => (
                <li key={l}><a href="#" className="hover:text-[#FF9933] hover:underline transition-colors text-xs">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-white/20 pb-2">Help &amp; Support</h4>
            <ul className="space-y-2 text-white/60">
              {["FAQ", "Profile Guidelines", "Verification Process", "Content Policy", "Grievance Redressal"].map(l => (
                <li key={l}><a href="#" className="hover:text-[#FF9933] hover:underline transition-colors text-xs">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 border-b border-white/20 pb-2">Contact With Us</h4>
            <ul className="space-y-3 text-white/60 text-xs">
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF9933] mt-0.5 shrink-0" />
                <span>+91 8888116157</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF9933] mt-0.5 shrink-0" />
                <span className="break-all">vyaktiparichaya_office<br />@gmail.com</span>
              </li>
              <li className="text-white/40 mt-2">Mon – Sat: 10AM – 7PM</li>
            </ul>
            <div className="mt-4">
              <div className="text-[10px] text-white/40 mb-2">Last Updated: June 2025</div>
              <div className="bg-white/10 rounded p-2 text-[10px] text-white/50">
                Visitors: <span className="text-[#FF9933] font-bold">1,24,587</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Vyakti Parichay. All rights reserved. | The information on this website is published for general awareness.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
