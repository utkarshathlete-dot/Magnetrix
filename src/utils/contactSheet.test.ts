import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_EXCEL_SHEET_URL,
  validateContactForm,
  saveLeadToLedger,
  generateCsvFromLeads,
} from './contactSheet.ts';
import type { LeadSubmission } from './contactSheet.ts';

test('validateContactForm rejects missing required fields and invalid email', () => {
  const empty = validateContactForm({ name: '', email: '' });
  assert.equal(empty.isValid, false);
  assert.equal(Boolean(empty.errors.name), true);
  assert.equal(Boolean(empty.errors.email), true);

  const invalidEmail = validateContactForm({ name: 'Alex Vance', email: 'not-an-email' });
  assert.equal(invalidEmail.isValid, false);
  assert.equal(Boolean(invalidEmail.errors.email), true);

  const valid = validateContactForm({
    name: 'Elena Rostova',
    email: 'elena@brandflow.io',
    website: 'brandflow.io',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('saveLeadToLedger assigns unique ID and default fields', () => {
  const lead = saveLeadToLedger({
    name: 'Marcus Brody',
    email: 'marcus@novascale.com',
    companyOrWebsite: 'novascale.com',
    monthlyBudget: '$15k - $30k/mo',
    serviceOrDiscipline: 'Technical SEO',
    message: 'Need full programmatic CMS architecture review.',
    sourceForm: 'Contact Page Direct',
  });

  assert.equal(lead.name, 'Marcus Brody');
  assert.equal(lead.email, 'marcus@novascale.com');
  assert.equal(lead.id.startsWith('lead_'), true);
  assert.equal(Boolean(lead.submittedAt), true);
  assert.equal(lead.syncStatus, 'synced');
});

test('generateCsvFromLeads generates valid RFC-compliant CSV headers and rows', () => {
  const sampleLeads: LeadSubmission[] = [
    {
      id: 'lead_1',
      submittedAt: '2026-10-19T01:00:00Z',
      name: 'Sarah Connor',
      email: 'sarah@skynet.com',
      companyOrWebsite: 'skynet.com',
      monthlyBudget: '$30k+/mo',
      serviceOrDiscipline: 'Attribution & Telemetry',
      message: 'Looking for "custom" server CAPI sync.',
      sourceForm: 'Modal',
      syncStatus: 'synced',
    },
  ];

  const csv = generateCsvFromLeads(sampleLeads);
  assert.equal(csv.includes('ID,Date Submitted,Full Name'), true);
  assert.equal(csv.includes('"Sarah Connor"'), true);
  assert.equal(csv.includes('"Looking for ""custom"" server CAPI sync."'), true);
});
