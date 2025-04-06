
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { Gamepad2, Monitor, Smartphone, Twitch } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  pubgUsername: z.string().min(3, "Username must be at least 3 characters"),
  platform: z.enum(["pc", "xbox", "playstation", "mobile"], {
    required_error: "Please select a platform",
  }),
  twitchUsername: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pubgUsername: "",
      platform: "pc",
      twitchUsername: "",
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Form submitted:", values);
      
      toast({
        title: "Profile updated!",
        description: "Your PUBG profile has been set up.",
      });
      
      // Redirect to lobby or dashboard after successful onboarding
      setTimeout(() => {
        navigate("/lobby");
      }, 1000);
    } catch (error) {
      console.error("Onboarding failed:", error);
      toast({
        title: "Something went wrong",
        description: "There was a problem setting up your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gaming-darker flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Set Up Your Profile</h1>
          <p className="text-gray-400 mt-2">Tell us about your PUBG experience</p>
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
                    <div className="relative">
                      <Input 
                        placeholder="Enter your PUBG username" 
                        {...field} 
                        className="bg-gaming-light border-pubg/30 text-white pl-10"
                      />
                      <div className="absolute left-3 top-3 text-pubg">
                        <Gamepad2 className="h-4 w-4" />
                      </div>
                    </div>
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
                      className="grid grid-cols-2 gap-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pc" className="text-pubg border-pubg" />
                        </FormControl>
                        <FormLabel className="text-white font-normal flex items-center">
                          <Monitor className="h-4 w-4 mr-2 text-pubg" />
                          PC
                        </FormLabel>
                      </FormItem>
                      
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="xbox" className="text-pubg border-pubg" />
                        </FormControl>
                        <FormLabel className="text-white font-normal flex items-center">
                          <Gamepad2 className="h-4 w-4 mr-2 text-pubg" />
                          Xbox
                        </FormLabel>
                      </FormItem>
                      
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="playstation" className="text-pubg border-pubg" />
                        </FormControl>
                        <FormLabel className="text-white font-normal flex items-center">
                          <Gamepad2 className="h-4 w-4 mr-2 text-pubg" />
                          PlayStation
                        </FormLabel>
                      </FormItem>
                      
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="mobile" className="text-pubg border-pubg" />
                        </FormControl>
                        <FormLabel className="text-white font-normal flex items-center">
                          <Smartphone className="h-4 w-4 mr-2 text-pubg" />
                          Mobile
                        </FormLabel>
                      </FormItem>
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
                  <FormLabel className="text-white">Twitch Username (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Your Twitch username" 
                        {...field} 
                        className="bg-gaming-light border-pubg/30 text-white pl-10"
                      />
                      <div className="absolute left-3 top-3 text-pubg">
                        <Twitch className="h-4 w-4" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-pubg hover:bg-pubg-dark text-white"
              disabled={isLoading}
            >
              {isLoading ? "Setting Up Profile..." : "Complete Profile Setup"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboarding;
