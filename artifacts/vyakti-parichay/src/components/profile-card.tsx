import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2, Building2 } from "lucide-react";
import type { Profile } from "@workspace/api-client-react/src/generated/api.schemas";

export function ProfileCard({ profile }: { profile: Profile }) {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Link href={`/profiles/${profile.id}`}>
      <div className="group cursor-pointer rounded-2xl overflow-hidden border border-border/40 bg-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
        {/* Cover / Avatar area */}
        <div className="relative h-56 overflow-hidden bg-muted">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
          ) : profile.coverImageUrl ? (
            <img
              src={profile.coverImageUrl}
              alt={profile.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <span className="text-5xl font-serif font-bold text-primary/30">{initials}</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
            {profile.verified && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </div>
            )}
            {profile.featured && (
              <div className="px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-primary text-xs font-bold">
                Featured
              </div>
            )}
          </div>

          {/* Category badge bottom-left */}
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-background/80 backdrop-blur-sm border border-border/40 text-foreground text-xs font-semibold">
              {profile.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold group-hover:text-primary transition-colors leading-tight mb-1">
            {profile.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{profile.location}</span>
              </div>
            )}
            {profile.organization && (
              <div className="flex items-center gap-1">
                <Building2 className="w-3 h-3 shrink-0" />
                <span className="truncate">{profile.organization}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
