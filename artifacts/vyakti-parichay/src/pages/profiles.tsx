import { useState } from "react";
import { useListProfiles, useListCategories, getListProfilesQueryKey, getListCategoriesQueryKey } from "@workspace/api-client-react";
import { ProfileCard } from "@/components/profile-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Profiles() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  // Debounce search
  useState(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: profileData, isLoading: isLoadingProfiles } = useListProfiles(
    { page, limit: 12, search: debouncedSearch, category },
    { query: { queryKey: getListProfilesQueryKey({ page, limit: 12, search: debouncedSearch, category }) } }
  );

  const { data: categories, isLoading: isLoadingCategories } = useListCategories({
    query: { queryKey: getListCategoriesQueryKey() }
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            The <span className="text-primary">Directory</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore the distinguished individuals who have shaped our society and inspired generations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-8">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  className="pl-10 bg-card border-border/50 focus-visible:ring-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                Professions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => { setCategory(undefined); setPage(1); }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    !category ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  All Professions
                </button>
                {isLoadingCategories ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-full rounded-lg bg-muted/50" />
                  ))
                ) : (
                  categories?.map((cat) => (
                    <button
                      key={cat.category}
                      onClick={() => { setCategory(cat.category); setPage(1); }}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm flex justify-between items-center transition-colors ${
                        category === cat.category ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className="truncate pr-2">{cat.category}</span>
                      <span className="text-xs opacity-60">{cat.count}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center text-sm text-muted-foreground">
              <span>{profileData?.total || 0} profiles found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {isLoadingProfiles ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={`skeleton-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Skeleton className="h-[350px] w-full rounded-xl bg-muted/50" />
                    </motion.div>
                  ))
                ) : profileData?.profiles.length ? (
                  profileData.profiles.map((profile, i) => (
                    <motion.div
                      layout
                      key={profile.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      <ProfileCard profile={profile} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center flex flex-col items-center justify-center border border-dashed border-border/50 rounded-2xl bg-card/50">
                    <Search className="w-12 h-12 text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-serif font-bold mb-2">No Profiles Found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
                    <Button 
                      variant="outline" 
                      className="mt-6 border-primary/20 hover:text-primary"
                      onClick={() => { setSearch(""); setCategory(undefined); }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {profileData && profileData.total > profileData.limit && (
              <div className="mt-12 flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="border-primary/20"
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 text-sm font-medium">
                  Page {page} of {Math.ceil(profileData.total / profileData.limit)}
                </div>
                <Button
                  variant="outline"
                  disabled={page >= Math.ceil(profileData.total / profileData.limit)}
                  onClick={() => setPage((p) => p + 1)}
                  className="border-primary/20"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
