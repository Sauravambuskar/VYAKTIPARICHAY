import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/profile-card";
import { useGetFeaturedProfiles, useGetProfileStats, getGetFeaturedProfilesQueryKey, getGetProfileStatsQueryKey } from "@workspace/api-client-react";
import { ArrowRight, Award, BookOpen, Briefcase, ChevronRight, Globe, Heart, Shield, Star, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { data: featuredProfiles, isLoading: isLoadingFeatured } = useGetFeaturedProfiles({ limit: 4 }, { query: { queryKey: getGetFeaturedProfilesQueryKey({ limit: 4 }) } });
  const { data: stats, isLoading: isLoadingStats } = useGetProfileStats({ query: { queryKey: getGetProfileStatsQueryKey() } });

  const services = [
    { title: "Digital Portfolio", desc: "A premium, customized landing page to showcase your entire journey.", icon: Globe },
    { title: "SEO Optimization", desc: "Rank higher on Google searches with your name and profession.", icon: Star },
    { title: "Verified Identity", desc: "Get a verified badge to establish credibility and authenticity.", icon: Shield },
    { title: "PR & Media Coverage", desc: "Opportunities for interviews and article features.", icon: Award },
    { title: "Networking Access", desc: "Connect with other verified leaders and industry pioneers.", icon: Users },
    { title: "Legacy Building", desc: "Document your awards, honors, and life story for posterity.", icon: BookOpen },
    { title: "Personal Branding", desc: "Consulting to enhance your digital footprint and reputation.", icon: Briefcase },
    { title: "Philanthropy Showcase", desc: "Highlight your social impact and community contributions.", icon: Heart },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
              <Star className="w-4 h-4" />
              <span>India's Premier Digital Identity Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight">
              Your Identity. Your Story. <br/>
              <span className="gold-gradient-text">Your Legacy.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              An exclusive platform for remarkable individuals to immortalize their journey, celebrate achievements, and inspire the next generation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="text-lg px-8 py-6 h-auto gold-glow bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/create-profile">Submit Your Profile</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 h-auto border-primary/20 hover:bg-primary/10">
                <Link href="/profiles">Explore Directory <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/40 bg-muted/10 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Verified Profiles", value: isLoadingStats ? "-" : stats?.verifiedProfiles || 0 },
              { label: "Total Members", value: isLoadingStats ? "-" : stats?.totalProfiles || 0 },
              { label: "Professions", value: isLoadingStats ? "-" : stats?.categoriesCount || 0 },
              { label: "Featured Stories", value: isLoadingStats ? "-" : stats?.featuredProfiles || 0 },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  {isLoadingStats ? <Skeleton className="h-12 w-24 mx-auto" /> : stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Featured <span className="text-primary">Visionaries</span></h2>
              <p className="text-lg text-muted-foreground">Discover the inspiring journeys of individuals who have made a significant impact in their respective fields.</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex hover:text-primary hover:bg-transparent group">
              <Link href="/profiles">
                View All <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingFeatured ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full rounded-xl bg-muted/50" />
              ))
            ) : featuredProfiles?.length ? (
              featuredProfiles.map((profile, i) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProfileCard profile={profile} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No featured profiles found.
              </div>
            )}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link href="/profiles">View All Profiles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Our <span className="text-primary">Services</span></h2>
            <p className="text-lg text-muted-foreground">Comprehensive identity management and legacy building solutions for distinguished professionals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border/50 p-8 rounded-2xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The <span className="text-primary">Founders</span></h2>
            <p className="text-xl text-muted-foreground font-serif italic">
              "Success is not measured only by achievements but also by the impact we create through our journey. Every individual has a story that can inspire others. Through Vyakti Parichay, we aim to provide a platform where people can proudly share their journey, celebrate their achievements, and build a lasting digital legacy."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl text-center flex flex-col items-center"
            >
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1 mb-6">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-serif text-primary">SA</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-serif text-primary mb-2">Saurav Ambuskar</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visionary entrepreneur, project strategist, and creative professional with a passion for innovation and leadership. Extensive experience in project planning, branding, and organizational development.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl text-center flex flex-col items-center"
            >
              <div className="w-32 h-32 rounded-full border-4 border-primary/20 p-1 mb-6">
                <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-serif text-primary">NP</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-serif text-primary mb-2">Nagesh Patil</h3>
              <p className="text-muted-foreground leading-relaxed">
                Digital marketing professional, entrepreneur, and branding consultant. Business development strategist with years of experience in social media marketing, online advertising, and content creation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
