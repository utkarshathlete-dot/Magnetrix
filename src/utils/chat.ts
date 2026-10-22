/**
 * Pure data and logic helpers for the Floating Live Chat Widget
 */

export interface ChatMessage {
  id: string;
  sender: 'team' | 'user';
  senderName: string;
  text: string;
  timestamp: string;
  ticketId?: string;
}

export const WHATSAPP_CONFIG = {
  phoneNumber: '+91 92113 74014',
  rawNumber: '919211374014',
  founderName: 'Utkarsh Giri',
  founderTitle: 'Founder, Magnetrix Digital',
  defaultGreeting: 'Hi Utkarsh, I am on the Magnetrix Digital website and would like to consult about our marketing strategy.',
  typicalResponseTime: '< 5 minutes',
};

export function buildWhatsAppChatUrl(customMessage?: string, ticketId?: string): string {
  let text = customMessage && customMessage.trim() ? customMessage.trim() : WHATSAPP_CONFIG.defaultGreeting;
  if (ticketId) {
    text = `[Ref: ${ticketId}] ${text}`;
  }
  return `https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(text)}`;
}

export function isWhatsAppInquiry(text: string): boolean {
  const lower = text.toLowerCase();
  return (
    lower.includes('whatsapp') ||
    lower.includes('wa.me') ||
    lower.includes('chat on wa') ||
    lower.includes('phone') ||
    lower.includes('call') ||
    lower.includes('utkarsh') ||
    lower.includes('direct message')
  );
}

export function validateChatEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function createChatMessage(
  sender: 'team' | 'user',
  text: string,
  senderName: string = sender === 'user' ? 'You' : 'Magentrix Growth Desk'
): ChatMessage {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sender,
    senderName,
    text: text.trim(),
    timestamp: timeStr,
  };
}

export function generateAutomatedAcknowledgment(
  userText: string,
  ticketNum: number = 8492
): { replyText: string; ticketId: string; isWhatsAppSuggested?: boolean } {
  const ticketId = `MGX-${ticketNum}`;
  const lower = userText.toLowerCase();

  if (isWhatsAppInquiry(userText)) {
    return {
      replyText: `You can connect directly with Utkarsh Giri on WhatsApp (+91 92113 74014) for instant turnaround! Use the WhatsApp button above or click below to start a direct chat referencing ticket #${ticketId}.`,
      ticketId,
      isWhatsAppSuggested: true,
    };
  }

  let focus = 'commercial inquiry';
  if (lower.includes('audit') || lower.includes('seo')) {
    focus = 'technical search audit';
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('retainer')) {
    focus = 'retainer investment scope';
  } else if (lower.includes('paid') || lower.includes('ads') || lower.includes('google')) {
    focus = 'algorithmic paid acquisition review';
  }

  const replyText = `Thanks for reaching out! We've routed your ${focus} directly to our senior directors under ticket #${ticketId}. A growth engineer will review your telemetry and respond shortly.`;

  return { replyText, ticketId, isWhatsAppSuggested: false };
}

