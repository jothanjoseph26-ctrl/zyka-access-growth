import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Coins,
  Gem,
  Car,
  Upload,
  Calculator,
  Save,
  ArrowLeft,
  Camera,
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

const goldPurityOptions = ["24K", "22K", "18K", "16K"];
const vehicleTypes = ["Car", "Bike", "Truck", "Other"];

export default function NewPawnPage() {
  const navigate = useNavigate();
  const [pawnType, setPawnType] = useState("gold");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating pawn:", { ...formData, type: pawnType });
    navigate("/admin/pawns");
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/pawns")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Pawn</h1>
            <p className="text-gray-500">Create a new pawn ticket</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pawn Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Collateral Type</CardTitle>
              <CardDescription>Select the type of collateral being pawned</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={pawnType}
                onValueChange={setPawnType}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gold" id="gold" />
                  <Label htmlFor="gold" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Gem className="h-4 w-4 text-yellow-600" />
                    </div>
                    Gold
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="diamond" id="diamond" />
                  <Label htmlFor="diamond" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Gem className="h-4 w-4 text-purple-600" />
                    </div>
                    Diamond
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vehicle" id="vehicle" />
                  <Label htmlFor="vehicle" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Car className="h-4 w-4 text-blue-600" />
                    </div>
                    Vehicle
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter customer name"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card>
            <CardHeader>
              <CardTitle>
                {pawnType === "vehicle" ? "Vehicle Details" : "Item Details"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pawnType === "gold" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (grams) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 15.5"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purity">Purity *</Label>
                    <Select
                      value={formData.purity}
                      onValueChange={(value) => handleInputChange("purity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select purity" />
                      </SelectTrigger>
                      <SelectContent>
                        {goldPurityOptions.map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemDescription">Description</Label>
                    <Input
                      id="itemDescription"
                      placeholder="e.g., Gold Chain"
                      value={formData.itemDescription}
                      onChange={(e) => handleInputChange("itemDescription", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {pawnType === "diamond" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemDescription">Item Description *</Label>
                    <Input
                      id="itemDescription"
                      placeholder="e.g., Diamond Ring"
                      value={formData.itemDescription}
                      onChange={(e) => handleInputChange("itemDescription", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carat">Carat Weight</Label>
                    <Input
                      id="carat"
                      placeholder="e.g., 1.5"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {pawnType === "vehicle" && (
                <div className="grid grid-cols--cols-21 md:grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((t) => (
                          <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="itemDescription">Make & Model *</Label>
                    <Input
                      id="itemDescription"
                      placeholder="e.g., Honda City 2020"
                      value={formData.itemDescription}
                      onChange={(e) => handleInputChange("itemDescription", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration">Registration Number</Label>
                    <Input
                      id="registration"
                      placeholder="e.g., ABC 1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chassis">Chassis Number</Label>
                    <Input
                      id="chassis"
                      placeholder="Chassis number"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="marketValue">Market Value (₹) *</Label>
                  <Input
                    id="marketValue"
                    type="number"
                    placeholder="Estimated market value"
                    value={formData.marketValue}
                    onChange={(e) => handleInputChange("marketValue", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Loan-to-Value (LTV)</Label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl font-bold text-amber-600">
                      {formData.marketValue ? Math.round(parseFloat(formData.marketValue) * 0.75).toLocaleString() : "0"}
                    </span>
                    <span className="text-gray-500 text-sm ml-1"> (75%)</span>
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Item Photos</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loan Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Loan Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹) *</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    placeholder="Loan amount"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={formData.interestRate}
                    onChange={(e) => handleInputChange("interestRate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenure">Tenure (days)</Label>
                  <Select
                    value={formData.tenure}
                    onValueChange={(value) => handleInputChange("tenure", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interest Summary */}
              <div className="bg-amber-50 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-amber-700">Interest Amount</p>
                    <p className="text-2xl font-bold text-amber-900">₹{calculateInterest().toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-amber-700">Total Repayment</p>
                    <p className="text-2xl font-bold text-amber-900">
                      ₹{(parseFloat(formData.loanAmount || "0") + calculateInterest()).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" type="button" onClick={() => navigate("/admin/pawns")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
              <Save className="mr-2 h-4 w-4" />
              Create Pawn Ticket
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
