import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Gem,
  Car,
  Coins,
  Users,
  FileText,
  Settings,
  BarChart3,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import logoWhite from "@/assets/logo-white.png";

const navItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Pawns", href: "/admin/pawns", icon: Coins },
  { title: "Gold", href: "/admin/gold", icon: Gem },
  { title: "Vehicles", href: "/admin/vehicles", icon: Car },
  { title: "Customers", href: "/admin/customers", icon: Users },
  { title: "Documents", href: "/admin/documents", icon: FileText },
  { title: "Reports", href: "/admin/reports", icon: BarChart3 },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logoWhite} alt="Zyka Credit" className="h-8 w-auto" />
            <span className="font-bold text-lg hidden sm:inline text-foreground">Admin</span>
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pawns, customers..."
              className="pl-9 bg-muted border-border"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              3
            </Badge>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">A</span>
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 bg-card border-r border-border z-50 transition-all duration-300",
          mobileOpen ? "w-64" : "w-64 -translate-x-full lg:translate-x-0",
          sidebarOpen ? "lg:w-64" : "lg:w-16"
        )}
      >
        <div className="flex flex-col h-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex absolute -right-3 top-4 h-6 w-6 bg-card border border-border shadow-sm rounded-full"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-3 w-3" />
          </Button>

          <nav className="flex-1 p-3 space-y-1 mt-4 lg:mt-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href ||
                (item.href !== "/admin" && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    !sidebarOpen && "lg:justify-center lg:px-2"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          {sidebarOpen && (
            <div className="p-4 border-t border-border">
              <div className="bg-primary/10 rounded-lg p-3">
                <p className="text-xs text-primary font-medium">Today's Revenue</p>
                <p className="text-lg font-bold text-foreground">₦2,450,000</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
