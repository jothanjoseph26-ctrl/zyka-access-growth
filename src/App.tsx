import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import NotFound from "./pages/NotFound";
import SEOManager from "./pages/admin/SEOManager";
import GoogleBusinessManager from "./pages/admin/GoogleBusinessManager";
import AdminDashboard from "./pages/admin/Dashboard";
import PawnsPage from "./pages/admin/Pawns";
import NewPawnPage from "./pages/admin/NewPawn";
import CustomersPage from "./pages/admin/Customers";
import GoldPage from "./pages/admin/Gold";
import VehiclesPage from "./pages/admin/Vehicles";
import DocumentsPage from "./pages/admin/Documents";
import ReportsPage from "./pages/admin/Reports";
import SettingsPage from "./pages/admin/Settings";
import CustomerDashboard from "./pages/customer/Dashboard";
import CalculatorPage from "./pages/customer/Calculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pawns" element={<PawnsPage />} />
          <Route path="/admin/pawns/new" element={<NewPawnPage />} />
          <Route path="/admin/customers" element={<CustomersPage />} />
          <Route path="/admin/gold" element={<GoldPage />} />
          <Route path="/admin/vehicles" element={<VehiclesPage />} />
          <Route path="/admin/documents" element={<DocumentsPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/seo" element={<SEOManager />} />
          <Route path="/admin/google-business" element={<GoogleBusinessManager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
