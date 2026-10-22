import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoiMetrics, formatRoiCurrency } from './roiCalculator.ts';

test('calculateRoiMetrics computes positive lift and realistic unit economics', () => {
  const result = calculateRoiMetrics({
    monthlyBudget: 35000,
    customerLtv: 12000,
    monthlyVisitors: 25000,
    conversionRate: 1.8,
    closeRate: 14,
  });

  assert.equal(result.projectedRevenue > result.baselineRevenue, true);
  assert.equal(result.projectedDeals > result.baselineDeals, true);
  assert.equal(result.netMonthlyLift > 0, true);
  assert.equal(result.annualizedPipelineAddition, result.netMonthlyLift * 12);
  assert.equal(result.blendedRoas > 1.0, true);
  assert.equal(result.cacReductionPercent > 0, true);
});

test('formatRoiCurrency formats millions, thousands, and standard values cleanly', () => {
  assert.equal(formatRoiCurrency(1500000), '$1.50M');
  assert.equal(formatRoiCurrency(35000), '$35K');
  assert.equal(formatRoiCurrency(850), '$850');
});
