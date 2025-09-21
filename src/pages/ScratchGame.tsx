import { useState, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Coins, Trophy, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";

const rewards = [
  { type: "coin", amount: 10, icon: "🪙", message: "Found 10 gold coins! 💰" },
  { type: "coin", amount: 25, icon: "💎", message: "Amazing! 25 diamonds discovered! ✨" },
  { type: "coin", amount: 50, icon: "🌟", message: "Incredible! 50 star coins! 🌟" },
  { type: "boost", amount: 5, icon: "⚡", message: "Energy boost! +5 power-ups! ⚡" },
  { type: "heart", amount: 1, icon: "❤️", message: "You found a heart! Wellness +1! 💖" },
  { type: "rainbow", amount: 100, icon: "🌈", message: "RAINBOW JACKPOT! 100 coins! 🎉" },
];

const encouragingMessages = [
  "Every scratch reveals something special! ✨",
  "You're amazing at this game! Keep going! 🌟",
  "Your positive energy is bringing good luck! 💫",
  "What a wonderful discovery! You deserve it! 🎊",
  "Your persistence is paying off! 🌈",
  "You're spreading joy with every scratch! 😊",
];

const ScratchGame = () => {
  const [totalCoins, setTotalCoins] = useState(245);
  const [scratchedCards, setScratchedCards] = useState<boolean[]>(new Array(6).fill(false));
  const [revealedRewards, setRevealedRewards] = useState<(typeof rewards[0] | null)[]>(new Array(6).fill(null));
  const [isScratching, setIsScratching] = useState<number | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const initializeCanvas = (canvas: HTMLCanvasElement, index: number) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 150;

    // Create gradient scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#C0C0C0");
    gradient.addColorStop(0.5, "#FFFFFF");
    gradient.addColorStop(1, "#E6E6E6");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch-off text
    ctx.fillStyle = "#888";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Scratch to", canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText("Reveal!", canvas.width / 2, canvas.height / 2 + 10);
  };

  const startScratching = (index: number) => {
    if (scratchedCards[index]) return;
    setIsScratching(index);
  };

  const scratch = (e: React.MouseEvent<HTMLCanvasElement>, index: number) => {
    if (isScratching !== index || scratchedCards[index]) return;

    const canvas = canvasRefs.current[index];
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  const finishScratching = (index: number) => {
    if (scratchedCards[index]) return;

    setIsScratching(null);
    
    // Mark as scratched and reveal reward
    const newScratchedCards = [...scratchedCards];
    newScratchedCards[index] = true;
    setScratchedCards(newScratchedCards);

    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    const newRewards = [...revealedRewards];
    newRewards[index] = randomReward;
    setRevealedRewards(newRewards);

    // Add coins to total
    setTotalCoins(prev => prev + randomReward.amount);

    // Show encouraging message
    const encouragingMsg = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    
    setTimeout(() => {
      toast.success(randomReward.message);
      setTimeout(() => {
        toast.success(encouragingMsg);
      }, 1000);
    }, 500);
  };

  const resetGame = () => {
    setScratchedCards(new Array(6).fill(false));
    setRevealedRewards(new Array(6).fill(null));
    setIsScratching(null);
    
    // Reinitialize canvases
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        initializeCanvas(canvas, index);
      }
    });

    toast.success("New scratch cards ready! Good luck! 🍀");
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-reward animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-reward bg-clip-text text-transparent">
                Scratch & Win
              </h1>
              <Sparkles className="w-8 h-8 text-coin-gold animate-float [animation-delay:0.5s]" />
            </div>
            <p className="text-xl text-muted-foreground">
              Scratch the cards to discover amazing rewards! Every try brings joy! 🎉
            </p>
          </div>

          {/* Coin Counter */}
          <Card className="calm-card max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Coins className="w-8 h-8 text-coin-gold animate-pulse-reward" />
                <div>
                  <h2 className="text-3xl font-bold text-coin-gold">{totalCoins}</h2>
                  <p className="text-muted-foreground">Total Coins</p>
                </div>
                <Trophy className="w-8 h-8 text-reward" />
              </div>
            </CardContent>
          </Card>

          {/* Scratch Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="calm-card overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-center text-lg flex items-center justify-center space-x-2">
                    <Star className="w-5 h-5 text-reward" />
                    <span>Card #{index + 1}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="relative bg-gradient-reward rounded-lg overflow-hidden">
                    {/* Reward Display (shows when scratched) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-reward text-reward-foreground">
                      {revealedRewards[index] && (
                        <div className="text-center animate-bounce-gentle">
                          <div className="text-4xl mb-2">{revealedRewards[index]?.icon}</div>
                          <div className="text-xl font-bold">+{revealedRewards[index]?.amount}</div>
                        </div>
                      )}
                      {!revealedRewards[index] && (
                        <div className="text-center">
                          <div className="text-4xl mb-2">🎁</div>
                          <div className="text-sm">Mystery Prize!</div>
                        </div>
                      )}
                    </div>

                    {/* Scratch Canvas */}
                    <canvas
                      ref={(el) => {
                        canvasRefs.current[index] = el;
                        if (el && !scratchedCards[index]) {
                          initializeCanvas(el, index);
                        }
                      }}
                      className={`w-full h-full cursor-pointer ${scratchedCards[index] ? 'hidden' : ''}`}
                      onMouseDown={() => startScratching(index)}
                      onMouseMove={(e) => scratch(e, index)}
                      onMouseUp={() => isScratching === index && finishScratching(index)}
                      onMouseLeave={() => isScratching === index && finishScratching(index)}
                    />
                  </div>
                  
                  {scratchedCards[index] ? (
                    <div className="mt-3 text-center">
                      <p className="text-sm text-green-600 font-medium">Prize Revealed! 🎉</p>
                    </div>
                  ) : (
                    <div className="mt-3 text-center">
                      <p className="text-xs text-muted-foreground">
                        Click and drag to scratch! 🖱️
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={resetGame}
                className="reward-element"
                disabled={scratchedCards.every(card => !card)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                New Cards
              </Button>
            </div>
            
            <div className="max-w-2xl mx-auto bg-gradient-secondary/20 p-4 rounded-lg">
              <p className="text-sm text-center text-muted-foreground">
                🌟 Playing games is a great way to boost your mood and reward yourself! 
                Each win represents your resilience and positive energy! 🌈
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScratchGame;