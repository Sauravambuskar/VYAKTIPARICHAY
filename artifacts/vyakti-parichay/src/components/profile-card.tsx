import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle2 } from "lucide-react";
import type { Profile } from "@workspace/api-client-react/src/generated/api.schemas";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link href={`/profiles/${profile.id}`}>
      <Card className="group cursor-pointer overflow-hidden border-border/40 bg-card hover:border-primary/50 transition-all duration-500 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative h-24 bg-gradient-to-r from-muted to-muted/50">
            {profile.coverImageUrl && (
              <img
                src={profile.coverImageUrl}
                alt="Cover"
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
              />
            )}
            <div className="absolute -bottom-10 left-6">
              <Avatar className="w-20 h-20 border-4 border-card bg-muted">
                <AvatarImage src={profile.avatarUrl || undefined} className="object-cover" />
                <AvatarFallback className="text-xl font-serif">{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="pt-14 pb-6 px-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-serif text-xl font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                  {profile.name}
                  {profile.verified && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </h3>
                <p className="text-sm font-medium text-primary/80 mt-1">{profile.category}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
              {profile.tagline}
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
