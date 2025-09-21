import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { CalendarDays, TrendingUp, Heart } from "lucide-react";
import { toast } from "sonner";

const moodOptions = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-blue-500" },
  { emoji: "😔", label: "Sad", value: 2, color: "text-blue-400" },
  { emoji: "😐", label: "Okay", value: 3, color: "text-gray-500" },
  { emoji: "🙂", label: "Good", value: 4, color: "text-green-400" },
  { emoji: "😊", label: "Great", value: 5, color: "text-green-500" },
  { emoji: "🤩", label: "Amazing", value: 6, color: "text-yellow-500" },
];

const encouragingMessages = [
  "Every feeling is valid - thank you for checking in! 💙",
  "You're taking great care of your mental health! 🌟", 
  "Tracking your mood shows real self-awareness! ✨",
  "Your emotional journey matters - keep going! 🌈",
  "Small steps like this make a big difference! 🌱",
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodData, setMoodData] = useState([
    { day: "Mon", mood: 3 },
    { day: "Tue", mood: 4 },
    { day: "Wed", mood: 2 },
    { day: "Thu", mood: 5 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 3 },
    { day: "Sun", mood: 4 },
  ]);
  const [currentStreak, setCurrentStreak] = useState(7);

  const handleMoodSelect = (moodValue: number) => {
    setSelectedMood(moodValue);
  };

  const saveMood = () => {
    if (selectedMood === null) return;
    
    const today = new Date().toLocaleDateString('en', { weekday: 'short' });
    const newData = [...moodData.slice(1), { day: today, mood: selectedMood }];
    setMoodData(newData);
    setCurrentStreak(prev => prev + 1);
    
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    toast.success(randomMessage);
    setSelectedMood(null);
  };

  const selectedMoodInfo = selectedMood ? moodOptions.find(m => m.value === selectedMood) : null;
  const averageMood = (moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-8 h-8 text-primary animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Mood Tracker
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              How are you feeling today? Your emotions matter.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="calm-card">
              <CardContent className="p-6 text-center">
                <CalendarDays className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-primary">{currentStreak}</h3>
                <p className="text-muted-foreground">Days tracking</p>
              </CardContent>
            </Card>
            
            <Card className="calm-card">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-secondary">{averageMood}</h3>
                <p className="text-muted-foreground">Average this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Mood Selection */}
          <Card className="calm-card">
            <CardHeader>
              <CardTitle className="text-center text-xl">How are you feeling right now?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood.value}
                    variant={selectedMood === mood.value ? "default" : "outline"}
                    className={`h-20 flex-col space-y-2 transition-all duration-300 hover:scale-105 ${
                      selectedMood === mood.value ? 'encouraging-button' : ''
                    }`}
                    onClick={() => handleMoodSelect(mood.value)}
                  >
                    <span className="text-3xl">{mood.emoji}</span>
                    <span className="text-sm">{mood.label}</span>
                  </Button>
                ))}
              </div>
              
              {selectedMoodInfo && (
                <div className="text-center space-y-4">
                  <div className="p-4 bg-gradient-secondary/20 rounded-lg">
                    <p className="text-lg">
                      You're feeling <span className="font-semibold text-primary">{selectedMoodInfo.label}</span> today
                      <span className="text-2xl ml-2">{selectedMoodInfo.emoji}</span>
                    </p>
                  </div>
                  <Button 
                    onClick={saveMood}
                    className="encouraging-button w-full md:w-auto"
                  >
                    Save Today's Mood
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mood Chart */}
          <Card className="calm-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Your Mood This Week</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <XAxis dataKey="day" />
                    <YAxis domain={[1, 6]} />
                    <Tooltip 
                      formatter={(value: number) => [
                        moodOptions.find(m => m.value === value)?.label || value, 
                        "Mood"
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: 'hsl(var(--primary-glow))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MoodTracker;