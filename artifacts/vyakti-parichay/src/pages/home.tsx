import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/profile-card";
import { useGetFeaturedProfiles, useGetProfileStats, getGetFeaturedProfilesQueryKey, getGetProfileStatsQueryKey } from "@workspace/api-client-react";
import { ArrowRight, Award, BookOpen, Briefcase, ChevronRight, Globe, Heart, Shield, Star, Users, CheckCircle, Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const services = [
  {
    title: "Professional Digital Profile",
    desc: "A dedicated digital profile highlighting your achievements, experience, education, and professional journey.",
    icon: Globe,
    img: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop",
  },
  {
    title: "Biography Creation",
    desc: "Professionally written biographies that present your story in an engaging and authentic manner.",
    icon: BookOpen,
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop",
  },
  {
    title: "Personal Branding",
    desc: "Building a strong online presence that reflects your achievements and credibility.",
    icon: Briefcase,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    title: "Awards & Recognition",
    desc: "Highlighting awards, certificates, honors, and accomplishments to enhance your legacy.",
    icon: Award,
    img: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop",
  },
  {
    title: "Photo Gallery",
    desc: "Professional image galleries displaying your important milestones and achievements.",
    icon: Star,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
  },
  {
    title: "Social Media Integration",
    desc: "Connect all your professional and social media profiles in one powerful place.",
    icon: Shield,
    img: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&h=400&fit=crop",
  },
  {
    title: "Professional Portfolio",
    desc: "Present your work, projects, publications, and contributions effectively.",
    icon: Users,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    title: "Business Visibility",
    desc: "Increase professional visibility and showcase your expertise to a wider audience.",
    icon: Heart,
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
  },
];

const testimonials = [
  {
    name: "Dr. Anand Kulkarni",
    role: "Cardiologist, Pune",
    quote: "Vyakti Parichay gave me a professional digital identity I never had before. My patients and peers can now find my complete journey in one place.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Meenakshi Joshi",
    role: "Social Entrepreneur, Mumbai",
    quote: "The platform beautifully captures the essence of my 20-year journey in social work. It has opened doors to collaborations I never imagined.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face",
  },
  {
    name: "Rahul Desai",
    role: "Tech Founder, Bengaluru",
    quote: "A truly premium experience. My investors, partners, and media now have one trusted source for my background and achievements.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
  },
];

const professions = [
  "Entrepreneurs", "Business Owners", "Doctors", "Educators",
  "Social Workers", "Politicians", "Artists", "Coaches",
  "Influencers", "Industry Experts", "Public Figures", "Start-up Founders",
];

const processSteps = [
  {
    step: "01",
    title: "Submit Your Profile",
    desc: "Fill in our guided profile form with your personal story, achievements, and professional milestones.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    step: "02",
    title: "Review & Verification",
    desc: "Our editorial team reviews your submission and awards a verified badge to credible profiles.",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    step: "03",
    title: "Go Live & Inspire",
    desc: "Your profile goes live on India's premier recognition platform, accessible to the world.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
  },
];

// Indian professional faces for hero grid
const heroFaces = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop",
];

