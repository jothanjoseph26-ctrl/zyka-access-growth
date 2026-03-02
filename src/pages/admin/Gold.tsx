import { useState } from "react";
import { Link } from "react-router-dom";
import { Gem, Plus, Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const goldStatusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  pledged: "bg-amber-100 text-amber-700",
  redeemed: "bg-gray-100 text-gray-700",
};

export default function GoldPage() {
  const [search, setSearch] = useState("");
  const [pawns, setPawns] = useState<any[]>([]);

  useEffect(() => {
    async function fetchGoldPawns() {
      const { data } = await supabase
        .from("pawns")
        .select("*")
        .eq("collateral_type", "gold")
        .order("created_at", { ascending: false });
      if (data) setPawns(data);
    }
    fetchGoldPawns();
  }, []);

  const filteredGold = pawns.filter(p => 
    p.item_description?.toLowerCase().includes(search.toLowerCase()) ||
    p.ticket_number?.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = pawns.reduce((sum, p) => sum + (p.market_value || 0), 0);
  const totalLoan = pawns.filter(p => p.status === "active").reduce((sum, p) => sum + (p.loan_amount || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gold Pawns</h1>
            <p className="text-muted-foreground">Manage all gold collateral pawns</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/admin/pawns/new?type=gold">
              <Plus className="mr-2 h-4 w-4" />
              New Gold Pawn
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Gem className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold">{pawns.length}</p>
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
                  <p className="text-sm text-muted-foreground">Total Market Value</p>
                  <p className="text-2xl font-bold">₦{totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">₦</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Loan Disbursed</p>
                  <p className="text-2xl font-bold">₦{totalLoan.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by item, ticket number..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Purity</TableHead>
                  <TableHead className="text-right">Market Value</TableHead>
                  <TableHead className="text-right">Loan Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Maturity</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGold.length > 0 ? filteredGold.map((pawn) => (
                  <TableRow key={pawn.id}>
                    <TableCell className="font-medium">{pawn.ticket_number}</TableCell>
                    <TableCell>{pawn.item_description}</TableCell>
                    <TableCell>{pawn.weight_grams}g</TableCell>
                    <TableCell>{pawn.purity}</TableCell>
                    <TableCell className="text-right">₦{pawn.market_value?.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₦{pawn.loan_amount?.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={goldStatusColors[pawn.status] || "bg-gray-100"}>
                        {pawn.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{pawn.maturity_date}</TableCell>
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
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                          <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No gold pawns found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
