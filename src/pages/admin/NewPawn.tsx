import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Gem,
  Car,
  Calculator,
  Save,
  ArrowLeft,
  Camera,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminLayout from "@/layouts/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const goldPurityOptions = ["24K", "22K", "18K", "16K"];

export default function NewPawnPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pawnType, setPawnType] = useState<"gold" | "diamond" | "vehicle" | "other">("gold");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    itemDescription: "",
    weight: "",
    purity: "",
    marketValue: "",
    loanAmount: "",
    interestRate: "3",
    tenure: "30",
    vehicleRegistration: "",
    vehicleChassis: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateInterest = () => {
    const principal = parseFloat(formData.loanAmount) || 0;
    const rate = parseFloat(formData.interestRate) || 0;
    const tenure = parseFloat(formData.tenure) || 0;
    return Math.round((principal * rate * tenure) / 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Create or find customer
      const { data: existingCustomers } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", formData.phone)
        .limit(1);

      let customerId: string;

      if (existingCustomers && existingCustomers.length > 0) {
        customerId = existingCustomers[0].id;
      } else {
        const { data: newCustomer, error: custError } = await supabase
          .from("customers")
          .insert({
            full_name: formData.customerName,
            phone: formData.phone,
            email: formData.email || null,
            address: formData.address || null,
          })
          .select("id")
          .single();

        if (custError) throw custError;
        customerId = newCustomer.id;
      }

      // 2. Calculate maturity date
      const pawnDate = new Date();
      const maturityDate = new Date();
      maturityDate.setDate(maturityDate.getDate() + parseInt(formData.tenure));

      // 3. Create pawn
      const { error: pawnError } = await supabase.from("pawns").insert({
        customer_id: customerId,
        collateral_type: pawnType,
        item_description: formData.itemDescription || `${pawnType} item`,
        weight_grams: formData.weight ? parseFloat(formData.weight) : null,
        purity: formData.purity || null,
        market_value: parseFloat(formData.marketValue),
        loan_amount: parseFloat(formData.loanAmount),
        interest_rate: parseFloat(formData.interestRate),
        tenure_days: parseInt(formData.tenure),
        pawn_date: pawnDate.toISOString().split("T")[0],
        maturity_date: maturityDate.toISOString().split("T")[0],
        status: "active",
        ticket_number: `P-${Date.now()}`, // Will be overwritten by trigger if exists
        vehicle_registration: formData.vehicleRegistration || null,
        vehicle_chassis: formData.vehicleChassis || null,
        notes: formData.notes || null,
      });

      if (pawnError) throw pawnError;

      toast({ title: "Pawn Created!", description: "New pawn ticket has been created successfully." });
      navigate("/admin/pawns");
    } catch (error: any) {
      console.error("Error creating pawn:", error);
      toast({
        title: "Failed to create pawn",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pawns")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">New Pawn</h1>
            <p className="text-muted-foreground">Create a new pawn ticket</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pawn Type Selection */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Collateral Type</CardTitle>
              <CardDescription>Select the type of collateral being pawned</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={pawnType}
                onValueChange={(v) => setPawnType(v as typeof pawnType)}
                className="flex flex-wrap gap-4"
              >
                {[
                  { value: "gold", label: "Gold", icon: Gem, color: "bg-amber-100 text-amber-600" },
                  { value: "diamond", label: "Diamond", icon: Gem, color: "bg-purple-100 text-purple-600" },
                  { value: "vehicle", label: "Vehicle", icon: Car, color: "bg-blue-100 text-blue-600" },
                ].map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label htmlFor={item.value} className="flex items-center gap-2 cursor-pointer">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      {item.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card className="border-border/50">
            <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input placeholder="Enter customer name" value={formData.customerName} onChange={(e) => handleInputChange("customerName", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number *</Label>
                  <Input placeholder="08012345678" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Email (Optional)</Label>
                  <Input type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="Full address" value={formData.address} onChange={(e) => handleInputChange("address", e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card className="border-border/50">
            <CardHeader><CardTitle>{pawnType === "vehicle" ? "Vehicle Details" : "Item Details"}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {pawnType === "gold" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Weight (grams) *</Label>
                    <Input type="number" step="0.01" placeholder="e.g., 15.5" value={formData.weight} onChange={(e) => handleInputChange("weight", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Purity *</Label>
                    <Select value={formData.purity} onValueChange={(v) => handleInputChange("purity", v)}>
                      <SelectTrigger><SelectValue placeholder="Select purity" /></SelectTrigger>
                      <SelectContent>
                        {goldPurityOptions.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="e.g., Gold Chain" value={formData.itemDescription} onChange={(e) => handleInputChange("itemDescription", e.target.value)} />
                  </div>
                </div>
              )}

              {pawnType === "diamond" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Item Description *</Label>
                    <Input placeholder="e.g., Diamond Ring" value={formData.itemDescription} onChange={(e) => handleInputChange("itemDescription", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Carat Weight</Label>
                    <Input placeholder="e.g., 1.5" value={formData.weight} onChange={(e) => handleInputChange("weight", e.target.value)} />
                  </div>
                </div>
              )}

              {pawnType === "vehicle" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Make & Model *</Label>
                    <Input placeholder="e.g., Toyota Camry 2020" value={formData.itemDescription} onChange={(e) => handleInputChange("itemDescription", e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number</Label>
                    <Input placeholder="e.g., ABC 1234" value={formData.vehicleRegistration} onChange={(e) => handleInputChange("vehicleRegistration", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Chassis Number</Label>
                    <Input placeholder="Chassis number" value={formData.vehicleChassis} onChange={(e) => handleInputChange("vehicleChassis", e.target.value)} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label>Market Value (₦) *</Label>
                  <Input type="number" placeholder="Estimated market value" value={formData.marketValue} onChange={(e) => handleInputChange("marketValue", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Loan-to-Value (LTV)</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <span className="text-2xl font-bold text-primary">
                      ₦{formData.marketValue ? Math.round(parseFloat(formData.marketValue) * 0.75).toLocaleString() : "0"}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1"> (75%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Terms */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Loan Amount (₦) *</Label>
                  <Input type="number" placeholder="Loan amount" value={formData.loanAmount} onChange={(e) => handleInputChange("loanAmount", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Input type="number" step="0.1" value={formData.interestRate} onChange={(e) => handleInputChange("interestRate", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Tenure (days)</Label>
                  <Select value={formData.tenure} onValueChange={(v) => handleInputChange("tenure", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-primary">Interest Amount</p>
                    <p className="text-2xl font-bold text-foreground">₦{calculateInterest().toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary">Total Repayment</p>
                    <p className="text-2xl font-bold text-foreground">
                      ₦{(parseFloat(formData.loanAmount || "0") + calculateInterest()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notes (Optional)</Label>
                <Textarea placeholder="Any additional notes..." rows={3} value={formData.notes} onChange={(e) => handleInputChange("notes", e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" type="button" onClick={() => navigate("/admin/pawns")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {isSubmitting ? "Creating..." : "Create Pawn Ticket"}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
