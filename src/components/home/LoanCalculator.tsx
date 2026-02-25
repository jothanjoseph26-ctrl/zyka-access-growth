import { useState, useMemo } from "react";
import { 
  Calculator, 
  ArrowRight, 
  Car, 
  Gem, 
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface Valuable {
  id: string;
  name: string;
  icon: React.ElementType;
  value: number;
  ltvRatio: number; // Loan to Value ratio
  description: string;
}

const valuableTypes: Omit<Valuable, 'value'>[] = [
  { id: 'jewelry', name: 'Gold & Jewelry', icon: Gem, ltvRatio: 0.7, description: 'Gold, diamonds, precious items' },
  { id: 'vehicle', name: 'Vehicle', icon: Car, ltvRatio: 0.55, description: 'Cars, motorcycles, trucks' },
];

const LoanCalculator = () => {
  const [valuables, setValuables] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const updateValuable = (id: string, value: string) => {
    const numValue = parseInt(value.replace(/,/g, '')) || 0;
    setValuables(prev => ({ ...prev, [id]: numValue }));
    setShowResults(false);
  };

  const calculations = useMemo(() => {
    let totalCollateralValue = 0;
    let totalLoanEligible = 0;
    const breakdown: { name: string; value: number; eligible: number; icon: React.ElementType }[] = [];

    valuableTypes.forEach(type => {
      const value = valuables[type.id] || 0;
      if (value > 0) {
        const eligible = Math.round(value * type.ltvRatio);
        totalCollateralValue += value;
        totalLoanEligible += eligible;
        breakdown.push({
          name: type.name,
          value,
          eligible,
          icon: type.icon
        });
      }
    });

    // Apply maximum loan cap and minimum threshold
    const maxLoan = Math.min(totalLoanEligible, 10000000); // Cap at 10M
    const minLoan = totalLoanEligible >= 20000 ? totalLoanEligible : 0; // Minimum 20k collateral value

    return {
      totalCollateralValue,
      totalLoanEligible: minLoan > 0 ? maxLoan : 0,
      breakdown,
      averageLTV: totalCollateralValue > 0 
        ? Math.round((totalLoanEligible / totalCollateralValue) * 100) 
        : 0
    };
  }, [valuables]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatInputValue = (value: number) => {
    if (value === 0) return '';
    return value.toLocaleString('en-NG');
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const hasValues = Object.values(valuables).some(v => v > 0);

  return (
    <section className="section-padding bg-card" id="calculator">
      <div className="container-tight">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Loan Eligibility Calculator
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            How Much Can You <span className="text-gradient-gold">Qualify For?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enter the estimated value of your assets to discover your loan eligibility. 
            Your valuables serve as collateral for quick and secure lending.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Valuable Inputs - Takes 3 columns */}
          <div className="lg:col-span-3 p-8 rounded-2xl bg-gradient-card border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Your Valuables</h3>
                <p className="text-sm text-muted-foreground">Enter estimated market values in Naira</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {valuableTypes.map((type) => (
                <div 
                  key={type.id}
                  className="group p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <type.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{type.name}</p>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₦</span>
                    <Input
                      type="text"
                      placeholder="0"
                      value={formatInputValue(valuables[type.id] || 0)}
                      onChange={(e) => updateValuable(type.id, e.target.value)}
                      className="pl-8 bg-background/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <p className="text-xs text-primary mt-2">
                    Up to {Math.round(type.ltvRatio * 100)}% loan value
                  </p>
                </div>
              ))}
            </div>

            <Button 
              variant="cta" 
              size="lg" 
              className="w-full"
              onClick={handleCalculate}
              disabled={!hasValues}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Calculate My Eligibility
            </Button>
          </div>

          {/* Results - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Result Card */}
            <div className={`p-8 rounded-2xl transition-all duration-500 ${
              showResults && calculations.totalLoanEligible > 0
                ? 'bg-gradient-primary shadow-glow'
                : 'bg-gradient-card border border-border/50'
            }`}>
              <div className="text-center">
                <p className={`text-sm mb-2 ${
                  showResults && calculations.totalLoanEligible > 0 
                    ? 'text-primary-foreground/80' 
                    : 'text-muted-foreground'
                }`}>
                  {showResults ? 'You Qualify For Up To' : 'Your Loan Eligibility'}
                </p>
                <p className={`text-4xl md:text-5xl font-bold mb-4 ${
                  showResults && calculations.totalLoanEligible > 0
                    ? 'text-primary-foreground'
                    : 'text-foreground'
                }`}>
                  {showResults 
                    ? formatCurrency(calculations.totalLoanEligible)
                    : '₦ ---'
                  }
                </p>
                {showResults && calculations.totalLoanEligible > 0 && (
                  <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Based on your collateral value</span>
                  </div>
                )}
                {showResults && calculations.totalLoanEligible === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Minimum collateral value of ₦20,000 required
                  </p>
                )}
              </div>
            </div>

            {/* Collateral Summary */}
            <div className="p-6 rounded-xl bg-gradient-card border border-border/50">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">Total Collateral Value</p>
                <p className="text-xl font-bold text-foreground">
                  {showResults 
                    ? formatCurrency(calculations.totalCollateralValue)
                    : '₦ ---'
                  }
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Average Loan-to-Value</p>
                <p className="text-lg font-semibold text-accent">
                  {showResults ? `${calculations.averageLTV}%` : '---%'}
                </p>
              </div>
            </div>

            {/* Breakdown */}
            {showResults && calculations.breakdown.length > 0 && (
              <div className="p-6 rounded-xl bg-gradient-card border border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-4">Eligibility Breakdown</h4>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {calculations.breakdown.map((item) => (
                    <div key={item.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {formatCurrency(item.eligible)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {showResults && calculations.totalLoanEligible > 0 && (
              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to="/apply">
                  Apply for {formatCurrency(calculations.totalLoanEligible)}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            )}

            <p className="text-xs text-muted-foreground text-center">
              *This is an estimate. Final loan amount depends on asset verification and credit assessment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;