export default function Home() {
  const { data: featuredProfiles, isLoading: isLoadingFeatured } = useGetFeaturedProfiles({ limit: 4 }, { query: { queryKey: getGetFeaturedProfilesQueryKey({ limit: 4 }) } });
  const { data: stats, isLoading: isLoadingStats } = useGetProfileStats({ query: { queryKey: getGetProfileStatsQueryKey() } });

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* India Gate / Indian landmark background */}
          <img
            src="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=1800&h=1000&fit=crop"
            alt="India Gate, New Delhi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left: text */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-primary/40 bg-primary/10 text-primary text-sm font-bold mb-8">
              <Star className="w-3.5 h-3.5" />
              India's Premier Digital Identity Platform
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-6">
              Your Identity.<br />Your Story.<br />
              <span className="gold-gradient-text">Your Legacy.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
              An exclusive platform for remarkable individuals to immortalize their journey, celebrate achievements, and inspire the next generation across India.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="text-base px-8 py-6 h-auto gold-glow bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <Link href="/create-profile">Submit Your Profile</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 py-6 h-auto border-primary/30 hover:bg-primary/10 font-bold">
                <Link href="/profiles">Explore Directory <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: Indian professional photo grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {heroFaces.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                className={`rounded-xl overflow-hidden border-2 border-white shadow-xl ${i % 2 === 1 ? "mt-8" : ""}`}
              >
                <img src={src} alt="Indian Professional" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 border-y border-border bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Verified Profiles", value: stats?.verifiedProfiles ?? 0 },
              { label: "Total Members", value: stats?.totalProfiles ?? 0 },
              { label: "Professions Covered", value: stats?.categoriesCount ?? 0 },
              { label: "Featured Stories", value: stats?.featuredProfiles ?? 0 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                {isLoadingStats
                  ? <Skeleton className="h-14 w-24 mx-auto mb-2 rounded" />
                  : <div className="text-5xl font-bold text-primary mb-2">{stat.value}+</div>
                }
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROFILES ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Our Visionaries</p>
              <h2 className="text-3xl md:text-4xl font-bold">Featured <span className="text-primary">Profiles</span></h2>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex hover:text-primary hover:bg-transparent group font-bold">
              <Link href="/profiles">View All <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingFeatured
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[340px] rounded-xl" />)
              : featuredProfiles?.length
                ? featuredProfiles.map((profile, i) => (
                  <motion.div key={profile.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <ProfileCard profile={profile} />
                  </motion.div>
                ))
                : <div className="col-span-full text-center py-20 text-muted-foreground">No featured profiles yet.</div>
            }
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" asChild className="w-full font-bold">
              <Link href="/profiles">View All Profiles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-gray-50 border-t border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo with floating accent */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=500&fit=crop"
                alt="Indian business professionals"
                className="w-full h-[420px] object-cover rounded-xl border border-border shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-5 rounded-xl shadow-xl">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-sm font-bold opacity-90">Authentic & Verified</div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=200&fit=crop"
                alt="Indian team"
                className="absolute -top-5 -right-5 w-36 h-24 object-cover rounded-lg border-4 border-white shadow-lg hidden lg:block"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">Building Digital <span className="text-primary">Identities</span> That Last</h2>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                We provide a trusted space where inspiring individuals can present their achievements, expertise, and success stories to the world with credibility and dignity.
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Professional Presentation", desc: "Profiles crafted with credibility and distinction." },
                  { title: "Trust & Recognition", desc: "Verified badge for authenticated success stories." },
                  { title: "Modern Design", desc: "Clean, responsive, and mobile-friendly experience." },
                  { title: "Long-Term Digital Legacy", desc: "Preserve achievements for future generations." },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="font-bold text-foreground">{item.title} — </span>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-primary">Services</span></h2>
            <p className="text-muted-foreground">Comprehensive identity management and legacy-building solutions for distinguished professionals across India.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl overflow-hidden border border-border bg-white hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md">
                    <service.icon className="w-4.5 h-4.5 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-gray-50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold">Simple 3-Step <span className="text-primary">Process</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group rounded-xl overflow-hidden border border-border bg-white hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 text-white/20 text-6xl font-bold leading-none select-none">
                    {step.step}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Step {step.step}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO CAN JOIN ── */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Open To All</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">Who Can <span className="text-primary">Join?</span></h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Vyakti Parichay welcomes individuals from every walk of life and every profession across India.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {professions.map((p, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="px-4 py-2 rounded border border-primary/30 bg-primary/8 text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors cursor-default"
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=350&h=250&fit=crop",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&h=250&fit=crop",
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=350&h=250&fit=crop",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=350&h=250&fit=crop",
              ].map((src, i) => (
                <img key={i} src={src} alt="Indian professional" className="rounded-lg object-cover w-full h-36 border border-border shadow-sm" />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gray-50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold">Success Stories <span className="text-primary">Speak</span> For Themselves</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-white border border-border rounded-xl p-7 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <Quote className="w-7 h-7 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-7 text-sm italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm text-primary font-bold">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Meet The Founders</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">The <span className="text-primary">Vision</span> Behind The Platform</h2>
            <blockquote className="text-base text-muted-foreground italic leading-relaxed border-l-4 border-primary pl-5 text-left mx-auto max-w-2xl">
              "Success is not measured only by achievements but also by the impact we create through our journey. Every individual has a story that can inspire others. Through Vyakti Parichay, we aim to provide a platform where people can proudly share their journey, celebrate their achievements, and build a lasting digital legacy."
              <footer className="mt-3 text-sm text-primary not-italic font-bold">— Saurav Ambuskar &amp; Nagesh Patil</footer>
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Saurav Ambuskar",
                role: "Founder",
                bio: "Visionary entrepreneur, project strategist, and creative professional with a passion for innovation and leadership. Extensive experience in project planning, branding, and organizational development.",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
                tags: ["Entrepreneur", "Project Strategist", "Brand Builder"],
              },
              {
                name: "Nagesh Patil",
                role: "Co-Founder",
                bio: "Digital marketing professional, entrepreneur, branding consultant, and business development strategist with years of experience in social media marketing, online advertising, and digital growth.",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=600&fit=crop&crop=face",
                tags: ["Digital Marketer", "Branding Expert", "Growth Strategist"],
              },
            ].map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={founder.img}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-widest">
                    {founder.role}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
                  <p className="text-primary text-sm font-bold mb-4">{founder.role}</p>
                  <p className="text-muted-foreground leading-relaxed mb-5 text-sm">{founder.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {founder.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded text-xs font-bold border border-primary/20 bg-primary/10 text-primary">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-20 bg-gray-50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="rounded-xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=1400&h=500&fit=crop"
              alt="Indian office professionals"
              className="w-full h-[360px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/97 via-background/85 to-background/30" />
            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16">
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready To Build Your <span className="text-primary">Digital Identity?</span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed">
                Join Vyakti Parichay today and showcase your journey, achievements, and success story to the world.
              </p>
              <div className="flex flex-wrap gap-5 text-sm text-muted-foreground font-bold mb-7">
                <span>+91 8888116157</span>
                <span>vyaktiparichaya_office@gmail.com</span>
                <span>Mon–Sat, 10AM–7PM</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="gold-glow bg-primary text-white hover:bg-primary/90 px-8 py-6 h-auto font-bold">
                  <Link href="/create-profile">Create Your Profile</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-primary/30 hover:bg-primary/10 hover:text-primary px-8 py-6 h-auto font-bold">
                  <Link href="/profiles">Browse Directory</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
