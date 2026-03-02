import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import Logo from "@/assets/logo.png";

const goldRates = {
  "24K": 6200,
  "22K": 5680,
  "18K": 4650,
  "16K": 4100,
};

const purityPercent = {
  "24K": 100,
  "22K": 91.6,
  "18K": 75,
  "16K": 66.6,
};

export default function CalculatorPage() {
  const [goldType, setGoldType] = useState("24K");
  const [weight, setWeight] = useState("");
  const [ltv, setLtv] = useState(75);

  const marketValue = weight ? Math.round(parseFloat(weight) * goldRates[goldType as keyof typeof goldRates]) : 0;
  const loanAmount = Math.round(marketValue * (ltv / 100));
  const interestRate = 3;
  const interestAmount = Math.round(loanAmount * (interestRate / 100) * 30);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Zyka Credit" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gold Valuation Calculator</h1>
          <p className="text-gray-500">Estimate your loan amount based on gold</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Enter Gold Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Gold Type */}
            <div className="space-y-3">
              <Label>Gold Purity</Label>
              <RadioGroup
                value={goldType}
                onValueChange={setGoldType}
                className="flex gap-4"
              >
                {Object.keys(goldRates).map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="cursor-pointer">
                      {type} (₹{goldRates[type as keyof typeof goldRates].toLocaleString()}/10g)
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (grams)</Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                placeholder="Enter weight in grams"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* LTV Slider */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Loan-to-Value (LTV)</Label>
                <span className="font-medium">{ltv}%</span>
              </div>
              <Slider
                value={[ltv]}
                onValueChange={([value]) => setLtv(value)}
                max={90}
                min={50}
                step={5}
              />
              <p className="text-xs text-gray-500">Higher LTV = More loan but higher interest</p>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-amber-600" />
              Estimated Value
            </CardTitle>
            <CardDescription>Based on current gold rate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Gold Rate ({goldType})</span>
              <span className="font-medium">₹{goldRates[goldType as keyof typeof goldRates].toLocaleString()}/10g</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Weight</span>
              <span className="font-medium">{weight || "0"}g</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Market Value</span>
              <span className="font-semibold text-lg">₹{marketValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Loan Amount ({ltv}%)</span>
              <span className="font-bold text-2xl text-amber-600">₹{loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Interest (30 days @ 3%)</span>
              <span className="font-medium text-orange-600">₹{interestAmount.toLocaleString()}</span>
            </div>

            <Button className="w-full bg-amber-600 hover:bg-amber-700 mt-4">
              Apply for This Loan
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
