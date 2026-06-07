import { useParams, Link } from "wouter";
import { useGetProfile, getGetProfileQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Award, Briefcase, Building2, Calendar, CheckCircle2, Facebook, Globe, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileDetails() {
  const { id } = useParams();
  const profileId = parseInt(id || "0", 10);

  const { data: profile, isLoading, error } = useGetProfile(profileId, {
    query: {
      enabled: !!profileId,
      queryKey: getGetProfileQueryKey(profileId),
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="w-full h-80 bg-muted/50 rounded-none" />
        <div className="container mx-auto px-4 -mt-24 relative z-10">
          <Skeleton className="w-48 h-48 rounded-2xl mb-8 border-4 border-background" />
          <Skeleton className="w-1/3 h-10 mb-4" />
          <Skeleton className="w-1/4 h-6 mb-12" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-48" />
            </div>
            <div className="space-y-6">
              <Skeleton className="w-full h-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-serif font-bold text-destructive mb-4">Profile Not Found</h1>
        <p className="text-muted-foreground mb-8">The profile you are looking for does not exist or has been removed.</p>
        <Link href="/profiles" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Cover */}
      <div className="w-full h-64 md:h-96 relative bg-gradient-to-r from-muted to-muted/50 border-b border-border/40">
        {profile.coverImageUrl && (
          <img 
            src={profile.coverImageUrl} 
            alt="Cover" 
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          <Avatar className="w-48 h-48 rounded-2xl border-4 border-background shadow-2xl bg-card">
            <AvatarImage src={profile.avatarUrl || undefined} className="object-cover" />
            <AvatarFallback className="text-5xl font-serif rounded-2xl">{profile.name.substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 pt-4 md:pt-36">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground flex items-center gap-3">
                {profile.name}
                {profile.verified && <CheckCircle2 className="w-8 h-8 text-primary" />}
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">{profile.tagline}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-sm px-3 py-1">
                {profile.category}
              </Badge>
              {profile.location && (
                <div className="flex items-center gap-1.5 border border-border/40 rounded-full px-3 py-1 bg-card/50">
                  <MapPin className="w-4 h-4" /> {profile.location}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {profile.bio && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h2 className="text-2xl font-serif font-bold border-b border-border/40 pb-2">Biography</h2>
                <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                  {profile.bio.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </motion.section>
            )}

            {profile.achievements && profile.achievements.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
                <h2 className="text-2xl font-serif font-bold border-b border-border/40 pb-2 flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" /> Key Achievements
                </h2>
                <ul className="grid gap-4">
                  {profile.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-4 p-4 rounded-xl border border-border/40 bg-card/50">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold">{i + 1}</span>
                      </div>
                      <span className="text-muted-foreground leading-relaxed pt-1">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {profile.awards && profile.awards.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-4">
                <h2 className="text-2xl font-serif font-bold border-b border-border/40 pb-2">Honors & Awards</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {profile.awards.map((award, i) => (
                    <div key={i} className="p-4 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <Award className="w-6 h-6 text-primary mb-3" />
                      <p className="font-medium text-foreground">{award}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {profile.galleryUrls && profile.galleryUrls.length > 0 && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
                <h2 className="text-2xl font-serif font-bold border-b border-border/40 pb-2">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {profile.galleryUrls.map((url, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-border/40">
                      <img src={url} alt={`Gallery ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Professional Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="p-6 rounded-2xl border border-border/40 bg-card">
              <h3 className="font-serif text-lg font-bold mb-6 text-primary">Professional Details</h3>
              <div className="space-y-4">
                {profile.organization && (
                  <div className="flex gap-3">
                    <Building2 className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Organization</div>
                      <div className="text-sm text-muted-foreground">{profile.organization}</div>
                    </div>
                  </div>
                )}
                {profile.yearsOfExperience !== null && profile.yearsOfExperience !== undefined && (
                  <div className="flex gap-3">
                    <Briefcase className="w-5 h-5 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Experience</div>
                      <div className="text-sm text-muted-foreground">{profile.yearsOfExperience} Years</div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Member Since</div>
                    <div className="text-sm text-muted-foreground">{new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact & Social */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl border border-border/40 bg-card">
              <h3 className="font-serif text-lg font-bold mb-6 text-primary">Connect</h3>
              
              <div className="space-y-4 mb-8">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" /> {profile.email}
                  </a>
                )}
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" /> {profile.phone}
                  </a>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" /> Website
                  </a>
                )}
              </div>

              {profile.socialLinks && Object.values(profile.socialLinks).some(Boolean) && (
                <>
                  <div className="h-px bg-border/40 w-full mb-6" />
                  <div className="flex flex-wrap gap-3">
                    {profile.socialLinks.linkedin && (
                      <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {profile.socialLinks.twitter && (
                      <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {profile.socialLinks.instagram && (
                      <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {profile.socialLinks.facebook && (
                      <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                    {profile.socialLinks.youtube && (
                      <a href={profile.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Youtube className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
