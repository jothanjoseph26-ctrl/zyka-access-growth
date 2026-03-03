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
import AdminLogin from "./pages/admin/Login";
import CustomerDashboard from "./pages/customer/Dashboard";
import CalculatorPage from "./pages/customer/Calculator";
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/pawns" element={<ProtectedRoute><PawnsPage /></ProtectedRoute>} />
          <Route path="/admin/pawns/new" element={<ProtectedRoute><NewPawnPage /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute><CustomersPage /></ProtectedRoute>} />
          <Route path="/admin/gold" element={<ProtectedRoute><GoldPage /></ProtectedRoute>} />
          <Route path="/admin/vehicles" element={<ProtectedRoute><VehiclesPage /></ProtectedRoute>} />
          <Route path="/admin/documents" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/admin/seo" element={<ProtectedRoute><SEOManager /></ProtectedRoute>} />
          <Route path="/admin/google-business" element={<ProtectedRoute><GoogleBusinessManager /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
