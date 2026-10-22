import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  getDistinctIndustries,
  shouldShowIndustryFilter,
  hasAnyTestimonials,
  getServiceSlug,
  getServiceFromSlug,
  getIndustrySlug,
  getIndustryFromSlug,
  getClientInitials,
  generatePortfolioSchema,
} from './workFilters.ts';
import { PROJECTS_DATA, type Project, INDUSTRY_PLACEHOLDER } from '../data/projects.ts';

test('PROJECTS_DATA contains exactly 7 clients as specified', () => {
  assert.equal(PROJECTS_DATA.length, 7);
  const names = PROJECTS_DATA.map((p) => p.clientName);
  assert.ok(names.includes('Screen Fixer'));
  assert.ok(names.includes('Primex Laboratories'));
  assert.ok(names.includes('Kumbh Camp Om'));
  assert.ok(names.includes('Anantraj Consultancy'));
  assert.ok(names.includes('Axma International Event Hub Pvt Ltd'));
  assert.ok(names.includes('Urban Viraasat'));
  assert.ok(names.includes('Aidue Holidays'));
});

test('getDistinctIndustries excludes placeholder and empty values', () => {
  const industries = getDistinctIndustries(PROJECTS_DATA);
  assert.deepEqual(industries, ['Real Estate', 'Travel']);
  assert.ok(!industries.includes(INDUSTRY_PLACEHOLDER));
});

test('shouldShowIndustryFilter returns true when distinct industries >= 2', () => {
  assert.equal(shouldShowIndustryFilter(PROJECTS_DATA), true);

  // If only 1 industry exists, should return false
  const singleIndustryProjects: Project[] = [
    {
      id: '1',
      clientName: 'Alpha',
      industry: 'Fintech',
      services: ['Meta Ads'],
      shortDescription: 'Desc',
    },
    {
      id: '2',
      clientName: 'Beta',
      industry: INDUSTRY_PLACEHOLDER,
      services: ['Google Ads'],
      shortDescription: 'Desc',
    },
  ];
  assert.equal(shouldShowIndustryFilter(singleIndustryProjects), false);
});

test('filterProjects correctly filters by service and industry', () => {
  // All
  const allProjects = filterProjects(PROJECTS_DATA, 'All', 'All');
  assert.equal(allProjects.length, 7);

  // Specific service
  const metaAdsProjects = filterProjects(PROJECTS_DATA, 'Meta Ads', 'All');
  assert.equal(metaAdsProjects.length, 7); // All 7 currently have Meta Ads

  // Specific industry
  const realEstateProjects = filterProjects(PROJECTS_DATA, 'All', 'Real Estate');
  assert.equal(realEstateProjects.length, 1);
  assert.equal(realEstateProjects[0].clientName, 'Urban Viraasat');

  const travelProjects = filterProjects(PROJECTS_DATA, 'All', 'Travel');
  assert.equal(travelProjects.length, 1);
  assert.equal(travelProjects[0].clientName, 'Aidue Holidays');

  // Non-matching combo
  const nonMatching = filterProjects(PROJECTS_DATA, 'Nonexistent Service', 'All');
  assert.equal(nonMatching.length, 0);
});

test('hasAnyTestimonials respects critical rule of empty testimonials', () => {
  // Currently no testimonials provided
  assert.equal(hasAnyTestimonials(PROJECTS_DATA), false);

  // When a testimonial is populated, returns true
  const withTestimonial: Project[] = [
    ...PROJECTS_DATA,
    {
      id: 'sample',
      clientName: 'Sample Co',
      industry: 'Tech',
      services: ['Google Ads'],
      shortDescription: 'Desc',
      testimonial: {
        quote: 'Outstanding growth results!',
        name: 'Jane Doe',
        role: 'CEO',
      },
    },
  ];
  assert.equal(hasAnyTestimonials(withTestimonial), true);
});

test('URL slug conversions work bidirectionally for services and industries', () => {
  assert.equal(getServiceSlug('Website Design'), 'website-design');
  assert.equal(getServiceSlug('Meta Ads'), 'meta-ads');
  assert.equal(getServiceSlug('All'), '');

  assert.equal(getServiceFromSlug('meta-ads'), 'Meta Ads');
  assert.equal(getServiceFromSlug('website-design'), 'Website Design');
  assert.equal(getServiceFromSlug(null), 'All');
  assert.equal(getServiceFromSlug('unknown-slug'), 'All');

  assert.equal(getIndustrySlug('Real Estate'), 'real-estate');
  assert.equal(getIndustrySlug('Travel'), 'travel');
  assert.equal(getIndustrySlug(INDUSTRY_PLACEHOLDER), '');

  const available = ['Real Estate', 'Travel'];
  assert.equal(getIndustryFromSlug('real-estate', available), 'Real Estate');
  assert.equal(getIndustryFromSlug('travel', available), 'Travel');
  assert.equal(getIndustryFromSlug(null, available), 'All');
});

test('getClientInitials generates consistent 2-letter monogram', () => {
  assert.equal(getClientInitials('Screen Fixer'), 'SF');
  assert.equal(getClientInitials('Urban Viraasat'), 'UV');
  assert.equal(getClientInitials('Kumbh Camp Om'), 'KC');
  assert.equal(getClientInitials('Primex'), 'PR');
});

test('generatePortfolioSchema produces valid JSON-LD structure', () => {
  const schema = generatePortfolioSchema(PROJECTS_DATA, 'https://magnetrix.in');
  assert.equal(schema['@type'], 'CollectionPage');
  assert.equal(schema.mainEntity['@type'], 'ItemList');
  assert.equal(schema.mainEntity.itemListElement.length, 7);
  assert.equal(schema.mainEntity.itemListElement[0].position, 1);
  assert.equal(
    schema.mainEntity.itemListElement[0].item.name,
    'Screen Fixer - Growth & Marketing Portfolio'
  );
});
