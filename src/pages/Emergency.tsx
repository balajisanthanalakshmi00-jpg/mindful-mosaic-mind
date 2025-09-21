import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, Heart, Shield, AlertTriangle, Users } from "lucide-react";
import { toast } from "sonner";

const emergencyContacts = [
  {
    title: "Institute Counselor",
    description: "Connect directly with your school's mental health counselor",
    phone: "555-0123",
    available: "Monday-Friday, 8AM-6PM",
    icon: Users,
  },
  {
    title: "Crisis Helpline",
    description: "24/7 mental health crisis support",
    phone: "988",
    available: "Available 24/7",
    icon: Phone,
  },
  {
    title: "Teen Support Line",
    description: "Specialized support for students and young adults",
    phone: "555-TEEN-HELP",
    available: "Daily 3PM-11PM",
    icon: Heart,
  },
];

const selfCareResources = [
  {
    title: "Immediate Breathing Exercise",
    description: "4-7-8 breathing technique for instant calm",
    action: "breathing",
    icon: "🫁",
  },
  {
    title: "Grounding Technique",
    description: "5-4-3-2-1 sensory grounding exercise",
    action: "grounding",
    icon: "🌱",
  },
  {
    title: "Emergency Self-Care",
    description: "Quick self-soothing strategies",
    action: "selfcare",
    icon: "💙",
  },
];

