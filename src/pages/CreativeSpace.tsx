import { useRef, useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Eraser, RotateCcw, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";

const colors = [
  "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
  "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB",
  "#A52A2A", "#808080", "#90EE90", "#FFE4B5", "#DDA0DD"
];

const brushSizes = [2, 5, 10, 15, 20];

const encouragingMessages = [
  "Beautiful work! Your creativity is shining! ✨",
  "Art is a wonderful way to express yourself! 🎨", 
  "Keep creating - there's no wrong way to make art! 🌈",
  "Your creative spirit is amazing! 💖",
  "Art helps heal the heart - keep going! 🌟",
];

const CreativeSpace = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isErasing, setIsErasing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Set initial background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setLastPos({ x, y });
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (isErasing) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    setLastPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    toast.success("Canvas cleared! Ready for new creativity! 🎨");
  };

  const saveArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `mindcare-artwork-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    const message = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    toast.success(message);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Palette className="w-8 h-8 text-accent animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                Creative Space
              </h1>
              <Sparkles className="w-8 h-8 text-primary animate-float [animation-delay:0.5s]" />
            </div>
            <p className="text-xl text-muted-foreground">
              Express yourself freely - there's no wrong way to create!
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Tools Panel */}
            <Card className="calm-card lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Art Tools</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Colors */}
                <div>
                  <h3 className="font-medium mb-3">Colors</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                          currentColor === color ? 'border-primary ring-2 ring-primary/50' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setCurrentColor(color);
                          setIsErasing(false);
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Brush Size */}
                <div>
                  <h3 className="font-medium mb-3">Brush Size</h3>
                  <div className="space-y-2">
                    {brushSizes.map((size) => (
                      <Button
                        key={size}
                        variant={brushSize === size ? "default" : "outline"}
                        size="sm"
                        className={`w-full ${brushSize === size ? 'encouraging-button' : ''}`}
                        onClick={() => setBrushSize(size)}
                      >
                        {size}px
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="space-y-2">
                  <Button
                    variant={!isErasing ? "default" : "outline"}
                    className={`w-full ${!isErasing ? 'encouraging-button' : ''}`}
                    onClick={() => setIsErasing(false)}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Draw
                  </Button>
                  
                  <Button
                    variant={isErasing ? "default" : "outline"}
                    className={`w-full ${isErasing ? 'encouraging-button' : ''}`}
                    onClick={() => setIsErasing(true)}
                  >
                    <Eraser className="w-4 h-4 mr-2" />
                    Erase
                  </Button>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCanvas}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  
                  <Button
                    className="w-full reward-element"
                    onClick={saveArtwork}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Art
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Canvas */}
            <Card className="calm-card lg:col-span-3">
              <CardContent className="p-6">
                <div className="bg-white rounded-lg shadow-inner border-2 border-dashed border-border/50">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-96 cursor-crosshair rounded-lg"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={(e) => {
                      e.preventDefault();
                      draw(e);
                    }}
                    onTouchEnd={stopDrawing}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Use your mouse or finger to draw. Let your creativity flow! 🎨
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreativeSpace;