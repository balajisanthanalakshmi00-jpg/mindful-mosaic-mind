import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MoodTracker from "./pages/MoodTracker";
import CreativeSpace from "./pages/CreativeSpace";
import ChatFriend from "./pages/ChatFriend";
import ScratchGame from "./pages/ScratchGame";
import Journal from "./pages/Journal";
import Emergency from "./pages/Emergency";
import RelaxGames from "./pages/RelaxGames";
import Affirmations from "./pages/Affirmations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood" element={<MoodTracker />} />
          <Route path="/creative" element={<CreativeSpace />} />
          <Route path="/chat" element={<ChatFriend />} />
          <Route path="/games" element={<ScratchGame />} />
          <Route path="/relax-games" element={<RelaxGames />} />
          <Route path="/affirmations" element={<Affirmations />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/emergency" element={<Emergency />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