const Emergency = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [breathingStep, setBreathingStep] = useState(0);

  const callEmergencyContact = (phone: string, title: string) => {
    // In a real app, this would make an actual call
    toast.success(`Connecting to ${title}...`);
    
    // Show confirmation dialog
    const confirmed = window.confirm(`This will call ${title} at ${phone}. Continue?`);
    if (confirmed) {
      // Simulate call connection
      window.location.href = `tel:${phone}`;
    }
  };

  const startBreathingExercise = () => {
    setSelectedExercise("breathing");
    setBreathingStep(1);
    toast.success("Let's breathe together. Follow the instructions below.");
  };

  const BreathingExercise = () => (
    <Card className="calm-card">
      <CardHeader>
        <CardTitle className="text-center text-xl text-primary">
          4-7-8 Breathing Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-reward">
          <span className="text-3xl">🫁</span>
        </div>
        
        <div className="space-y-4">
          {breathingStep === 1 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Step 1: Breathe In</h3>
              <p className="text-muted-foreground">Breathe in through your nose for 4 counts</p>
              <div className="text-4xl font-bold text-primary animate-bounce-gentle">1... 2... 3... 4</div>
            </div>
          )}
          
          {breathingStep === 2 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Step 2: Hold</h3>
              <p className="text-muted-foreground">Hold your breath for 7 counts</p>
              <div className="text-4xl font-bold text-secondary animate-pulse">1... 2... 3... 4... 5... 6... 7</div>
            </div>
          )}
          
          {breathingStep === 3 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Step 3: Breathe Out</h3>
              <p className="text-muted-foreground">Exhale through your mouth for 8 counts</p>
              <div className="text-4xl font-bold text-accent animate-float">1... 2... 3... 4... 5... 6... 7... 8</div>
            </div>
          )}
        </div>
        
        <div className="space-x-3">
          {breathingStep > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setBreathingStep(breathingStep - 1)}
            >
              Previous
            </Button>
          )}
          {breathingStep < 3 ? (
            <Button 
              onClick={() => setBreathingStep(breathingStep + 1)}
              className="encouraging-button"
            >
              Next Step
            </Button>
          ) : (
            <Button 
              onClick={() => setBreathingStep(1)}
              className="encouraging-button"
            >
              Repeat
            </Button>
          )}
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => {
            setSelectedExercise(null);
            setBreathingStep(0);
          }}
        >
          I Feel Better Now
        </Button>
      </CardContent>
    </Card>
  );

  const GroundingExercise = () => (
    <Card className="calm-card">
      <CardHeader>
        <CardTitle className="text-center text-xl text-primary">
          5-4-3-2-1 Grounding Technique
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">
          Look around you and identify:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-gradient-secondary/20 rounded-lg">
            <h4 className="font-semibold text-secondary">👀 5 Things You Can See</h4>
            <p className="text-sm text-muted-foreground">Name them out loud or in your mind</p>
          </div>
          
          <div className="p-4 bg-gradient-accent/20 rounded-lg">
            <h4 className="font-semibold text-accent">✋ 4 Things You Can Touch</h4>
            <p className="text-sm text-muted-foreground">Feel their texture, temperature</p>
          </div>
          
          <div className="p-4 bg-gradient-primary/20 rounded-lg">
            <h4 className="font-semibold text-primary">👂 3 Things You Can Hear</h4>
            <p className="text-sm text-muted-foreground">Listen to sounds around you</p>
          </div>
          
          <div className="p-4 bg-gradient-reward/20 rounded-lg">
            <h4 className="font-semibold text-reward">👃 2 Things You Can Smell</h4>
            <p className="text-sm text-muted-foreground">Notice scents in the air</p>
          </div>
          
          <div className="p-4 bg-gradient-warm/60 rounded-lg">
            <h4 className="font-semibold text-support">👅 1 Thing You Can Taste</h4>
            <p className="text-sm text-muted-foreground">Focus on tastes in your mouth</p>
          </div>
        </div>
        
        <div className="text-center pt-4">
          <Button 
            onClick={() => setSelectedExercise(null)}
            className="encouraging-button"
          >
            I Feel More Grounded
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-8 h-8 text-emergency animate-float" />
              <h1 className="text-4xl font-bold text-emergency">
                Emergency Support
              </h1>
              <Heart className="w-8 h-8 text-support animate-float [animation-delay:0.5s]" />
            </div>
            <div className="bg-emergency/10 border border-emergency/20 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-emergency" />
                <span className="font-semibold text-emergency">You're Not Alone</span>
              </div>
              <p className="text-emergency-foreground">
                If you're in crisis or need immediate support, help is available 24/7. 
                You matter, and there are people who care about you.
              </p>
            </div>
          </div>

          {/* Immediate Help Options */}
          {!selectedExercise && (
            <>
              {/* Emergency Contacts */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Get Help Now</h2>
                <div className="grid md:grid-cols-1 gap-4">
                  {emergencyContacts.map((contact, index) => {
                    const Icon = contact.icon;
                    return (
                      <Card key={index} className="calm-card">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-emergency/10 rounded-full flex items-center justify-center">
                                <Icon className="w-6 h-6 text-emergency" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{contact.title}</h3>
                                <p className="text-muted-foreground text-sm">{contact.description}</p>
                                <p className="text-xs text-primary">{contact.available}</p>
                              </div>
                            </div>
                            <Button 
                              onClick={() => callEmergencyContact(contact.phone, contact.title)}
                              className="emergency-action"
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Call {contact.phone}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Self-Care Resources */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Immediate Self-Care</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {selfCareResources.map((resource, index) => (
                    <Card key={index} className="calm-card hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-pointer">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto text-3xl">
                          {resource.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{resource.title}</h3>
                          <p className="text-muted-foreground text-sm">{resource.description}</p>
                        </div>
                        <Button
                          onClick={() => {
                            if (resource.action === "breathing") startBreathingExercise();
                            if (resource.action === "grounding") setSelectedExercise("grounding");
                            if (resource.action === "selfcare") {
                              toast.success("Remember: Drink water, take deep breaths, and be kind to yourself. 💙");
                            }
                          }}
                          className="encouraging-button w-full"
                        >
                          Start Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Exercise Components */}
          {selectedExercise === "breathing" && <BreathingExercise />}
          {selectedExercise === "grounding" && <GroundingExercise />}

          {/* Encouraging Message */}
          <Card className="calm-card">
            <CardContent className="p-6 text-center space-y-4">
              <Heart className="w-12 h-12 text-support mx-auto animate-pulse-reward" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-support-foreground">Remember</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Every storm passes. You've overcome challenges before, and you have the strength to get through this too. 
                  Your feelings are valid, and seeking help is a sign of courage, not weakness.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = "/chat"}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Friend
                </Button>
                <Button 
                  onClick={() => window.location.href = "/"}
                  className="encouraging-button"
                >
                  Return to Safe Space
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Emergency;