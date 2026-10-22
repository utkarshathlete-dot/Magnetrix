import test from 'node:test';
import assert from 'node:assert/strict';
import { filterTeamByExpertise, calculateCompanyTenure } from './about.ts';
import type { TeamLeader } from './about.ts';

const mockTeam: TeamLeader[] = [
  {
    id: 'alex',
    name: 'Alexander Vance',
    role: 'Co-Founder & Head of Growth',
    background: 'Ex-Google Ads optimization lead',
    expertise: ['Paid Acquisition', 'Algorithmic Bidding'],
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Head of Technical SEO',
    background: 'Architected semantic indexing engines',
    expertise: ['SEO', 'Entity Architecture'],
  },
];

test('calculateCompanyTenure computes years accurately', () => {
  assert.equal(calculateCompanyTenure(2021, 2026), 5);
  assert.equal(calculateCompanyTenure(2026, 2026), 0);
  assert.equal(calculateCompanyTenure(2030, 2026), 0);
});

test('filterTeamByExpertise filters leaders by expertise tag', () => {
  assert.equal(filterTeamByExpertise(mockTeam, 'all').length, 2);
  assert.equal(filterTeamByExpertise(mockTeam, 'seo').length, 1);
  assert.equal(filterTeamByExpertise(mockTeam, 'seo')[0].name, 'Elena Rostova');
  assert.equal(filterTeamByExpertise(mockTeam, 'cryptography').length, 0);
});
