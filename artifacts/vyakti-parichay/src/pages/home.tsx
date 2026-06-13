import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ProfileCard } from "@/components/profile-card";
import { useGetFeaturedProfiles, useGetProfileStats, getGetFeaturedProfilesQueryKey, getGetProfileStatsQueryKey } from "@workspace/api-client-react";
import { ChevronRight, ChevronLeft, ArrowRight, CheckCircle, Users, Award, Globe, BookOpen, Briefcase, Star, Heart, Shield, Phone, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const bannerSlides = [
  {
    bg: "from-[#FF9933] to-[#e67e00]",
    tag: "INDIA'S PREMIER PLATFORM",
    title: "Your Identity.\nYour Story.\nYour Legacy.",
    desc: "An exclusive platform for remarkable individuals to immortalize their journey, celebrate achievements, and inspire the next generation across India.",
    cta: "Submit Your Profile",
    ctaHref: "/create-profile",
    cta2: "Explore Directory",
    cta2Href: "/profiles",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop",
    badge: "500+ Verified Profiles",
  },
  {
    bg: "from-[#1a2d4f] to-[#243b6a]",
    tag: "GET VERIFIED TODAY",
    title: "Build Your Digital\nIdentity With\nCredibility",
    desc: "Join doctors, entrepreneurs, artists, politicians, and social workers who trust Vyakti Parichay to preserve their professional legacy.",
    cta: "Get Verified",
    ctaHref: "/create-profile",
    cta2: "How It Works",
    cta2Href: "/profiles",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
    badge: "Trusted by Leaders",
  },
  {
    bg: "from-[#138808] to-[#0f6606]",
    tag: "RECOGNITION CEREMONY 2025",
    title: "Celebrating India's\nGreatest Minds &\nChange Makers",
    desc: "Annual recognition ceremony honouring distinguished professionals across Maharashtra and India. Nominations now open for all categories.",
    cta: "Nominate Now",
    ctaHref: "/create-profile",
    cta2: "View Profiles",
    cta2Href: "/profiles",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=600&fit=crop",
    badge: "Annual Awards 2025",
  },
];

const categories = [
  { label: "Entrepreneurs", icon: Briefcase, color: "bg-orange-100 border-orange-300 text-orange-700" },
  { label: "Doctors", icon: Heart, color: "bg-red-100 border-red-300 text-red-700" },
  { label: "Educators", icon: BookOpen, color: "bg-blue-100 border-blue-300 text-blue-700" },
  { label: "Politicians", icon: Globe, color: "bg-purple-100 border-purple-300 text-purple-700" },
  { label: "Artists", icon: Star, color: "bg-yellow-100 border-yellow-300 text-yellow-700" },
  { label: "Social Workers", icon: Users, color: "bg-green-100 border-green-300 text-green-700" },
  { label: "Industry Experts", icon: Award, color: "bg-indigo-100 border-indigo-300 text-indigo-700" },
  { label: "Public Figures", icon: Shield, color: "bg-teal-100 border-teal-300 text-teal-700" },
];

const events = [
  { date: "15 Jun 2025", title: "Vyakti Parichay Recognition Ceremony 2025", location: "Taj Hotel, Pune, Maharashtra", tag: "Ceremony" },
  { date: "22 Jun 2025", title: "Digital Identity Workshop for Entrepreneurs", location: "Bombay Chamber of Commerce, Mumbai", tag: "Workshop" },
  { date: "05 Jul 2025", title: "Healthcare Heroes — Profile Submission Drive", location: "IMA Headquarters, Nagpur", tag: "Drive" },
  { date: "19 Jul 2025", title: "Meet The Icons — Networking Event", location: "Hotel Marriott, Bengaluru", tag: "Networking" },
];

const calDays = ["S", "M", "T", "W", "T", "F", "S"];
const calDates = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, null, null, null, null, null],
];

