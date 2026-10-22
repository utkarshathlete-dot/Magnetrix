import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getInitialLanguage,
  getNextLanguage,
  getTranslation,
  TRANSLATIONS,
  LANGUAGE_OPTIONS,
} from './translations.ts';

test('getInitialLanguage defaults to en and parses stored value', () => {
  assert.equal(getInitialLanguage(null), 'en');
  assert.equal(getInitialLanguage('es'), 'es');
  assert.equal(getInitialLanguage('hi'), 'hi');
  assert.equal(getInitialLanguage('de'), 'de');
  assert.equal(getInitialLanguage('fr'), 'fr');
  assert.equal(getInitialLanguage('ar'), 'ar');
  assert.equal(getInitialLanguage('invalid'), 'en');
});

test('getNextLanguage cycles cleanly across all supported languages', () => {
  assert.equal(getNextLanguage('en'), 'hi');
  assert.equal(getNextLanguage('hi'), 'de');
  assert.equal(getNextLanguage('de'), 'fr');
  assert.equal(getNextLanguage('fr'), 'ar');
  assert.equal(getNextLanguage('ar'), 'es');
  assert.equal(getNextLanguage('es'), 'en');
});

test('LANGUAGE_OPTIONS contains 6 languages including Hindi, German, French, and Dubai / Arabic', () => {
  assert.equal(LANGUAGE_OPTIONS.length, 6);
  const codes = LANGUAGE_OPTIONS.map((o) => o.code);
  assert.ok(codes.includes('en'));
  assert.ok(codes.includes('hi'));
  assert.ok(codes.includes('de'));
  assert.ok(codes.includes('fr'));
  assert.ok(codes.includes('ar'));
  assert.ok(codes.includes('es'));
});

test('getTranslation returns complete string dictionary for all languages', () => {
  const en = getTranslation('en');
  assert.equal(en.navServices, 'Services');
  assert.equal(en.contactKicker, 'GET IN TOUCH');
  assert.equal(en.contactSendMessage, 'Send Message');

  const hi = getTranslation('hi');
  assert.equal(hi.navServices, 'सेवाएं');
  assert.equal(hi.contactSendMessage, 'संदेश भेजें');

  const de = getTranslation('de');
  assert.equal(de.navServices, 'Leistungen');
  assert.equal(de.contactSendMessage, 'Nachricht Senden');

  const fr = getTranslation('fr');
  assert.equal(fr.navServices, 'Services');
  assert.equal(fr.contactSendMessage, 'Envoyer le Message');

  const ar = getTranslation('ar');
  assert.equal(ar.navServices, 'الخدمات');
  assert.equal(ar.contactSendMessage, 'إرسال الرسالة');

  const es = getTranslation('es');
  assert.equal(es.navServices, 'Servicios');
  assert.equal(es.contactSendMessage, 'Enviar Mensaje');
});
