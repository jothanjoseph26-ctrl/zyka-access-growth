import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Coins,
  Gem,
  Car,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar,
  DollarSign,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import type { Pawn, Customer } from "@/integrations/supabase/types";
import AdminLayout from "@/layouts/AdminLayout";

interface DashboardStats {
  activePawns: number;
  goldValue: number;
  vehicleCount: number;
  totalCustomers: number;
  pendingPawns: number;
  todayRevenue: number;
  expiringPawns: Pawn[];
  recentPawns: (Pawn & { customer_name: string })[];
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  expired: "bg-red-100 text-red-700",
  redeemed: "bg-gray-100 text-gray-700",
  extended: "bg-blue-100 text-blue-700",
  forfeited: "bg-red-100 text-red-700",
};

const typeIcons: Record<string, typeof Coins> = {
  gold: Coins,
  diamond: Gem,
  vehicle: Car,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch all pawns
        const { data: pawns, error: pawnsError } = await supabase
          .from("pawns")
          .select("*")
          .order("created_at", { ascending: false });

        if (pawnsError) throw pawnsError;

        // Fetch all customers
        const { data: customers, error: customersError } = await supabase
          .from("customers")
          .select("id, full_name")
          .eq("is_active", true);

        if (customersError) throw customersError;

        // Fetch today's payments for revenue
        const today = new Date().toISOString().split("T")[0];
        const { data: payments } = await supabase
          .from("payments")
          .select("amount")
          .gte("created_at", today);

        const todayRevenue = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

        // Calculate stats
        const activePawns = pawns?.filter(p => p.status === "active" || p.status === "extended").length || 0;
        const goldPawns = pawns?.filter(p => p.collateral_type === "gold" && (p.status === "active" || p.status === "extended")) || [];
        const goldValue = goldPawns.reduce((sum, p) => sum + (p.market_value || 0), 0);
        const vehiclePawns = pawns?.filter(p => p.collateral_type === "vehicle" && (p.status === "active" || p.status === "extended")) || [];
        const vehicleCount = vehiclePawns.length;
        const pendingPawns = pawns?.filter(p => p.status === "pending").length || 0;

        // Get recent pawns (last 5)
        const recentPawns = (pawns?.slice(0, 5) || []).map(pawn => {
          const customer = customers?.find(c => c.id === pawn.customer_id);
          return { ...pawn, customer_name: customer?.full_name || "Unknown" };
        });

        // Get expiring pawns (within 7 days)
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
        
        const expiringPawns = (pawns?.filter(pawn => {
          if (pawn.status !== "active" && pawn.status !== "extended") return false;
          const maturityDate = new Date(pawn.maturity_date);
          return maturityDate <= sevenDaysFromNow;
        }) || []).map(pawn => {
          const customer = customers?.find(c => c.id === pawn.customer_id);
          return { ...pawn, customer_name: customer?.full_name || "Unknown" };
        });

        setStats({
          activePawns,
          goldValue,
          vehicleCount,
          totalCustomers: customers?.length || 0,
          pendingPawns,
          todayRevenue,
          expiringPawns,
          recentPawns,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount}`;
  };

  const getDaysUntilMaturity = (maturityDate: string) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const diffTime = maturity.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        </div>
      </AdminLayout>
    );
  }

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
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Pawns</p>
                  <p className="text-2xl font-bold mt-1">{stats?.activePawns || 0}</p>
                </div>
                <div className="bg-amber-500 p-3 rounded-lg">
                  <Coins className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Gold Value</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(stats?.goldValue || 0)}</p>
                </div>
                <div className="bg-yellow-500 p-3 rounded-lg">
                  <Gem className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Vehicles</p>
                  <p className="text-2xl font-bold mt-1">{stats?.vehicleCount || 0}</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-lg">
                  <Car className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Customers</p>
                  <p className="text-2xl font-bold mt-1">{stats?.totalCustomers || 0}</p>
                </div>
                <div className="bg-green-500 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
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
              {stats?.recentPawns && stats.recentPawns.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentPawns.map((pawn) => {
                    const Icon = typeIcons[pawn.collateral_type] || Coins;
                    return (
                      <div
                        key={pawn.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{pawn.customer_name}</p>
                            <p className="text-sm text-gray-500">{pawn.item_description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{pawn.loan_amount?.toLocaleString()}</p>
                          <Badge className={statusColors[pawn.status] || "bg-gray-100"}>
                            {pawn.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No pawns yet</p>
              )}
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
              {stats?.expiringPawns && stats.expiringPawns.length > 0 ? (
                <div className="space-y-4">
                  {stats.expiringPawns.slice(0, 5).map((pawn) => {
                    const daysLeft = getDaysUntilMaturity(pawn.maturity_date);
                    return (
                      <div
                        key={pawn.id}
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{pawn.ticket_number}</span>
                          <Badge
                            variant={daysLeft <= 3 ? "destructive" : "outline"}
                            className="text-xs"
                          >
                            {daysLeft} days left
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{pawn.customer_name}</p>
                        <p className="text-sm font-semibold mt-1">₹{pawn.loan_amount?.toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No expiring pawns</p>
              )}
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
                <span className="text-2xl font-bold">₹{(stats?.todayRevenue || 0).toLocaleString()}</span>
              </div>
              <Progress value={Math.min(((stats?.todayRevenue || 0) / 50000) * 100, 100)} className="mt-3" />
              <p className="text-xs text-gray-400 mt-2">{Math.min(Math.round(((stats?.todayRevenue || 0) / 50000) * 100), 100)}% of daily target</p>
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
                <span className="text-2xl font-bold">{stats?.pendingPawns || 0}</span>
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
                <span className="text-2xl font-bold">{stats?.totalCustomers || 0}</span>
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
                <span className="text-2xl font-bold">0%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">No defaults yet</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
