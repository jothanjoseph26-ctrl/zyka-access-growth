import { useState, useMemo } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [interestRate] = useState(15); // 15% per annum

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    };
  }, [loanAmount, loanTerm, interestRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="section-padding bg-card">
      <div className="container-tight">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            Loan Calculator
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Calculate Your <span className="text-gradient-gold">Loan Value</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use our calculator to estimate your monthly repayment and total amount receivable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator Inputs */}
          <div className="p-8 rounded-2xl bg-gradient-card border border-border/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Loan Details</h3>
            </div>

            {/* Loan Amount */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-foreground">Loan Amount</label>
                <span className="text-lg font-bold text-primary">{formatCurrency(loanAmount)}</span>
              </div>
              <Slider
                value={[loanAmount]}
                onValueChange={(value) => setLoanAmount(value[0])}
                min={50000}
                max={10000000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>₦50,000</span>
                <span>₦10,000,000</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium text-foreground">Repayment Period</label>
                <span className="text-lg font-bold text-primary">{loanTerm} Months</span>
              </div>
              <Slider
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
                min={3}
                max={36}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>3 Months</span>
                <span>36 Months</span>
              </div>
            </div>

            {/* Interest Rate Display */}
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/30">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Interest Rate</span>
                <span className="font-semibold text-foreground">{interestRate}% per annum</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Monthly Payment Card */}
            <div className="p-8 rounded-2xl bg-gradient-primary shadow-glow">
              <p className="text-primary-foreground/80 text-sm mb-2">Monthly Repayment</p>
              <p className="text-4xl font-bold text-primary-foreground">
                {formatCurrency(calculations.monthlyPayment)}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-gradient-card border border-border/50">
                <p className="text-muted-foreground text-sm mb-1">Total Repayment</p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(calculations.totalPayment)}
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-card border border-border/50">
                <p className="text-muted-foreground text-sm mb-1">Total Interest</p>
                <p className="text-xl font-bold text-accent">
                  {formatCurrency(calculations.totalInterest)}
                </p>
              </div>
            </div>

            {/* Amount Receivable */}
            <div className="p-6 rounded-xl bg-accent/10 border border-accent/30">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Amount You Receive</p>
                  <p className="text-2xl font-bold text-accent">{formatCurrency(loanAmount)}</p>
                </div>
                <Button variant="hero" asChild>
                  <Link to="/apply">
                    Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              *This is an estimate. Actual rates and terms may vary based on your profile and loan type.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;
