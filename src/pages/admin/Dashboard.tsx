import { Link } from "react-router-dom";
import {
  Coins,
  Gem,
  Car,
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar,
  DollarSign,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AdminLayout from "@/layouts/AdminLayout";

const stats = [
  {
    title: "Active Pawns",
    value: "156",
    change: "+12%",
    trend: "up" as const,
    icon: Coins,
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    title: "Gold Holdings",
    value: "₦45.2M",
    change: "+8%",
    trend: "up" as const,
    icon: Gem,
    gradient: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    title: "Vehicles",
    value: "23",
    change: "+2",
    trend: "up" as const,
    icon: Car,
    gradient: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
  },
  {
    title: "Customers",
    value: "342",
    change: "+28",
    trend: "up" as const,
    icon: Users,
    gradient: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-500",
  },
];

const recentPawns = [
  { id: "P-2024-001", customer: "Chukwuma A.", item: "Gold Chain (24K)", amount: "₦450,000", status: "active", date: "Today" },
  { id: "P-2024-002", customer: "Amina B.", item: "Diamond Ring", amount: "₦320,000", status: "active", date: "Today" },
  { id: "P-2024-003", customer: "Emeka O.", item: "Honda Accord", amount: "₦2,500,000", status: "pending", date: "Yesterday" },
  { id: "P-2024-004", customer: "Fatima S.", item: "Gold Bangles", amount: "₦280,000", status: "active", date: "Yesterday" },
];

const expiringPawns = [
  { id: "P-2024-089", customer: "Olu K.", item: "Gold Chain", daysLeft: 2, amount: "₦150,000" },
  { id: "P-2024-092", customer: "Grace N.", item: "Diamond Earrings", daysLeft: 3, amount: "₦220,000" },
  { id: "P-2024-078", customer: "Ibrahim M.", item: "Toyota Camry", daysLeft: 5, amount: "₦1,200,000" },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  expired: "bg-destructive/15 text-destructive border-destructive/20",
  redeemed: "bg-muted text-muted-foreground border-border",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link to="/admin/pawns/new">
                <Plus className="mr-2 h-4 w-4" />
                New Pawn
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden border-border/50 bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1.5 pt-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                      )}
                      <span className="text-xs text-emerald-400 font-medium">{stat.change}</span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Pawns */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg">Recent Pawns</CardTitle>
                <CardDescription>Latest pawn transactions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary">
                <Link to="/admin/pawns">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPawns.map((pawn) => (
                  <div
                    key={pawn.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Coins className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{pawn.customer}</p>
                        <p className="text-xs text-muted-foreground">{pawn.item}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-sm text-foreground">{pawn.amount}</p>
                      <Badge variant="outline" className={statusColors[pawn.status]}>
                        {pawn.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expiring Soon */}
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-400" />
                Expiring Soon
              </CardTitle>
              <CardDescription>Pawns expiring within 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringPawns.map((pawn) => (
                  <div
                    key={pawn.id}
                    className="p-3 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-foreground">{pawn.id}</span>
                      <Badge
                        variant="outline"
                        className={
                          pawn.daysLeft <= 3
                            ? "bg-destructive/15 text-destructive border-destructive/20"
                            : "bg-amber-500/15 text-amber-400 border-amber-500/20"
                        }
                      >
                        {pawn.daysLeft}d left
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{pawn.customer}</p>
                    <p className="text-sm font-semibold mt-1 text-foreground">{pawn.amount}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm" asChild>
                <Link to="/admin/pawns?filter=expiring">View All Expiring</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                <DollarSign className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-foreground">₦2,450,000</p>
              <Progress value={75} className="mt-3 h-1.5" />
              <p className="text-xs text-muted-foreground mt-2">75% of daily target</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <Clock className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <Button variant="link" size="sm" className="px-0 mt-1 text-primary" asChild>
                <Link to="/admin/pawns?status=pending">Review Now →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <Button variant="link" size="sm" className="px-0 mt-1 text-primary" asChild>
                <Link to="/admin/customers">View All →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Default Rate</p>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-foreground">2.3%</p>
              <p className="text-xs text-muted-foreground mt-2">Below industry average</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
