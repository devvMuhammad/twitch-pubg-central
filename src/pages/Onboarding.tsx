
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Twitch, Xbox, ArrowDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  pubgUsername: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters"),
  platform: z.enum(["pc", "xbox", "ps4"], {
    required_error: "Please select a gaming platform",
  }),
  twitchUsername: z.string()
    .min(3, "Twitch username must be at least 3 characters")
    .max(25, "Twitch username cannot exceed 25 characters")
    .optional()
    .or(z.literal(''))
});

type FormValues = z.infer<typeof formSchema>;

const Onboarding = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pubgUsername: "",
      platform: "pc",
      twitchUsername: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      
      toast({
        title: "Profile created!",
        description: "Your PUBG profile has been successfully set up.",
        variant: "default",
      });
      
      // Navigate to the dashboard or home page after successful submission
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Something went wrong",
        description: "There was an issue setting up your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gaming-darker flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-md bg-gaming-light border border-pubg/20 rounded-xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Set Up Your Profile</h1>
          <p className="text-gray-400 mt-2">Help us personalize your experience</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pubgUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">PUBG Username</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your PUBG username" 
                      {...field} 
                      className="bg-gaming-darker border-pubg/30 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="platform"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-white">Gaming Platform</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2 rounded-md border border-pubg/30 p-3 bg-gaming-darker">
                        <RadioGroupItem value="pc" id="pc" />
                        <label htmlFor="pc" className="flex flex-1 cursor-pointer items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ArrowDown className="h-5 w-5 text-pubg" />
                            <span className="text-white">PC / Steam</span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2 rounded-md border border-pubg/30 p-3 bg-gaming-darker">
                        <RadioGroupItem value="xbox" id="xbox" />
                        <label htmlFor="xbox" className="flex flex-1 cursor-pointer items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Xbox className="h-5 w-5 text-pubg" />
                            <span className="text-white">Xbox</span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2 rounded-md border border-pubg/30 p-3 bg-gaming-darker">
                        <RadioGroupItem value="ps4" id="ps4" />
                        <label htmlFor="ps4" className="flex flex-1 cursor-pointer items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Using a different icon since PS4 is not available in lucide */}
                            <svg className="h-5 w-5 text-pubg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.5 7v9.5m0 0c0 1.1-.9 2-2 2h-3a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h3c1.1 0 2 .9 2 2v9Zm11-9h-3a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2h3a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-white">PlayStation</span>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="twitchUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    <div className="flex items-center gap-2">
                      <Twitch className="h-4 w-4 text-pubg" />
                      <span>Twitch Username (Optional)</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your Twitch username" 
                      {...field} 
                      className="bg-gaming-darker border-pubg/30 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full glow-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Setting Up..." : "Complete Setup"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboarding;
