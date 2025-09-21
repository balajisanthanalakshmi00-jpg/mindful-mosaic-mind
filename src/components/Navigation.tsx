import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Heart, 
  Palette, 
  MessageCircle, 
  Gamepad2, 
  BookOpen, 
  Phone,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/mood", label: "Mood Tracker", icon: Heart },
  { path: "/creative", label: "Creative Space", icon: Palette },
  { path: "/chat", label: "Chat Friend", icon: MessageCircle },
  { path: "/games", label: "Games", icon: Gamepad2 },
  { path: "/journal", label: "Journal", icon: BookOpen },
  { path: "/emergency", label: "Emergency", icon: Phone, isEmergency: true },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({ item, mobile = false }: { item: typeof navigationItems[0], mobile?: boolean }) => {
    const Icon = item.icon;
    const baseClasses = mobile 
      ? "flex items-center space-x-3 w-full p-4 rounded-lg transition-all duration-200"
      : "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    
    const activeClasses = item.isEmergency 
      ? "bg-emergency text-emergency-foreground"
      : "bg-primary text-primary-foreground";
    
    const inactiveClasses = item.isEmergency
      ? "text-emergency hover:bg-emergency/10"
      : "text-muted-foreground hover:bg-primary/10 hover:text-primary";

    return (
      <NavLink
        to={item.path}
        onClick={() => mobile && setIsOpen(false)}
        className={({ isActive }) => 
          `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
        }
      >
        <Icon className={mobile ? "w-5 h-5" : "w-4 h-4"} />
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center group-hover:animate-pulse-reward">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MindCare
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gradient-warm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6 text-primary" />
                  <span className="text-lg font-bold">MindCare</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <NavItem key={item.path} item={item} mobile />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};