import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DETAILED_SERVICES_CATALOG,
  filterDetailedServices,
  calculateSquadEstimate,
} from './servicesPage.ts';

test('filterDetailedServices filters by category accurately', () => {
  const all = filterDetailedServices(DETAILED_SERVICES_CATALOG, 'all', '');
  assert.equal(all.length, 6);

  const acquisition = filterDetailedServices(DETAILED_SERVICES_CATALOG, 'acquisition', '');
  assert.equal(acquisition.length, 2);
  assert.equal(acquisition[0].id, 'seo');
  assert.equal(acquisition[1].id, 'ppc');
});

test('filterDetailedServices filters by search query on tools and deliverables', () => {
  const frog = filterDetailedServices(DETAILED_SERVICES_CATALOG, 'all', 'Screaming Frog');
  assert.equal(frog.length, 1);
  assert.equal(frog[0].id, 'seo');

  const crm = filterDetailedServices(DETAILED_SERVICES_CATALOG, 'all', 'HubSpot');
  assert.equal(crm.length >= 2, true);
});

test('calculateSquadEstimate scales squad engineers and hours based on scope', () => {
  const single = calculateSquadEstimate(['seo']);
  assert.equal(single.selectedCount, 1);
  assert.equal(single.totalWeeklyHours, 18);
  assert.equal(single.recommendedEngineers, 1);
  assert.equal(single.estimatedSprintDuration, '30-Day Quick-Strike Sprint');

  const multi = calculateSquadEstimate(['seo', 'ppc', 'cro', 'telemetry']);
  assert.equal(multi.selectedCount, 4);
  assert.equal(multi.totalWeeklyHours > 50, true);
  assert.equal(multi.recommendedEngineers, 3);
  assert.equal(multi.estimatedSprintDuration, '90-Day Comprehensive Growth Sprint');
});
