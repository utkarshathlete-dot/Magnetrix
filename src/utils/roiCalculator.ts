/**
 * Pure calculation logic for Growth & Pipeline ROI Calculator
 */

export interface RoiInputs {
  monthlyBudget: number;
  customerLtv: number;
  monthlyVisitors: number;
  conversionRate: number; // e.g. 1.8 (%)
  closeRate: number; // e.g. 14 (%)
}

export interface RoiOutputs {
  baselineLeads: number;
  baselineDeals: number;
  baselineRevenue: number;
  baselineCac: number;

  projectedLeads: number;
  projectedDeals: number;
  projectedRevenue: number;
  projectedCac: number;

  netMonthlyLift: number;
  annualizedPipelineAddition: number;
  blendedRoas: number;
  cacReductionPercent: number;
}

export function calculateRoiMetrics(inputs: RoiInputs): RoiOutputs {
  const { monthlyBudget, customerLtv, monthlyVisitors, conversionRate, closeRate } = inputs;

  const convDecimal = Math.max(0.001, conversionRate / 100);
  const closeDecimal = Math.max(0.01, closeRate / 100);

  // Baseline performance
  const baselineLeads = Math.round(monthlyVisitors * convDecimal);
  const baselineDeals = Math.max(1, Math.round(baselineLeads * closeDecimal));
  const baselineRevenue = Math.round(baselineDeals * customerLtv);
  const baselineCac = Math.round(monthlyBudget / baselineDeals);

  // Magentrix Optimization Multipliers
  // +40% conversion rate lift via CRO & high-intent targeting
  // +18% close rate lift via friction-free onboarding & qualified leads
  const optimizedConvDecimal = convDecimal * 1.40;
  const optimizedCloseDecimal = closeDecimal * 1.18;

  const projectedLeads = Math.round(monthlyVisitors * optimizedConvDecimal);
  const projectedDeals = Math.max(1, Math.round(projectedLeads * optimizedCloseDecimal));
  const projectedRevenue = Math.round(projectedDeals * customerLtv);
  const projectedCac = Math.round(monthlyBudget / projectedDeals);

  const netMonthlyLift = Math.max(0, projectedRevenue - baselineRevenue);
  const annualizedPipelineAddition = netMonthlyLift * 12;
  const blendedRoas = monthlyBudget > 0 ? Number((projectedRevenue / monthlyBudget).toFixed(1)) : 0;
  const cacReductionPercent = baselineCac > 0 ? Math.round(((baselineCac - projectedCac) / baselineCac) * 100) : 0;

  return {
    baselineLeads,
    baselineDeals,
    baselineRevenue,
    baselineCac,
    projectedLeads,
    projectedDeals,
    projectedRevenue,
    projectedCac,
    netMonthlyLift,
    annualizedPipelineAddition,
    blendedRoas,
    cacReductionPercent: Math.max(0, cacReductionPercent),
  };
}

export function formatRoiCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    return `$${Math.round(amount / 1_000).toLocaleString()}K`;
  }
  return `$${amount.toLocaleString()}`;
}
