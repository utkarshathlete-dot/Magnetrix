import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ABOUT_PAGE_CONTENT,
  validateConsultationForm,
  CONSULTATION_SERVICES_OPTIONS,
} from './aboutPageContent.ts';

test('ABOUT_PAGE_CONTENT has correct Hero copy and single H1 text', () => {
  assert.equal(ABOUT_PAGE_CONTENT.hero.h1, "Be the brand people can't ignore.");
  assert.ok(ABOUT_PAGE_CONTENT.hero.intro.includes('New Delhi, India'));
  assert.ok(ABOUT_PAGE_CONTENT.hero.intro.includes('Like a magnet'));
  assert.ok(ABOUT_PAGE_CONTENT.hero.supportingLine.includes('Founded in 2025'));
  assert.equal(ABOUT_PAGE_CONTENT.hero.whatsappUrl, 'https://wa.me/919211374014');
});

test('ABOUT_PAGE_CONTENT has exact 9 services for What We Do', () => {
  assert.equal(ABOUT_PAGE_CONTENT.whatWeDo.services.length, 9);
  const titles = ABOUT_PAGE_CONTENT.whatWeDo.services.map((s) => s.title);
  assert.ok(titles.includes('Website Design & Development'));
  assert.ok(titles.includes('Social Media Marketing'));
  assert.ok(titles.includes('Meta Ads (Facebook & Instagram)'));
  assert.ok(titles.includes('Google Ads'));
  assert.ok(titles.includes('SEO & Content Marketing'));
  assert.ok(titles.includes('Branding & Creative Design'));
  assert.ok(titles.includes('Email & WhatsApp Marketing'));
  assert.ok(titles.includes('Influencer & Video Marketing'));
  assert.ok(titles.includes('Analytics & Conversion Optimization'));
});

test('ABOUT_PAGE_CONTENT has founder details for Utkarsh Giri', () => {
  assert.equal(ABOUT_PAGE_CONTENT.founder.name, 'Utkarsh Giri');
  assert.equal(ABOUT_PAGE_CONTENT.founder.title, 'Founder of Magnetrix Digital');
  assert.equal(ABOUT_PAGE_CONTENT.founder.paragraphs.length, 2);
  assert.ok(ABOUT_PAGE_CONTENT.founder.paragraphs[0].includes('Zakir Husain Delhi College'));
  assert.ok(ABOUT_PAGE_CONTENT.founder.paragraphs[1].includes('Every rupee spent'));
});

test('ABOUT_PAGE_CONTENT lists the exact 7 brand client names without invented claims', () => {
  const brands = ABOUT_PAGE_CONTENT.brands.clientNames;
  assert.equal(brands.length, 7);
  assert.deepEqual(brands, [
    'Screen Fixer',
    'Primex Laboratories',
    'Kumbh Camp Om',
    'Anantraj Consultancy',
    'Axma International Event Hub Pvt Ltd',
    'Urban Viraasat (Real Estate)',
    'Aidue Holidays',
  ]);
});

test('ABOUT_PAGE_CONTENT has 5 differentiators, 4 steps, and 4 core values', () => {
  assert.equal(ABOUT_PAGE_CONTENT.differentiators.items.length, 5);
  assert.equal(ABOUT_PAGE_CONTENT.howWeWork.steps.length, 4);
  assert.equal(ABOUT_PAGE_CONTENT.values.items.length, 4);

  const valueNames = ABOUT_PAGE_CONTENT.values.items.map((v) => v.title);
  assert.deepEqual(valueNames, ['Clarity', 'Curiosity', 'Accountability', 'Partnership']);
});

test('validateConsultationForm accepts valid inputs', () => {
  const validData = {
    fullName: 'Aarav Sharma',
    phone: '+91 98765 43210',
    email: 'aarav@business.com',
    serviceInterestedIn: 'Meta Ads (Facebook & Instagram)',
    message: 'Looking to scale lead generation for our D2C brand in Delhi.',
  };

  const result = validateConsultationForm(validData);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateConsultationForm rejects missing or invalid inputs', () => {
  const invalidData = {
    fullName: 'A',
    phone: '123',
    email: 'not-an-email',
    serviceInterestedIn: '',
    message: 'hi',
  };

  const result = validateConsultationForm(invalidData);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.email);
  assert.ok(result.errors.serviceInterestedIn);
  assert.ok(result.errors.message);
});

test('CONSULTATION_SERVICES_OPTIONS contains available services', () => {
  assert.ok(CONSULTATION_SERVICES_OPTIONS.length >= 9);
  assert.ok(CONSULTATION_SERVICES_OPTIONS.includes('Google Ads'));
});
