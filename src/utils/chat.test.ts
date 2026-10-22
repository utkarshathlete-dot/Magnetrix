import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateChatEmail,
  createChatMessage,
  generateAutomatedAcknowledgment,
  buildWhatsAppChatUrl,
  isWhatsAppInquiry,
  WHATSAPP_CONFIG,
} from './chat.ts';

test('validateChatEmail validates email formats accurately', () => {
  assert.equal(validateChatEmail('elena@brandflow.io'), true);
  assert.equal(validateChatEmail('invalid-email'), false);
  assert.equal(validateChatEmail('user@domain'), false);
  assert.equal(validateChatEmail(''), false);
});

test('createChatMessage creates valid structured message with timestamp', () => {
  const msg = createChatMessage('user', 'Can we schedule an audit?');
  assert.equal(msg.sender, 'user');
  assert.equal(msg.senderName, 'You');
  assert.equal(msg.text, 'Can we schedule an audit?');
  assert.equal(typeof msg.timestamp, 'string');
});

test('generateAutomatedAcknowledgment contextualizes topic and generates ticket ID', () => {
  const ack = generateAutomatedAcknowledgment('We want an SEO audit for our SaaS', 9102);
  assert.equal(ack.ticketId, 'MGX-9102');
  assert.equal(ack.replyText.includes('technical search audit'), true);

  const priceAck = generateAutomatedAcknowledgment('What is your monthly retainer pricing?', 9103);
  assert.equal(priceAck.replyText.includes('retainer investment scope'), true);
});

test('buildWhatsAppChatUrl creates valid WhatsApp wa.me link with encoded params', () => {
  const defaultUrl = buildWhatsAppChatUrl();
  assert.ok(defaultUrl.startsWith(`https://wa.me/${WHATSAPP_CONFIG.rawNumber}`));
  assert.ok(defaultUrl.includes('Hi%20Utkarsh'));

  const customUrl = buildWhatsAppChatUrl('I need Meta Ads help', 'MGX-5544');
  assert.ok(customUrl.includes('MGX-5544'));
  assert.ok(customUrl.includes('Meta%20Ads%20help'));
});

test('isWhatsAppInquiry accurately detects messaging intent', () => {
  assert.equal(isWhatsAppInquiry('Can I message you on WhatsApp?'), true);
  assert.equal(isWhatsAppInquiry('What is Utkarsh phone number?'), true);
  assert.equal(isWhatsAppInquiry('send via wa.me'), true);
  assert.equal(isWhatsAppInquiry('What is your email address?'), false);
  assert.equal(isWhatsAppInquiry('How does SEO work?'), false);
});

test('generateAutomatedAcknowledgment suggests WhatsApp for WhatsApp inquiries', () => {
  const waAck = generateAutomatedAcknowledgment('Can we talk on WhatsApp?', 7788);
  assert.equal(waAck.ticketId, 'MGX-7788');
  assert.equal(waAck.isWhatsAppSuggested, true);
  assert.ok(waAck.replyText.includes('+91 92113 74014'));
  assert.ok(waAck.replyText.includes('Utkarsh Giri'));
});

