import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Palette, Music, Sparkles, Heart, Star, Flower, Zap } from "lucide-react";

const RelaxGames = () => {
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingCount, setBreathingCount] = useState(4);
  const [isBreathing, setIsBreathing] = useState(false);
  const [colorTherapyColors, setColorTherapyColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [bubbleCount, setBubbleCount] = useState(0);
  const [points, setPoints] = useState(0);

  const colors = [
    "hsl(var(--calm-blue))", "hsl(var(--support-green))", "hsl(var(--warm-yellow))",
    "hsl(var(--gentle-purple))", "hsl(var(--soft-pink))", "hsl(var(--mint-green))",
    "hsl(var(--lavender))", "hsl(var(--peach))", "hsl(var(--sky-blue))"
  ];

  useEffect(() => {
    if (isBreathing) {
      const timer = setInterval(() => {
        setBreathingCount(prev => {
          if (prev === 1) {
            if (breathingPhase === "inhale") {
              setBreathingPhase("hold");
              return 4;
            } else if (breathingPhase === "hold") {
              setBreathingPhase("exhale");
              return 4;
            } else {
              setBreathingPhase("inhale");
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBreathing, breathingPhase]);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathingPhase("inhale");
    setBreathingCount(4);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setPoints(prev => prev + 10);
  };

  const generateColors = () => {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    setColorTherapyColors(shuffled.slice(0, 6));
  };

  const selectColor = (color: string) => {
    setSelectedColor(color);
    setPoints(prev => prev + 5);
  };

  const createBubble = () => {
    setBubbleCount(prev => prev + 1);
    setPoints(prev => prev + 3);
    setTimeout(() => setBubbleCount(prev => Math.max(0, prev - 1)), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-secondary animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Relax & Play
              </h1>
              <Sparkles className="w-8 h-8 text-support animate-float [animation-delay:0.5s]" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a break with these calming, non-competitive activities designed to help you relax and recharge.
            </p>
            <div className="flex items-center justify-center space-x-2 text-support">
              <Star className="w-5 h-5" />
              <span className="font-semibold">Points Earned: {points}</span>
              <Star className="w-5 h-5" />
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Breathing Exercise */}
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-support" />
                  <span>Breathing Bubble</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="flex items-center justify-center">
                  <div 
                    className={`w-24 h-24 rounded-full bg-gradient-primary transition-all duration-1000 flex items-center justify-center text-white font-bold ${
                      isBreathing ? 
                      (breathingPhase === "inhale" ? "scale-125" : 
                       breathingPhase === "hold" ? "scale-125" : "scale-75") : 
                      "scale-100"
                    }`}
                  >
                    {isBreathing ? breathingCount : "❤️"}
                  </div>
                </div>
                <div className="space-y-2">
                  {isBreathing && (
                    <p className="text-sm text-muted-foreground capitalize">
                      {breathingPhase} for {breathingCount} seconds
                    </p>
                  )}
                  <Button 
                    onClick={isBreathing ? stopBreathing : startBreathing}
                    className="encouraging-button"
                  >
                    {isBreathing ? "Complete Session (+10 points)" : "Start Breathing"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Color Therapy */}
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-secondary" />
                  <span>Color Therapy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Choose colors that make you feel peaceful and calm.
                </p>
                {colorTherapyColors.length === 0 ? (
                  <Button onClick={generateColors} variant="outline" className="w-full">
                    Generate Calming Colors
                  </Button>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {colorTherapyColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => selectColor(color)}
                        className={`w-full h-12 rounded-lg transition-all duration-300 hover:scale-105 ${
                          selectedColor === color ? "ring-2 ring-primary" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
                {selectedColor && (
                  <p className="text-xs text-support text-center">+5 points! Beautiful choice!</p>
                )}
                <Button onClick={generateColors} variant="outline" className="w-full">
                  New Colors
                </Button>
              </CardContent>
            </Card>

            {/* Bubble Pop */}
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Bubble Garden</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative h-32 bg-gradient-subtle rounded-lg overflow-hidden">
                  {Array.from({ length: bubbleCount }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-6 h-6 bg-gradient-primary rounded-full animate-bounce opacity-70"
                      style={{
                        left: `${Math.random() * 80}%`,
                        top: `${Math.random() * 70}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                  {bubbleCount === 0 && (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Click to create bubbles
                    </div>
                  )}
                </div>
                <Button 
                  onClick={createBubble}
                  className="encouraging-button w-full"
                  disabled={bubbleCount >= 10}
                >
                  {bubbleCount >= 10 ? "Garden is Full!" : `Create Bubble (+3 points)`}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Bubbles: {bubbleCount}/10
                </p>
              </CardContent>
            </Card>

            {/* Flower Garden */}
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flower className="w-5 h-5 text-support" />
                  <span>Gratitude Garden</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Plant a flower for something you're grateful for today.
                </p>
                <div className="grid grid-cols-4 gap-2 min-h-[80px] bg-gradient-subtle rounded-lg p-2">
                  {Array.from({ length: Math.floor(points / 20) }, (_, i) => (
                    <div key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                      🌸
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Earn 20 points to grow a flower! Current: {points}/20
                </p>
              </CardContent>
            </Card>

            {/* Zen Patterns */}
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Music className="w-5 h-5 text-primary" />
                  <span>Zen Patterns</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-1 aspect-square bg-gradient-subtle rounded-lg p-2">
                  {Array.from({ length: 9 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPoints(prev => prev + 2)}
                      className="aspect-square bg-gradient-primary/20 rounded hover:bg-gradient-primary/40 transition-all duration-300 hover:scale-95"
                    />
                  ))}
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Tap squares to create calming patterns (+2 points each)
                </p>
              </CardContent>
            </Card>

            {/* Peaceful Counter */}
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-support" />
                  <span>Mindful Counter</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-support mb-4">
                    {Math.floor(points / 5)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Count your mindful moments
                  </p>
                </div>
                <Button 
                  onClick={() => setPoints(prev => prev + 5)}
                  className="encouraging-button w-full"
                >
                  Add Mindful Moment (+5 points)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Encouragement Footer */}
          <Card className="calm-card text-center">
            <CardContent className="py-6">
              <p className="text-lg text-support font-medium mb-2">
                🌟 You're doing amazing! Every moment of self-care counts! 🌟
              </p>
              <p className="text-sm text-muted-foreground">
                Remember: These games have no winning or losing - just enjoying the peaceful moments.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RelaxGames;