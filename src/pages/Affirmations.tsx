import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Star, Sparkles, RefreshCw, ChevronDown } from "lucide-react";

const affirmations = [
  "You are worthy of love and kindness, exactly as you are today.",
  "Your feelings are valid, and it's okay to take things one step at a time.",
  "You have survived 100% of your difficult days so far - you're stronger than you know.",
  "It's okay to rest. It's okay to take breaks. You don't have to be productive all the time.",
  "You are not defined by your mistakes. Every day is a chance to grow and learn.",
  "Your mental health matters. Taking care of yourself is not selfish.",
  "You don't have to be perfect. You just have to be you, and that's enough.",
  "Progress isn't always visible. Small steps forward are still progress.",
  "You have the power to create positive changes in your life, one choice at a time.",
  "Your story isn't over yet. There are beautiful chapters still to be written.",
  "You are allowed to feel proud of yourself for the little things.",
  "Bad days don't last, but resilient people like you do.",
  "You deserve compassion, especially from yourself.",
  "Your voice matters. Your thoughts and feelings are important.",
  "You are growing and learning, even when it doesn't feel like it.",
  "It's okay to ask for help. Reaching out is a sign of strength, not weakness.",
  "You are capable of handling whatever today brings.",
  "Your past does not determine your future. You have the power to change your story.",
  "You are enough, right here, right now, just as you are.",
  "Every breath you take is a reminder that you have purpose and value.",
  "You have unique gifts and talents that the world needs.",
  "It's okay to say no to things that don't serve your wellbeing.",
  "You are worthy of good things happening to you.",
  "Your struggles have given you wisdom and empathy that others need.",
  "You have the strength to overcome challenges, even when they feel overwhelming.",
  "Taking care of yourself allows you to better care for others.",
  "You are allowed to change your mind and grow in new directions.",
  "Your sensitivity is a superpower, not a weakness.",
  "You create meaning in your life through your choices and actions.",
  "You are deserving of patience, understanding, and gentle treatment.",
  "Every small act of self-care is an act of courage and self-love.",
  "You have the right to set boundaries that protect your peace.",
  "Your dreams and goals are valid, no matter how big or small.",
  "You bring something special to this world that no one else can.",
  "It's okay to feel everything deeply - it means you're fully alive.",
  "You are worthy of taking up space and being heard.",
  "Your journey is unique, and comparison to others is not necessary.",
  "You have the ability to find joy in small, everyday moments.",
  "You are resilient, adaptable, and capable of growth.",
  "Your worth is not determined by your productivity or achievements."
];

const Affirmations = () => {
  const [currentAffirmations, setCurrentAffirmations] = useState<string[]>([]);
  const [favoriteAffirmations, setFavoriteAffirmations] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    loadNewAffirmations();
  }, []);

  const loadNewAffirmations = () => {
    const shuffled = [...affirmations].sort(() => Math.random() - 0.5);
    setCurrentAffirmations(shuffled.slice(0, 10));
  };

  const addToFavorites = (affirmation: string) => {
    if (!favoriteAffirmations.includes(affirmation)) {
      setFavoriteAffirmations(prev => [...prev, affirmation]);
    }
  };

  const removeFromFavorites = (affirmation: string) => {
    setFavoriteAffirmations(prev => prev.filter(fav => fav !== affirmation));
  };

  const isFavorite = (affirmation: string) => {
    return favoriteAffirmations.includes(affirmation);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-8 h-8 text-secondary animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Daily Affirmations
              </h1>
              <Heart className="w-8 h-8 text-support animate-float [animation-delay:0.5s]" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Scroll through these gentle reminders of your worth and strength. Save the ones that resonate with you.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={loadNewAffirmations}
              className="encouraging-button"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Affirmations
            </Button>
            
            <Button 
              onClick={() => setShowFavorites(!showFavorites)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Star className={`w-4 h-4 ${showFavorites ? 'fill-current text-support' : ''}`} />
              <span>{showFavorites ? 'Show All' : `Favorites (${favoriteAffirmations.length})`}</span>
            </Button>
          </div>

          {/* Affirmations Display */}
          <Card className="calm-card">
            <CardContent className="p-0">
              <ScrollArea className="h-96 px-6 py-4">
                <div className="space-y-4">
                  {(showFavorites ? favoriteAffirmations : currentAffirmations).map((affirmation, index) => (
                    <Card 
                      key={index} 
                      className="bg-gradient-subtle hover:bg-gradient-subtle/80 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between space-x-4">
                          <p className="text-foreground leading-relaxed flex-1">
                            {affirmation}
                          </p>
                          <Button
                            onClick={() => isFavorite(affirmation) ? removeFromFavorites(affirmation) : addToFavorites(affirmation)}
                            variant="ghost"
                            size="sm"
                            className="flex-shrink-0"
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                isFavorite(affirmation) 
                                  ? 'fill-current text-support' 
                                  : 'text-muted-foreground hover:text-support'
                              }`} 
                            />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {showFavorites && favoriteAffirmations.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No favorites yet! Star the affirmations that speak to you.</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Scroll Indicator */}
              <div className="border-t bg-gradient-warm/50 p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                  <span className="text-sm">Scroll for more encouraging words</span>
                  <ChevronDown className="w-4 h-4 animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Encouragement Footer */}
          <Card className="calm-card text-center">
            <CardContent className="py-6">
              <p className="text-lg text-support font-medium mb-2">
                🌟 Take a moment to truly absorb these words 🌟
              </p>
              <p className="text-sm text-muted-foreground">
                Your mind is powerful. The words you read and believe about yourself shape your reality.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Affirmations;