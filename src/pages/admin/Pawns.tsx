import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Coins,
  Gem,
  Car,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  QrCode,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import AdminLayout from "@/layouts/AdminLayout";

const mockPawns = [
  { id: "P-2024-001", customer: "John Doe", phone: "9876543210", type: "gold", item: "Gold Chain (24K, 15g)", amount: 45000, interest: 1800, status: "active", date: "2024-01-15", maturity: "2024-02-14" },
  { id: "P-2024-002", customer: "Sarah Smith", phone: "9876543211", type: "diamond", item: "Diamond Ring (1.5ct)", amount: 32000, interest: 1280, status: "active", date: "2024-01-16", maturity: "2024-02-15" },
  { id: "P-2024-003", customer: "Mike Johnson", phone: "9876543212", type: "vehicle", item: "Honda City (2020)", amount: 250000, interest: 10000, status: "pending", date: "2024-01-17", maturity: "2024-02-16" },
  { id: "P-2024-004", customer: "Emily Brown", phone: "9876543213", type: "gold", item: "Gold Bangles (22K, 25g)", amount: 28000, interest: 1120, status: "active", date: "2024-01-14", maturity: "2024-02-13" },
  { id: "P-2024-005", customer: "David Wilson", phone: "9876543214", type: "gold", item: "Gold Ring (24K, 8g)", amount: 18000, interest: 720, status: "redeemed", date: "2024-01-10", maturity: "2024-02-09" },
  { id: "P-2024-006", customer: "Lisa Anderson", phone: "9876543215", type: "vehicle", item: "Maruti Swift (2022)", amount: 180000, interest: 7200, status: "expired", date: "2023-12-15", maturity: "2024-01-14" },
];

const typeIcons = {
  gold: Gem,
  diamond: Gem,
  vehicle: Car,
};

const typeColors = {
  gold: "bg-yellow-100 text-yellow-700",
  diamond: "bg-purple-100 text-purple-700",
  vehicle: "bg-blue-100 text-blue-700",
};

const statusColors = {
  active: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  expired: "bg-red-100 text-red-700",
  redeemed: "bg-gray-100 text-gray-700",
};

export default function PawnsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredPawns = mockPawns.filter((pawn) => {
    const matchesSearch = pawn.customer.toLowerCase().includes(search.toLowerCase()) ||
      pawn.id.toLowerCase().includes(search.toLowerCase()) ||
      pawn.phone.includes(search);
    const matchesStatus = statusFilter === "all" || pawn.status === statusFilter;
    const matchesType = typeFilter === "all" || pawn.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

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
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
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
                {filteredPawns.map((pawn) => {
                  const TypeIcon = typeIcons[pawn.type as keyof typeof typeIcons];
                  return (
                    <TableRow key={pawn.id}>
                      <TableCell className="font-medium">{pawn.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{pawn.customer}</p>
                          <p className="text-sm text-gray-500">{pawn.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={typeColors[pawn.type as keyof typeof typeColors]}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {pawn.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{pawn.item}</TableCell>
                      <TableCell className="text-right font-medium">₹{pawn.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-gray-500">₹{pawn.interest}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[pawn.status as keyof typeof statusColors]}>
                          {pawn.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          {pawn.maturity}
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
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination Info */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredPawns.length} of {mockPawns.length} pawns
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
