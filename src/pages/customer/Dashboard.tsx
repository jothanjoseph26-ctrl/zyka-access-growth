import { Link } from "react-router-dom";
import {
  Coins,
  Gem,
  Car,
  Home,
  Calendar,
  DollarSign,
  Clock,
  AlertTriangle,
  ChevronRight,
  Bell,
  User,
  Calculator,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Logo from "@/assets/logo.png";

const customerPawns = [
  { id: "P-2024-001", type: "gold", item: "Gold Chain (24K, 15g)", amount: 45000, interestDue: 1800, maturityDate: "2024-02-14", status: "active", daysLeft: 15 },
  { id: "P-2024-004", type: "gold", item: "Gold Bangles (22K, 25g)", amount: 28000, interestDue: 1120, maturityDate: "2024-02-13", status: "active", daysLeft: 14 },
];

const notifications = [
  { id: 1, type: "reminder", message: "Interest payment due in 5 days for P-2024-001", date: "Today" },
  { id: 2, type: "info", message: "Your pawn P-2024-002 has been redeemed successfully", date: "Jan 10" },
];

const typeIcons = { gold: Gem, diamond: Gem, vehicle: Car };
const typeColors = { gold: "bg-yellow-100 text-yellow-700", diamond: "bg-purple-100 text-purple-700", vehicle: "bg-blue-100 text-blue-700" };

export default function CustomerDashboard() {
  const totalActive = customerPawns.length;
  const totalValue = customerPawns.reduce((sum, p) => sum + p.amount, 0);
  const totalInterest = customerPawns.reduce((sum, p) => sum + p.interestDue, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Zyka Credit" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
            <p className="text-gray-500">Manage your pawns and payments</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Coins className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalActive}</p>
              <p className="text-sm text-gray-500">Active Pawns</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">₦{totalValue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Value</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">₦{totalInterest.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Interest Due</p>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Alert */}
        {customerPawns.some(p => p.daysLeft <= 7) && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800">Maturity Approaching</p>
                  <p className="text-sm text-orange-700">You have pawns expiring within 7 days. Consider extending or redeeming.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* My Pawns */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Pawns</CardTitle>
              <CardDescription>Your active pawn tickets</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerPawns.map((pawn) => {
              const TypeIcon = typeIcons[pawn.type as keyof typeof typeIcons];
              return (
                <div key={pawn.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${typeColors[pawn.type as keyof typeof typeColors]}`}>
                        <TypeIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{pawn.item}</p>
                        <p className="text-sm text-gray-500">{pawn.id}</p>
                      </div>
                    </div>
                    <Badge className={pawn.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                      {pawn.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Loan Amount</p>
                      <p className="font-semibold">₦{pawn.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Interest Due</p>
                      <p className="font-semibold text-orange-600">₦{pawn.interestDue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Maturity Date</p>
                      <p className="font-medium">{pawn.maturityDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Days Left</p>
                      <p className={`font-medium ${pawn.daysLeft <= 7 ? "text-red-600" : ""}`}>{pawn.daysLeft} days</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      Pay Interest
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Extend
                    </Button>
                    <Button variant="outline">
                      Redeem
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bell className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm">{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-primary hover:bg-primary/90">
            <Calculator className="h-6 w-6" />
            <span>Valuation Calculator</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
            <Phone className="h-6 w-6" />
            <span>Contact Support</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
