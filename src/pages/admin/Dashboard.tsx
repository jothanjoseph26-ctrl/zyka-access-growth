import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Coins,
  Gem,
  Car,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar,
  DollarSign,
  Loader2,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import AdminLayout from "@/layouts/AdminLayout";

interface DashboardData {
  activePawns: number;
  goldValue: number;
  vehicleCount: number;
  totalCustomers: number;
  pendingPawns: number;
  todayRevenue: number;
  recentPawns: (Tables<"pawns"> & { customer_name: string })[];
  expiringPawns: (Tables<"pawns"> & { customer_name: string })[];
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  extended: "bg-blue-100 text-blue-700",
};

const typeIcons: Record<string, typeof Coins> = {
  gold: Gem,
  diamond: Gem,
  vehicle: Car,
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const today = new Date().toISOString().split("T")[0];
        const sevenDays = new Date();
        sevenDays.setDate(sevenDays.getDate() + 7);

        const [pawnsRes, customersRes, paymentsRes] = await Promise.all([
          supabase.from("pawns").select("*"),
          supabase.from("customers").select("id, full_name").eq("is_active", true),
          supabase.from("payments").select("amount, created_at").gte("created_at", today),
        ]);

        const pawns = pawnsRes.data || [];
        const customers = customersRes.data || [];
        const payments = paymentsRes.data || [];

        const activePawns = pawns.filter(p => p.status === "active" || p.status === "extended");
        const goldPawns = activePawns.filter(p => p.collateral_type === "gold");
        const vehiclePawns = activePawns.filter(p => p.collateral_type === "vehicle");
        
        const recentPawns = pawns.slice(0, 5).map(p => {
          const cust = customers.find(c => c.id === p.customer_id);
          return { ...p, customer_name: cust?.full_name || "Unknown" };
        });

        const expiringPawns = activePawns.filter(p => new Date(p.maturity_date) <= sevenDays).map(p => {
          const cust = customers.find(c => c.id === p.customer_id);
          return { ...p, customer_name: cust?.full_name || "Unknown" };
        });

        setData({
          activePawns: activePawns.length,
          goldValue: goldPawns.reduce((sum, p) => sum + (p.market_value || 0), 0),
          vehicleCount: vehiclePawns.length,
          totalCustomers: customers.length,
          pendingPawns: pawns.filter(p => p.status === "pending").length,
          todayRevenue: payments.reduce((sum, p) => sum + (p.amount || 0), 0),
          recentPawns,
          expiringPawns,
        });
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `₦${(amount / 1000).toFixed(1)}K`;
    return `₦${amount}`;
  };

  const getDaysLeft = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="section-padding py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your pawn shop overview.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-border">
              <Calendar className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/admin/pawns/new">
                <Plus className="mr-2 h-4 w-4" />
                New Pawn
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Active Pawns</p>
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Coins className="h-4 w-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{data?.activePawns || 0}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Gold Holdings</p>
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Gem className="h-4 w-4 text-amber-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(data?.goldValue || 0)}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Vehicles</p>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{data?.vehicleCount || 0}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{data?.totalCustomers || 0}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle>Recent Pawns</CardTitle>
              <CardDescription>Latest pawn transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.recentPawns && data.recentPawns.length > 0 ? (
                <div className="space-y-3">
                  {data.recentPawns.map((pawn) => {
                    const Icon = typeIcons[pawn.collateral_type] || Coins;
                    return (
                      <div key={pawn.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{pawn.customer_name}</p>
                            <p className="text-sm text-muted-foreground">{pawn.item_description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₦{pawn.loan_amount?.toLocaleString()}</p>
                          <Badge className={statusColors[pawn.status] || "bg-gray-100"}>
                            {pawn.status}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No pawns yet</p>
              )}
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link to="/admin/pawns">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Expiring Soon
              </CardTitle>
              <CardDescription>Pawns expiring within 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              {data?.expiringPawns && data.expiringPawns.length > 0 ? (
                <div className="space-y-3">
                  {data.expiringPawns.slice(0, 5).map((pawn) => {
                    const daysLeft = getDaysLeft(pawn.maturity_date);
                    return (
                      <div key={pawn.id} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{pawn.ticket_number}</span>
                          <Badge variant={daysLeft <= 3 ? "destructive" : "outline"} className="text-xs">
                            {daysLeft} days
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{pawn.customer_name}</p>
                        <p className="text-sm font-semibold mt-1">₦{pawn.loan_amount?.toLocaleString()}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No expiring pawns</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">₦{(data?.todayRevenue || 0).toLocaleString()}</p>
              <Progress value={Math.min(((data?.todayRevenue || 0) / 50000) * 100, 100)} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                {Math.min(Math.round(((data?.todayRevenue || 0) / 50000) * 100), 100)}% of daily target
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{data?.pendingPawns || 0}</p>
              <Button variant="link" size="sm" className="px-0 mt-1 text-primary" asChild>
                <Link to="/admin/pawns?status=pending">Review Now →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{data?.totalCustomers || 0}</p>
              <Button variant="link" size="sm" className="px-0 mt-1 text-primary" asChild>
                <Link to="/admin/customers">View All →</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-muted-foreground">Default Rate</p>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">0%</p>
              <p className="text-xs text-muted-foreground mt-2">No defaults yet</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
