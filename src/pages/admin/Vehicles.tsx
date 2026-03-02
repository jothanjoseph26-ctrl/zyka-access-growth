import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Plus, Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const vehicleStatusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pledged: "bg-amber-100 text-amber-700",
  redeemed: "bg-gray-100 text-gray-700",
};

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchVehicles() {
      const { data } = await supabase
        .from("pawns")
        .select("*")
        .eq("collateral_type", "vehicle")
        .order("created_at", { ascending: false });
      if (data) setVehicles(data);
    }
    fetchVehicles();
  }, []);

  const filtered = vehicles.filter(v => 
    v.item_description?.toLowerCase().includes(search.toLowerCase()) ||
    v.vehicle_registration?.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = vehicles.reduce((sum, v) => sum + (v.market_value || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vehicles</h1>
            <p className="text-muted-foreground">Manage vehicle pawns</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/admin/pawns/new?type=vehicle">
              <Plus className="mr-2 h-4 w-4" />
              New Vehicle Pawn
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Vehicles</p>
                  <p className="text-2xl font-bold">{vehicles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">₦</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">₦{totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-amber-600 font-bold">₦</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Loans</p>
                  <p className="text-2xl font-bold">{vehicles.filter(v => v.status === "active").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vehicles..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Loan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Maturity</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length > 0 ? filtered.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.ticket_number}</TableCell>
                    <TableCell>{v.item_description}</TableCell>
                    <TableCell>{v.vehicle_registration || "-"}</TableCell>
                    <TableCell className="text-right">₦{v.market_value?.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₦{v.loan_amount?.toLocaleString()}</TableCell>
                    <TableCell><Badge className={vehicleStatusColors[v.status]}>{v.status}</Badge></TableCell>
                    <TableCell>{v.maturity_date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No vehicles found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
