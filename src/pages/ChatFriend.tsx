import { useState, useRef, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Heart, Shield } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const welcomeMessage = "Hi there! I'm here to help and support you, not to judge you. 💙 You can share anything that's on your mind - your feelings, worries, or just chat about your day. This is your safe space, and I'm here to listen. What would you like to talk about?";

const friendlyResponses = [
  "Hey, that sounds really tough. I'm here for you and I want you to know that what you're feeling is totally normal. Want to tell me more about it?",
  "Wow, thank you for trusting me with that. It takes a lot of courage to share something personal. How are you feeling right now?",
  "I can really hear the stress in what you're saying. That must be weighing on you a lot. Have you been able to talk to anyone else about this?",
  "You know what? It's completely okay to feel overwhelmed sometimes. Everyone goes through rough patches. What's been the hardest part for you?",
  "I'm really glad you felt comfortable sharing that with me. You're not alone in this, okay? What would help you feel a little better right now?",
  "That sounds like a lot to handle. I'm here to listen, no judgment at all. Sometimes just talking about it can help. How long have you been dealing with this?",
  "I hear you, and I want you to know that your feelings are valid. It's okay to have bad days. What usually helps you when you're feeling like this?",
  "Thanks for opening up to me. That must have been hard to say. I'm here to support you through this. What's one small thing that might make today a bit easier?",
  "I can tell this is really affecting you. You're being so brave by talking about it. Is there anything specific that's been making it worse lately?",
  "I'm here to listen to whatever you need to share. No pressure at all. Sometimes it just helps to know someone cares, right? What's been on your mind?",
  "That sounds really challenging. I'm proud of you for reaching out. What's been the most difficult part about all of this?",
  "I can sense you're going through a lot right now. Want to tell me more about what's been happening? I'm here to listen, not judge.",
];

const ChatFriend = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: welcomeMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const randomResponse = friendlyResponses[Math.floor(Math.random() * friendlyResponses.length)];
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot", 
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <MessageCircle className="w-8 h-8 text-secondary animate-float" />
              <h1 className="text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Chat with a Friend
              </h1>
              <Heart className="w-8 h-8 text-support animate-float [animation-delay:0.5s]" />
            </div>
            <div className="safe-space max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-support" />
                <span className="font-semibold text-support-foreground">Safe Space Promise</span>
              </div>
              <p className="text-support-foreground">
                This is a judgment-free zone. Share your thoughts, feelings, and experiences safely. 
                Your privacy and wellbeing are our priority.
              </p>
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="calm-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-secondary" />
                <span>Your Supportive Chat Friend</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages Area */}
              <ScrollArea className="h-96 px-6 py-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-gradient-primary text-primary-foreground ml-4"
                            : "bg-gradient-secondary text-secondary-foreground mr-4"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg mr-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t bg-gradient-warm/50 p-4">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here... I'm listening 💙"
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="encouraging-button"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send • Remember, I'm here to support, not judge 💚
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Support Options */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 text-left"
              onClick={() => setInputMessage("I'm feeling stressed about school")}
            >
              <div>
                <p className="font-medium">📚 School Stress</p>
                <p className="text-xs text-muted-foreground">Talk about academic pressure</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 text-left"
              onClick={() => setInputMessage("I'm having trouble with my friends")}
            >
              <div>
                <p className="font-medium">👥 Friend Issues</p>
                <p className="text-xs text-muted-foreground">Discuss relationships</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto p-4 text-left"
              onClick={() => setInputMessage("I'm feeling anxious lately")}
            >
              <div>
                <p className="font-medium">😰 Anxiety</p>
                <p className="text-xs text-muted-foreground">Share your worries</p>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatFriend;