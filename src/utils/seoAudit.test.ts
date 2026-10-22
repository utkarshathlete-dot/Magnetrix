import test from 'node:test';
import assert from 'node:assert/strict';
import { validateUrlInput, generateDeterministicAudit } from './seoAudit.ts';

test('validateUrlInput normalizes protocols and rejects invalid domains', () => {
  const validWithHttp = validateUrlInput('https://stripe.com');
  assert.equal(validWithHttp.isValid, true);
  assert.equal(validWithHttp.normalizedUrl, 'https://stripe.com');

  const validWithoutHttp = validateUrlInput('linear.app');
  assert.equal(validWithoutHttp.isValid, true);
  assert.equal(validWithoutHttp.normalizedUrl, 'https://linear.app');

  const invalidNoDomain = validateUrlInput('invalid-text');
  assert.equal(invalidNoDomain.isValid, false);
  assert.equal(typeof invalidNoDomain.error, 'string');

  const emptyInput = validateUrlInput('');
  assert.equal(emptyInput.isValid, false);
});

test('generateDeterministicAudit produces bounded scores and findings', () => {
  const audit = generateDeterministicAudit({
    url: 'https://brandflow.io',
    targetKeyword: 'workflow automation',
  });

  assert.equal(audit.overallScore >= 50 && audit.overallScore <= 100, true);
  assert.equal(['A+', 'A', 'B', 'C', 'D'].includes(audit.grade), true);
  assert.equal(audit.findings.length, 4);
  assert.equal(audit.categories.coreWebVitals.score >= 50, true);
  assert.equal(audit.categories.entityArchitecture.score >= 50, true);
});

test('generateDeterministicAudit generates consistent score for same domain', () => {
  const audit1 = generateDeterministicAudit({
    url: 'https://novascale.cloud',
    targetKeyword: 'cloud devops',
  });
  const audit2 = generateDeterministicAudit({
    url: 'https://novascale.cloud',
    targetKeyword: 'cloud devops',
  });

  assert.equal(audit1.overallScore, audit2.overallScore);
  assert.equal(audit1.grade, audit2.grade);
});
