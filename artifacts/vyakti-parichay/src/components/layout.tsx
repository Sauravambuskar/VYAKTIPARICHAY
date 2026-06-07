import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/profiles", label: "Directory" },
    { href: "/create-profile", label: "Submit Profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:gold-glow transition-all duration-500">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight gold-gradient-text">
              Vyakti Parichay
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary hidden md:inline-flex">
              <Link href="/create-profile">Get Featured</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/40 bg-muted/30 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="font-serif text-2xl font-bold tracking-tight gold-gradient-text">
                Vyakti Parichay
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              India's premier digital identity platform. We immortalize the journeys of inspiring individuals, creating a lasting legacy for future generations.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold text-primary mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/profiles" className="text-muted-foreground hover:text-primary transition-colors">Directory</Link></li>
              <li><Link href="/create-profile" className="text-muted-foreground hover:text-primary transition-colors">Submit Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold text-primary mb-6">Contact Us</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>Phone: +91 8888116157</li>
              <li>Email: vyaktiparichaya_office@gmail.com</li>
              <li>Hours: Mon-Sat 10AM–7PM</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vyakti Parichay. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
