import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/profile-card";
import { useGetFeaturedProfiles, useGetProfileStats, getGetFeaturedProfilesQueryKey, getGetProfileStatsQueryKey } from "@workspace/api-client-react";
import { ArrowRight, Award, BookOpen, Briefcase, ChevronRight, Globe, Heart, Shield, Star, Users, CheckCircle, Quote } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const services = [
  {
    title: "Professional Digital Profile",
    desc: "A dedicated digital profile highlighting your achievements, experience, education, and professional journey.",
    icon: Globe,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
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
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=400&fit=crop",
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
    img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop",
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
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop",
  },
];

const testimonials = [
  {
    name: "Dr. Anand Kulkarni",
    role: "Cardiologist, Pune",
    quote: "Vyakti Parichay gave me a professional digital identity I never had before. My patients and peers can now find my complete journey in one place.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
  },
  {
    name: "Meenakshi Joshi",
    role: "Social Entrepreneur, Mumbai",
    quote: "The platform beautifully captures the essence of my 20-year journey in social work. It has opened doors to collaborations I never imagined.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
  {
    name: "Rahul Desai",
    role: "Tech Founder, Bengaluru",
    quote: "A truly premium experience. My investors, partners, and media now have one trusted source for my background and achievements.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
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
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
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

export default function Home() {
  const { data: featuredProfiles, isLoading: isLoadingFeatured } = useGetFeaturedProfiles({ limit: 4 }, { query: { queryKey: getGetFeaturedProfilesQueryKey({ limit: 4 }) } });
  const { data: stats, isLoading: isLoadingStats } = useGetProfileStats({ query: { queryKey: getGetProfileStatsQueryKey() } });

  return (
    <div className="w-full">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-bleed background photo */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1800&h=1000&fit=crop"
            alt="Professional success"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24">
          {/* Left: text */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <Star className="w-3.5 h-3.5" />
              India's Premier Digital Identity Platform
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-serif font-bold tracking-tight leading-tight mb-6">
              Your Identity.<br />Your Story.<br />
              <span className="gold-gradient-text">Your Legacy.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              An exclusive platform for remarkable individuals to immortalize their journey, celebrate achievements, and inspire the next generation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="text-base px-8 py-6 h-auto gold-glow bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/create-profile">Submit Your Profile</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 py-6 h-auto border-white/20 hover:bg-white/10">
                <Link href="/profiles">Explore Directory <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </motion.div>

          {/* Right: floating image cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            {[
              "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
            ].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`rounded-2xl overflow-hidden border border-white/10 shadow-2xl ${i % 2 === 1 ? "mt-8" : ""}`}
              >
                <img src={src} alt="Professional" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 border-y border-border/40 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Verified Profiles", value: stats?.verifiedProfiles ?? 0 },
              { label: "Total Members", value: stats?.totalProfiles ?? 0 },
              { label: "Professions", value: stats?.categoriesCount ?? 0 },
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
                  ? <Skeleton className="h-14 w-24 mx-auto mb-2 rounded-lg" />
                  : <div className="text-5xl md:text-6xl font-serif font-bold text-primary mb-2">{stat.value}+</div>
                }
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROFILES ── */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Our Visionaries</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured <span className="text-primary">Profiles</span></h2>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex hover:text-primary hover:bg-transparent group">
              <Link href="/profiles">View All <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingFeatured
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[340px] rounded-2xl" />)
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
            <Button variant="outline" asChild className="w-full">
              <Link href="/profiles">View All Profiles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US (image split) ── */}
      <section className="py-32 bg-muted/10 border-t border-border/40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=500&fit=crop"
                alt="Professional recognition"
                className="w-full h-[420px] object-cover rounded-2xl border border-border/30 shadow-2xl"
              />
              {/* Floating accent card */}
              <div className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-2xl max-w-[200px]">
                <div className="text-4xl font-serif font-bold mb-1">100%</div>
                <div className="text-sm font-semibold opacity-80">Authentic & Verified Identities</div>
              </div>
              {/* Second photo */}
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=220&fit=crop"
                alt="Team working"
                className="absolute -top-6 -right-6 w-40 h-28 object-cover rounded-xl border-4 border-background shadow-xl hidden lg:block"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Building Digital <span className="text-primary">Identities</span> That Last</h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                We provide a trusted space where inspiring individuals can present their achievements, expertise, and success stories to the world with credibility and dignity.
              </p>
              <ul className="space-y-5">
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
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <span className="font-semibold text-foreground">{item.title} — </span>
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
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our <span className="text-primary">Services</span></h2>
            <p className="text-lg text-muted-foreground">Comprehensive identity management and legacy-building solutions for distinguished professionals across India.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group rounded-2xl overflow-hidden border border-border/40 bg-card hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-primary/90 flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold font-serif mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKING PROCESS ── */}
      <section className="py-32 bg-muted/10 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Simple Working <span className="text-primary">Process</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative rounded-2xl overflow-hidden border border-border/40 bg-card"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div className="absolute top-4 left-4 text-6xl font-serif font-bold text-primary/20 leading-none select-none">
                    {step.step}
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-bold font-serif mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO CAN JOIN ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&h=800&fit=crop"
            alt="Community"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Open To All</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Who Can <span className="text-primary">Join?</span></h2>
            <p className="text-lg text-muted-foreground">Vyakti Parichay welcomes individuals from every walk of life and every profession.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {professions.map((p, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors cursor-default"
              >
                {p}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 bg-muted/10 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Success Stories <span className="text-primary">Speak</span> For Themselves</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card border border-border/40 rounded-2xl p-8 hover:border-primary/30 transition-colors"
              >
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-8 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" />
                  <div>
                    <div className="font-bold font-serif text-foreground">{t.name}</div>
                    <div className="text-sm text-primary">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Meet The Founders</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">The <span className="text-primary">Vision</span> Behind The Platform</h2>
            <blockquote className="text-lg text-muted-foreground font-serif italic leading-relaxed border-l-4 border-primary/40 pl-6 text-left mx-auto max-w-2xl">
              "Success is not measured only by achievements but also by the impact we create through our journey. Every individual has a story that can inspire others. Through Vyakti Parichay, we aim to provide a platform where people can proudly share their journey, celebrate their achievements, and build a lasting digital legacy."
              <footer className="mt-4 text-sm text-primary font-sans not-italic font-semibold">— Saurav Ambuskar & Nagesh Patil</footer>
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                name: "Saurav Ambuskar",
                role: "Founder",
                bio: "Visionary entrepreneur, project strategist, and creative professional with a passion for innovation and leadership. Extensive experience in project planning, branding, and organizational development.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=600&fit=crop&crop=faces",
                tags: ["Entrepreneur", "Project Strategist", "Brand Builder"],
              },
              {
                name: "Nagesh Patil",
                role: "Co-Founder",
                bio: "Digital marketing professional, entrepreneur, branding consultant, and business development strategist with years of experience in social media marketing, online advertising, and digital growth.",
                img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop&crop=faces",
                tags: ["Digital Marketer", "Branding Expert", "Growth Strategist"],
              },
            ].map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-card border border-border/40 rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={founder.img}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {founder.role}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold font-serif mb-1">{founder.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-4">{founder.role}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{founder.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {founder.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold border border-primary/20 bg-primary/10 text-primary">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-32 bg-muted/10 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=500&fit=crop"
              alt="Office"
              className="w-full h-[380px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
            <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-20">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Get In Touch</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 max-w-lg">
                Ready To Build Your <span className="text-primary">Digital Identity?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Join Vyakti Parichay today. Our team is here to help you showcase your journey.
              </p>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
                <span>+91 8888116157</span>
                <span>vyaktiparichaya_office@gmail.com</span>
                <span>Mon–Sat, 10AM–7PM</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="gold-glow bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 h-auto text-base">
                  <Link href="/create-profile">Create Your Profile</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/10 px-8 py-6 h-auto text-base">
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
