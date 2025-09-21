import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Save, Calendar, Heart, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
  timestamp: Date;
}

const journalPrompts = [
  "One thing I'm grateful for today is...",
  "Something that made me smile recently was...",
  "A challenge I faced today and how I handled it...",
  "Three things that went well today were...",
  "How I'm feeling right now and why...",
  "Something I learned about myself today...",
  "A small victory I want to celebrate...",
  "What I'm looking forward to tomorrow...",
  "A person who made my day better and how...",
  "Something I did today to take care of myself...",
];

const encouragingMessages = [
  "Your thoughts and feelings are important - thank you for sharing them! 📝",
  "Writing is a beautiful way to process emotions and grow! 🌱",
  "Every entry is a step toward better self-understanding! ✨",
  "You're creating a wonderful record of your journey! 📖",
  "Your self-reflection shows real emotional intelligence! 💙",
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    // Load existing entries from localStorage
    const savedEntries = localStorage.getItem("mindcare-journal");
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        setEntries(parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        })));
      } catch (error) {
        console.error("Error loading journal entries:", error);
      }
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      content: currentEntry,
      timestamp: new Date(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    
    // Save to localStorage
    localStorage.setItem("mindcare-journal", JSON.stringify(updatedEntries));
    
    setCurrentEntry("");
    setSelectedPrompt("");
    setIsWriting(false);

    const message = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    toast.success(message);
  };

  const usePrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    setCurrentEntry(prompt + " ");
    setIsWriting(true);
  };

  const startWriting = () => {
    setIsWriting(true);
    if (!currentEntry && !selectedPrompt) {
      const today = new Date().toLocaleDateString('en', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      setCurrentEntry(`Today is ${today}.\n\n`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="w-8 h-8 text-primary animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Journal Space
              </h1>
              <Sparkles className="w-8 h-8 text-accent animate-float [animation-delay:0.5s]" />
            </div>
            <div className="safe-space max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 mb-2">
                <Lock className="w-5 h-5 text-support" />
                <span className="font-semibold text-support-foreground">Private & Secure</span>
              </div>
              <p className="text-support-foreground">
                Your journal is completely private. Only you can see your thoughts and feelings. 
                Write freely and authentically.
              </p>
            </div>
          </div>

          {!isWriting ? (
            <div className="space-y-6">
              {/* Start Writing */}
              <Card className="calm-card">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Ready to write?</h2>
                    <p className="text-muted-foreground">
                      Express your thoughts, process your feelings, or just capture your day.
                    </p>
                  </div>
                  <Button 
                    onClick={startWriting}
                    className="encouraging-button"
                    size="lg"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Writing
                  </Button>
                </CardContent>
              </Card>

              {/* Journal Prompts */}
              <Card className="calm-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-support" />
                    <span>Writing Prompts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {journalPrompts.map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-4 text-left justify-start"
                        onClick={() => usePrompt(prompt)}
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-xl">✨</span>
                          <span className="text-sm">{prompt}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Writing Interface */
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{new Date().toLocaleDateString('en', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  placeholder="Write your thoughts here... Remember, this is your safe space to express anything on your mind."
                  className="min-h-64 text-base leading-relaxed resize-none"
                  autoFocus
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {currentEntry.length} characters
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setIsWriting(false);
                        setCurrentEntry("");
                        setSelectedPrompt("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={saveEntry}
                      className="encouraging-button"
                      disabled={!currentEntry.trim()}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Entry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Previous Entries */}
          {entries.length > 0 && (
            <Card className="calm-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Your Journal Entries ({entries.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entries.slice(0, 5).map((entry) => (
                    <div 
                      key={entry.id}
                      className="p-4 bg-gradient-warm border border-border/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary">
                          {entry.date}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {entry.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {entry.content.length > 200 
                          ? entry.content.substring(0, 200) + "..."
                          : entry.content
                        }
                      </p>
                    </div>
                  ))}
                  {entries.length > 5 && (
                    <p className="text-center text-muted-foreground text-sm">
                      And {entries.length - 5} more entries...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Journal;