import { FileText, Upload, Search, Download, Eye, Trash2, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const docs = [
  { id: 1, name: "ID_JohnDoe.jpg", type: "ID Proof", customer: "John Doe", pawn: "P-2024-001", date: "2024-01-15", status: "verified" },
  { id: 2, name: "RC_SarahSmith.pdf", type: "Vehicle RC", customer: "Sarah Smith", pawn: "P-2024-002", date: "2024-01-16", status: "pending" },
  { id: 3, name: "Gold_Cert.pdf", type: "Valuation", customer: "Mike Johnson", pawn: "P-2024-003", date: "2024-01-17", status: "verified" },
];

const typeColors: Record<string, string> = {
  verified: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
};

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="section-padding py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground">Manage uploaded documents</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{docs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-9" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Pawn</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.customer}</TableCell>
                    <TableCell>{doc.pawn}</TableCell>
                    <TableCell><Badge className={typeColors[doc.status]}>{doc.status}</Badge></TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem>
                          <DropdownMenuItem><Download className="mr-2 h-4 w-4" />Download</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
