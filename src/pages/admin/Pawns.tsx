import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Gem,
  Car,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Trash2,
  QrCode,
  Calendar,
  DollarSign,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import type { Pawn, Customer } from "@/integrations/supabase/types";
import AdminLayout from "@/layouts/AdminLayout";

interface PawnWithCustomer extends Pawn {
  customer_name: string;
  customer_phone: string;
}

const typeIcons: Record<string, typeof Gem> = {
  gold: Gem,
  diamond: Gem,
  vehicle: Car,
};

const typeColors: Record<string, string> = {
  gold: "bg-yellow-100 text-yellow-700",
  diamond: "bg-purple-100 text-purple-700",
  vehicle: "bg-blue-100 text-blue-700",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  expired: "bg-red-100 text-red-700",
  redeemed: "bg-gray-100 text-gray-700",
  extended: "bg-blue-100 text-blue-700",
  forfeited: "bg-red-100 text-red-700",
};

export default function PawnsPage() {
  const [pawns, setPawns] = useState<PawnWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    async function fetchPawns() {
      try {
        const { data: pawnsData, error } = await supabase
          .from("pawns")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Fetch all customers
        const { data: customers } = await supabase
          .from("customers")
          .select("id, full_name, phone");

        // Map customer data to pawns
        const pawnsWithCustomer = (pawnsData || []).map(pawn => {
          const customer = customers?.find(c => c.id === pawn.customer_id);
          return {
            ...pawn,
            customer_name: customer?.full_name || "Unknown",
            customer_phone: customer?.phone || "",
          };
        });

        setPawns(pawnsWithCustomer);
      } catch (error) {
        console.error("Error fetching pawns:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPawns();
  }, []);

  const filteredPawns = pawns.filter((pawn) => {
    const matchesSearch = 
      pawn.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      pawn.ticket_number?.toLowerCase().includes(search.toLowerCase()) ||
      pawn.customer_phone.includes(search) ||
      pawn.item_description?.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || pawn.status === statusFilter;
    const matchesType = typeFilter === "all" || pawn.collateral_type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const calculateInterest = (pawn: Pawn) => {
    return Math.round((pawn.loan_amount * pawn.interest_rate * pawn.tenure_days) / 100);
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
            <h1 className="text-2xl font-bold text-gray-900">Pawn Management</h1>
            <p className="text-gray-500">Manage all pawn tickets and collateral</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              Scan Ticket
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/admin/pawns/new">
                <Plus className="mr-2 h-4 w-4" />
                New Pawn
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, ticket #, phone..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="extended">Extended</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="redeemed">Redeemed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pawns Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Interest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Maturity</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPawns.length > 0 ? (
                  filteredPawns.map((pawn) => {
                    const TypeIcon = typeIcons[pawn.collateral_type] || Gem;
                    return (
                      <TableRow key={pawn.id}>
                        <TableCell className="font-medium">{pawn.ticket_number}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{pawn.customer_name}</p>
                            <p className="text-sm text-gray-500">{pawn.customer_phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={typeColors[pawn.collateral_type]}>
                            <TypeIcon className="h-3 w-3 mr-1" />
                            {pawn.collateral_type}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{pawn.item_description}</TableCell>
                        <TableCell className="text-right font-medium">₹{pawn.loan_amount?.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-gray-500">₹{calculateInterest(pawn).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[pawn.status] || "bg-gray-100"}>
                            {pawn.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {pawn.maturity_date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <DollarSign className="mr-2 h-4 w-4" />
                                Record Payment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Extend
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No pawns found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredPawns.length} of {pawns.length} pawns
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