const galleryItems = [
  { type: "Photos", year: "2024", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=270&fit=crop", caption: "Recognition Ceremony 2024, Pune" },
  { type: "Photos", year: "2024", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=270&fit=crop", caption: "Entrepreneurs Meet, Mumbai 2024" },
  { type: "Photos", year: "2024", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=270&fit=crop", caption: "Healthcare Leaders Summit 2024" },
  { type: "Photos", year: "2023", img: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=400&h=270&fit=crop", caption: "Annual Awards Night 2023" },
  { type: "Photos", year: "2023", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=270&fit=crop", caption: "Verification Drive 2023, Nagpur" },
  { type: "Photos", year: "2023", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=270&fit=crop", caption: "Digital India Summit Participation" },
  { type: "Events", year: "2024", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=270&fit=crop", caption: "Women in Leadership Felicitation 2024" },
  { type: "Events", year: "2023", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=270&fit=crop", caption: "Social Entrepreneurship Conference 2023" },
];

const pressItems = [
  {
    date: "10 Jun 2025",
    title: "Vyakti Parichay Becomes India's Top Professional Identity Platform",
    desc: "The platform has registered over 500 verified professionals across Maharashtra and other states, setting a new benchmark for digital identity services in India.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=450&fit=crop",
    tag: "Platform News",
    featured: true,
  },
  {
    date: "05 Jun 2025",
    title: "Recognition Ceremony 2025 Nominations Now Open",
    desc: "Annual awards to honour distinguished professionals. Applications invited from all categories.",
    img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=300&h=200&fit=crop",
    tag: "Awards",
    featured: false,
  },
  {
    date: "28 May 2025",
    title: "Digital Identity Workshop for Healthcare Professionals in Nagpur",
    desc: "IMA partners with Vyakti Parichay to create verified digital profiles for doctors across Vidarbha.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=200&fit=crop",
    tag: "Healthcare",
    featured: false,
  },
  {
    date: "18 May 2025",
    title: "New Feature: Social Media Integration for All Profiles",
    desc: "Members can now link LinkedIn, Twitter, and YouTube directly to their Vyakti Parichay profile.",
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=300&h=200&fit=crop",
    tag: "Feature",
    featured: false,
  },
];

export default function Home() {
  const { data: featuredProfiles, isLoading: isLoadingFeatured } = useGetFeaturedProfiles({ limit: 4 }, { query: { queryKey: getGetFeaturedProfilesQueryKey({ limit: 4 }) } });
  const { data: stats, isLoading: isLoadingStats } = useGetProfileStats({ query: { queryKey: getGetProfileStatsQueryKey() } });

  const [slideIdx, setSlideIdx] = useState(0);
  const [galleryTab, setGalleryTab] = useState<"Photos" | "Events">("Photos");
  const [galleryYear, setGalleryYear] = useState("2024");
  const [pressLang, setPressLang] = useState<"English" | "Hindi" | "Marathi">("English");

  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % bannerSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const filteredGallery = galleryItems.filter(g => g.type === galleryTab && g.year === galleryYear);

  const slide = bannerSlides[slideIdx];

  return (
    <div className="w-full bg-[#f5f5f5]">

      {/* ── BANNER CAROUSEL ── */}
      <section className={`relative bg-gradient-to-r ${slide.bg} overflow-hidden`}>
        <div className="max-w-[1200px] mx-auto px-4 py-10 md:py-14 flex flex-col md:flex-row items-center gap-8 min-h-[340px]">
          {/* Text */}
          <div className="flex-1 text-white">
            <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              {slide.tag}
            </div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold leading-tight mb-4 whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="text-white/85 text-sm md:text-base max-w-md mb-6 leading-relaxed">{slide.desc}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={slide.ctaHref} className="inline-flex items-center bg-white text-[#1a2d4f] text-sm font-bold px-6 py-3 rounded hover:bg-white/90 transition-colors shadow-md">
                {slide.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href={slide.cta2Href} className="inline-flex items-center border-2 border-white/60 text-white text-sm font-bold px-6 py-3 rounded hover:bg-white/10 transition-colors">
                {slide.cta2}
              </Link>
            </div>
            <div className="mt-5 inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded">
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-bold">{slide.badge}</span>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-48 md:w-56 lg:w-64 shrink-0">
            <img src={slide.img} alt="Featured Professional" className="w-full h-56 md:h-72 object-cover rounded-xl border-4 border-white/30 shadow-2xl" />
            <div className="absolute -bottom-3 -left-3 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded shadow-lg">
              ✓ Verified Profile
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button onClick={() => setSlideIdx(i => (i - 1 + bannerSlides.length) % bannerSlides.length)} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {bannerSlides.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === slideIdx ? "bg-white scale-125" : "bg-white/40"}`} />
          ))}
          <button onClick={() => setSlideIdx(i => (i + 1) % bannerSlides.length)} className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-b border-border shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: "Verified Profiles", value: stats?.verifiedProfiles ?? 0, suffix: "+", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop", color: "border-t-4 border-[#FF9933]" },
              { label: "Total Members", value: stats?.totalProfiles ?? 0, suffix: "+", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop", color: "border-t-4 border-[#138808]" },
              { label: "Professions Covered", value: stats?.categoriesCount ?? 0, suffix: "+", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop", color: "border-t-4 border-[#000080]" },
              { label: "Featured Stories", value: stats?.featuredProfiles ?? 0, suffix: "+", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", color: "border-t-4 border-[#8B0000]" },
            ].map((s, i) => (
              <div key={i} className={`flex items-center gap-4 p-5 ${s.color}`}>
                <img src={s.img} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-border shrink-0" />
                <div>
                  {isLoadingStats
                    ? <Skeleton className="h-8 w-16 mb-1" />
                    : <div className="text-2xl md:text-3xl font-bold text-[#1a2d4f]">{s.value}{s.suffix}</div>
                  }
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wide">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR CATEGORIES (Initiatives grid) ── */}
      <section className="py-10 bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1a2d4f] flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full inline-block" />
                Our Categories
              </h2>
              <p className="text-xs text-muted-foreground mt-1">Profiles spanning every profession across India</p>
            </div>
            <Link href="/profiles" className="inline-flex items-center bg-primary text-white text-xs font-bold px-4 py-2 rounded hover:bg-primary/90 transition-colors">
              View All <ArrowRight className="ml-1 w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, i) => (
              <Link key={i} href="/profiles" className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 ${cat.color} hover:shadow-md transition-all text-center group`}>
                <cat.icon className="w-7 h-7" />
                <span className="text-xs font-bold leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROFILES ── */}
      <section className="py-10 bg-[#f5f5f5] border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a2d4f] flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full inline-block" />
              Featured Profiles
            </h2>
            <Link href="/profiles" className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {isLoadingFeatured
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[320px] rounded-lg" />)
              : featuredProfiles?.length
                ? featuredProfiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
                : <div className="col-span-full text-center py-16 text-muted-foreground text-sm">No featured profiles yet.</div>
            }
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS + MINI CALENDAR ── */}
      <section className="py-10 bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a2d4f] flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full inline-block" />
              Upcoming Events
            </h2>
            <Link href="#" className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
              Show All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Events list */}
            <div className="lg:col-span-2 space-y-3">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-4 bg-[#f8f8f8] border border-border rounded-lg p-4 hover:border-primary/40 hover:shadow-sm transition-all group cursor-pointer">
                  <div className="shrink-0 text-center bg-primary text-white rounded-lg px-3 py-2 min-w-[56px]">
                    <div className="text-lg font-bold leading-none">{ev.date.split(" ")[0]}</div>
                    <div className="text-[10px] uppercase font-bold opacity-80">{ev.date.split(" ")[1]}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#1a2d4f] group-hover:text-primary transition-colors leading-snug">{ev.title}</h3>
                      <span className="shrink-0 text-[10px] font-bold text-primary border border-primary/30 bg-primary/5 px-2 py-0.5 rounded">{ev.tag}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <span className="text-primary">📍</span> {ev.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini Calendar */}
            <div className="bg-[#1a2d4f] text-white rounded-xl overflow-hidden shadow-md">
              <div className="bg-primary px-4 py-3 flex items-center justify-between">
                <button className="text-white/70 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                <div className="font-bold text-sm">June 2025</div>
                <button className="text-white/70 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 mb-2">
                  {calDays.map((d, i) => <div key={i} className="text-center text-[10px] font-bold text-white/50 py-1">{d}</div>)}
                </div>
                {calDates.map((week, wi) => (
                  <div key={wi} className="grid grid-cols-7">
                    {week.map((d, di) => (
                      <div key={di} className={`text-center text-xs py-1.5 rounded cursor-pointer transition-colors ${d === 15 ? "bg-primary text-white font-bold" : d ? "text-white/80 hover:bg-white/10" : ""}`}>
                        {d || ""}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-[10px] text-white/50 font-bold uppercase tracking-wide mb-2">Events This Month</div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    Recognition Ceremony — 15 Jun
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#138808] shrink-0" />
                    Workshop — 22 Jun
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFILE GALLERY (Our Media) ── */}
      <section className="py-10 bg-[#f5f5f5] border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-xl font-bold text-[#1a2d4f] flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full inline-block" />
              Our Media
            </h2>
            <a href="#" className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
              View Gallery <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex gap-0 border border-border rounded overflow-hidden bg-white">
              {(["Photos", "Events"] as const).map((tab) => (
                <button key={tab} onClick={() => setGalleryTab(tab)}
                  className={`px-5 py-2 text-xs font-bold transition-colors ${galleryTab === tab ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted"}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              {["2024", "2023"].map((y) => (
                <button key={y} onClick={() => setGalleryYear(y)}
                  className={`px-3 py-1.5 text-xs font-bold rounded border transition-colors ${galleryYear === y ? "bg-[#1a2d4f] text-white border-[#1a2d4f]" : "border-border text-muted-foreground hover:border-[#1a2d4f]"}`}>
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(filteredGallery.length ? filteredGallery : galleryItems.slice(0, 6)).map((item, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden aspect-video border border-border shadow-sm">
                <img src={item.img} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-bold leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS RELEASE (News layout) ── */}
      <section className="py-10 bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-xl font-bold text-[#1a2d4f] flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full inline-block" />
              Press Release
            </h2>
            <div className="flex items-center gap-2">
              {(["English", "Hindi", "Marathi"] as const).map((l) => (
                <button key={l} onClick={() => setPressLang(l)}
                  className={`text-xs font-bold px-3 py-1 rounded border transition-colors ${pressLang === l ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary"}`}>
                  {l}
                </button>
              ))}
              <Link href="#" className="text-primary text-xs font-bold hover:underline flex items-center gap-1 ml-2">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Featured large news */}
            {pressItems.filter(p => p.featured).map((item, i) => (
              <div key={i} className="lg:col-span-2 rounded-lg overflow-hidden border border-border bg-white hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase">{item.tag}</div>
                  <div className="absolute bottom-3 left-3 text-white/70 text-[10px] font-bold">{item.date}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#1a2d4f] group-hover:text-primary transition-colors mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  <div className="mt-4 flex items-center text-primary text-xs font-bold">
                    Read More <ArrowRight className="ml-1 w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}

            {/* Side smaller news */}
            <div className="space-y-3">
              {pressItems.filter(p => !p.featured).map((item, i) => (
                <div key={i} className="flex gap-3 rounded-lg border border-border bg-white p-3 hover:shadow-sm hover:border-primary/40 transition-all group cursor-pointer">
                  <img src={item.img} alt={item.title} className="w-20 h-16 object-cover rounded shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold text-primary border border-primary/20 bg-primary/5 px-1.5 py-0.5 rounded">{item.tag}</span>
                      <span className="text-[10px] text-muted-foreground">{item.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#1a2d4f] group-hover:text-primary transition-colors leading-snug line-clamp-2">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR REACH (Social Media) ── */}
      <section className="py-10 bg-[#f5f5f5] border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-xl font-bold text-[#1a2d4f] flex items-center gap-2 mb-6">
            <span className="w-1 h-6 bg-primary rounded-full inline-block" />
            Our Reach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Facebook */}
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="bg-[#1877F2] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span className="font-bold text-sm">Facebook</span>
                </div>
                <span className="text-white/80 text-xs">Digital India Fi...</span>
              </div>
              <div className="p-4">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop" alt="Facebook page" className="w-full h-32 object-cover rounded mb-3" />
                <p className="text-xs text-muted-foreground mb-3">India's Premier Digital Identity Platform — Connecting India's brightest minds with the world.</p>
                <a href="#" className="block text-center bg-[#1877F2] text-white text-xs font-bold py-2 rounded hover:bg-[#1465d8] transition-colors">
                  Like Page
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <span className="font-bold text-sm">Instagram</span>
                </div>
                <span className="text-white/80 text-xs">@vyaktiparichay</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-1 mb-3">
                  {[
                    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop",
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop",
                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop",
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop",
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="aspect-square object-cover rounded" />
                  ))}
                </div>
                <a href="#" className="block text-center bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] text-white text-xs font-bold py-2 rounded hover:opacity-90 transition-opacity">
                  Follow on Instagram
                </a>
              </div>
            </div>

            {/* YouTube */}
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="bg-[#FF0000] text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  <span className="font-bold text-sm">YouTube</span>
                </div>
                <span className="text-white/80 text-xs">Vyakti Parichay</span>
              </div>
              <div className="p-4">
                <div className="relative rounded overflow-hidden mb-3">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop" alt="YouTube" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">2:45</div>
                </div>
                <p className="text-xs font-bold text-[#1a2d4f] mb-1">State of Digital Identity in India 2025</p>
                <p className="text-[10px] text-muted-foreground mb-3">Vyakti Parichay • 12K views • 3 days ago</p>
                <a href="#" className="block text-center bg-[#FF0000] text-white text-xs font-bold py-2 rounded hover:bg-red-700 transition-colors">
                  Subscribe Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA ── */}
      <section id="contact" className="py-10 bg-[#1a2d4f]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-[#FF9933] text-xs font-bold uppercase tracking-widest mb-2">Get In Touch</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready To Build Your Digital Identity?
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Join Vyakti Parichay today and showcase your journey, achievements, and success story to the world. Our team is available Mon–Sat, 10AM to 7PM.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Phone className="w-4 h-4 text-[#FF9933] shrink-0" />
                  <span>+91 8888116157</span>
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Mail className="w-4 h-4 text-[#FF9933] shrink-0" />
                  <span>vyaktiparichaya_office@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/create-profile" className="flex-1 text-center bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-primary/90 transition-colors shadow-lg text-sm">
                Create Your Profile
              </Link>
              <Link href="/profiles" className="flex-1 text-center border-2 border-white/30 text-white font-bold py-4 px-6 rounded-lg hover:bg-white/10 transition-colors text-sm">
                Browse Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
