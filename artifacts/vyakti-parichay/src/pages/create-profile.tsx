import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProfile, getListProfilesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(2, "Category is required"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  bio: z.string().optional(),
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  avatarUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  coverImageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  organization: z.string().optional(),
  yearsOfExperience: z.coerce.number().optional(),
  socialLinks: z.object({
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
    instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  }).optional()
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createProfile = useCreateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      category: "",
      tagline: "",
      bio: "",
      location: "",
      phone: "",
      email: "",
      website: "",
      avatarUrl: "",
      coverImageUrl: "",
      organization: "",
      socialLinks: {
        linkedin: "",
        twitter: "",
        instagram: ""
      }
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    // Clean up empty strings to undefined
    const cleanData = {
      ...data,
      email: data.email || undefined,
      website: data.website || undefined,
      avatarUrl: data.avatarUrl || undefined,
      coverImageUrl: data.coverImageUrl || undefined,
      socialLinks: {
        linkedin: data.socialLinks?.linkedin || null,
        twitter: data.socialLinks?.twitter || null,
        instagram: data.socialLinks?.instagram || null,
      }
    };

    createProfile.mutate({ data: cleanData as any }, {
      onSuccess: (profile) => {
        queryClient.invalidateQueries({ queryKey: getListProfilesQueryKey() });
        toast({
          title: "Profile Submitted Successfully",
          description: "Your profile has been created and is awaiting verification.",
        });
        setLocation(`/profiles/${profile.id}`);
      },
      onError: (err) => {
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your profile. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['name', 'category', 'tagline'] 
      : ['email', 'phone', 'location'];
      
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) setStep(s => Math.min(3, s + 1));
  };

  return (
    <div className="min-h-[90vh] py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4">Submit Your <span className="text-primary">Profile</span></h1>
          <p className="text-muted-foreground">Join India's premier digital identity platform and establish your legacy.</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted -z-10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm
                ${step === s ? 'bg-primary text-primary-foreground scale-110' : 
                  step > s ? 'bg-primary text-primary-foreground' : 'bg-card border-2 border-muted text-muted-foreground'}`}
            >
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        <Card className="border-border/40 shadow-2xl bg-card/80 backdrop-blur-xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-primary border-b border-border/40 pb-2">Basic Information</h2>
                        
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Dr. A. P. J. Abdul Kalam" {...field} className="bg-background/50" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Profession / Category *</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Scientist, Entrepreneur" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="yearsOfExperience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 15" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="tagline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Tagline *</FormLabel>
                              <FormControl>
                                <Input placeholder="Visionary leader in sustainable energy" {...field} className="bg-background/50" />
                              </FormControl>
                              <FormDescription>A short, impactful description of who you are.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-primary border-b border-border/40 pb-2">Biography & Details</h2>
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Biography</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your journey, challenges, and vision..." 
                                  className="min-h-[150px] bg-background/50" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="Mumbai, Maharashtra" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="organization"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Organization</FormLabel>
                                <FormControl>
                                  <Input placeholder="Reliance Industries" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold text-primary border-b border-border/40 pb-2">Media & Links</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="avatarUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Profile Photo URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://..." {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="coverImageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cover Image URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://..." {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="space-y-4 pt-4">
                          <h3 className="text-sm font-medium">Social Links</h3>
                          <FormField
                            control={form.control}
                            name="socialLinks.linkedin"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="LinkedIn Profile URL" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="socialLinks.twitter"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Twitter Profile URL" {...field} className="bg-background/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-8 border-t border-border/40 mt-8">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(s => Math.max(1, s - 1))}
                    disabled={step === 1 || createProfile.isPending}
                    className="border-primary/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  
                  {step < 3 ? (
                    <Button type="button" onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={createProfile.isPending} className="gold-glow bg-primary text-primary-foreground hover:bg-primary/90">
                      {createProfile.isPending ? "Submitting..." : "Submit Profile"} <CheckCircle2 className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
