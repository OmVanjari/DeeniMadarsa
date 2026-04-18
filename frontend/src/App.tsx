import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Donation from "./pages/Donation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCourses from "./pages/AdminCourses";
import AdminNews from "./pages/AdminNews";
import AdminUsers from "./pages/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
   
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
