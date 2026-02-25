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
    trend: "up",
    icon: Coins,
    color: "bg-amber-500",
  },
  {
    title: "Gold Value",
    value: "₹45.2L",
    change: "+8%",
    trend: "up",
    icon: Gem,
    color: "bg-yellow-500",
  },
  {
    title: "Vehicles",
    value: "23",
    change: "+2",
    trend: "up",
    icon: Car,
    color: "bg-blue-500",
  },
  {
    title: "Customers",
    value: "342",
    change: "+28",
    trend: "up",
    icon: Users,
    color: "bg-green-500",
  },
];

const recentPawns = [
  { id: "P-2024-001", customer: "John Doe", item: "Gold Chain (24K)", amount: "₹45,000", status: "active", date: "Today" },
  { id: "P-2024-002", customer: "Sarah Smith", item: "Diamond Ring", amount: "₹32,000", status: "active", date: "Today" },
  { id: "P-2024-003", customer: "Mike Johnson", item: "Honda City", amount: "₹2,50,000", status: "pending", date: "Yesterday" },
  { id: "P-2024-004", customer: "Emily Brown", item: "Gold Bangles", amount: "₹28,000", status: "active", date: "Yesterday" },
];

const expiringPawns = [
  { id: "P-2024-089", customer: "Ramesh Kumar", item: "Gold Chain", daysLeft: 2, amount: "₹15,000" },
  { id: "P-2024-092", customer: "Priya Sharma", item: "Diamond Earrings", daysLeft: 3, amount: "₹22,000" },
  { id: "P-2024-078", customer: "Amit Patel", item: "Maruti Swift", daysLeft: 5, amount: "₹1,20,000" },
];

const statusColors = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  expired: "bg-red-100 text-red-700",
  redeemed: "bg-gray-100 text-gray-700",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back! Here's your pawn shop overview.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link to="/admin/pawns/new">
                <Coins className="mr-2 h-4 w-4" />
                New Pawn
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                      <span className="text-sm text-gray-400">vs last month</span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Pawns */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Pawns</CardTitle>
                <CardDescription>Latest pawn transactions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/pawns">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPawns.map((pawn) => (
                  <div
                    key={pawn.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Coins className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{pawn.customer}</p>
                        <p className="text-sm text-gray-500">{pawn.item}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{pawn.amount}</p>
                      <Badge className={statusColors[pawn.status as keyof typeof statusColors]}>
                        {pawn.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expiring Soon */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Expiring Soon
              </CardTitle>
              <CardDescription>Pawns expiring within 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiringPawns.map((pawn) => (
                  <div
                    key={pawn.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{pawn.id}</span>
                      <Badge
                        variant={pawn.daysLeft <= 3 ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {pawn.daysLeft} days left
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{pawn.customer}</p>
                    <p className="text-sm font-semibold mt-1">{pawn.amount}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/admin/pawns?filter=expiring">View All Expiring</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Today's Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">₹24,500</span>
              </div>
              <Progress value={75} className="mt-3" />
              <p className="text-xs text-gray-400 mt-2">75% of daily target</p>
            </CardContent>
          </Card>

          {/* Pending Approvals */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold">8</span>
              </div>
              <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                <Link to="/admin/pawns?status=pending">Review Now</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Active Customers */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold">156</span>
              </div>
              <Button variant="link" size="sm" className="px-0 mt-2" asChild>
                <Link to="/admin/customers">View All</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Default Rate */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Default Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold">2.3%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Below industry avg</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
