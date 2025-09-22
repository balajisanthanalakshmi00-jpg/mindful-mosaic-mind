import { useState, useEffect } from "react";
import { Heart, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

const encouragingQuotes = [
  "You are stronger than you think 💙",
  "Every small step forward is progress 🌟",
  "Your feelings are valid and important ✨", 
  "You have the power to change your day 🌈",
  "Take a deep breath - you've got this 🫧",
  "Growth happens one day at a time 🌱",
  "You're not alone in this journey 🤝",
  "Your mental health matters 💚",
];

const loadingQuotes = [
  "Creating a safe space for you...",
  "Preparing your wellness journey...",
  "Loading encouragement and support...",
  "Setting up your creative space...",
];

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(encouragingQuotes[0]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show loading quote first
    const loadingQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];
    setCurrentQuote(loadingQuote);

    const timer = setTimeout(() => {
      const randomQuote = encouragingQuotes[Math.floor(Math.random() * encouragingQuotes.length)];
      setCurrentQuote(randomQuote);
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="animate-float">
            <Heart className="w-16 h-16 text-support mx-auto animate-pulse-reward" />
          </div>
          <p className="text-xl text-foreground font-medium animate-bounce-gentle">
            {currentQuote}
          </p>
          <div className="flex space-x-2 justify-center">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome to MindCare
              </h1>
              <Star className="w-8 h-8 text-accent animate-float [animation-delay:0.5s]" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your safe space for mental wellness, creativity, and growth
            </p>
          </div>

          <Card className="calm-card max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-6 h-6 text-support" />
                <h3 className="font-semibold text-support-foreground">Daily Inspiration</h3>
              </div>
              <p className="text-lg text-center font-medium text-primary">
                {currentQuote}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
          <FeatureCard
            title="Track Your Mood"
            description="Express how you're feeling with emoji-based tracking"
            icon="🎭"
            link="/mood"
            gradient="bg-gradient-primary"
          />
          
          <FeatureCard
            title="Creative Space"
            description="Draw, doodle, and express your creativity freely"
            icon="🎨"
            link="/creative"
            gradient="bg-gradient-accent"
          />
          
          <FeatureCard
            title="Chat with a Friend"
            description="Talk to our supportive AI companion anytime"
            icon="💬"
            link="/chat"
            gradient="bg-gradient-secondary"
          />
          
          <FeatureCard
            title="Fun Games"
            description="Play calming games and earn golden rewards"
            icon="🎮"
            link="/games"
            gradient="bg-gradient-reward"
          />
          
          <FeatureCard
            title="Journal Space"
            description="Write your thoughts in a private, safe space"
            icon="📔"
            link="/journal"
            gradient="bg-gradient-primary"
          />
          
          <FeatureCard
            title="Emergency Support"
            description="Quick access to help when you need it most"
            icon="🆘"
            link="/emergency"
            gradient="bg-emergency text-emergency-foreground"
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ title, description, icon, link, gradient }: {
  title: string;
  description: string;
  icon: string;
  link: string;
  gradient: string;
}) => {
  return (
    <Card className="calm-card hover:shadow-medium transition-all duration-300 hover:scale-105 group cursor-pointer h-full">
      <CardContent className="p-4 text-center space-y-3 h-full flex flex-col">
        <div className={`${gradient} w-12 h-12 rounded-full flex items-center justify-center mx-auto text-2xl group-hover:animate-bounce-gentle`}>
          {icon}
        </div>
        <div className="space-y-1 flex-grow">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          onClick={() => window.location.href = link}
        >
          Go
        </Button>
      </CardContent>
    </Card>
  );
};

export default Home;