/**
 * Utilities and state helpers for Contact Inquiries and Excel / Google Sheet integration
 */

export const DEFAULT_EXCEL_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1Magentrix-Enterprise-Pipeline-Ledger-2026/edit?usp=sharing';

export const SHEET_URL_STORAGE_KEY = 'magentrix_excel_sheet_url';
export const LEADS_STORAGE_KEY = 'magentrix_leads_ledger_v1';

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyOrWebsite: string;
  monthlyBudget: string;
  serviceOrDiscipline: string;
  message: string;
  submittedAt: string;
  sourceForm: string;
  syncStatus: 'synced' | 'stored_locally';
}

export function getConnectedSheetUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_EXCEL_SHEET_URL;
  try {
    const stored = localStorage.getItem(SHEET_URL_STORAGE_KEY);
    return stored && stored.trim() ? stored.trim() : DEFAULT_EXCEL_SHEET_URL;
  } catch {
    return DEFAULT_EXCEL_SHEET_URL;
  }
}

export function setConnectedSheetUrl(url: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SHEET_URL_STORAGE_KEY, url.trim());
  } catch {
    // Ignore storage errors
  }
}

export function getStoredLeads(): LeadSubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LeadSubmission[];
  } catch {
    return [];
  }
}

export function saveLeadToLedger(
  entry: Omit<LeadSubmission, 'id' | 'submittedAt' | 'syncStatus'> & {
    syncStatus?: 'synced' | 'stored_locally';
    phone?: string;
  }
): LeadSubmission {
  const newLead: LeadSubmission = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
    syncStatus: entry.syncStatus || 'synced',
    name: entry.name.trim(),
    email: entry.email.trim(),
    phone: entry.phone ? entry.phone.trim() : undefined,
    companyOrWebsite: entry.companyOrWebsite.trim() || 'N/A',
    monthlyBudget: entry.monthlyBudget || '$5k - $15k/mo',
    serviceOrDiscipline: entry.serviceOrDiscipline || 'General Inquiry',
    message: entry.message.trim() || 'Standard Consultation Inquiry',
    sourceForm: entry.sourceForm || 'Contact Page',
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredLeads();
      const updated = [newLead, ...existing];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  }

  return newLead;
}

export interface ContactFormFields {
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  website?: string;
  budget?: string;
  service?: string;
  message?: string;
}

export function validateContactForm(fields: ContactFormFields): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  const effectiveName = fields.firstName !== undefined
    ? fields.firstName.trim()
    : (fields.name ? fields.name.trim() : '');

  if (!effectiveName) {
    if (fields.firstName !== undefined) {
      errors.firstName = 'First name is required.';
    } else {
      errors.name = 'Full name is required.';
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fields.email || !fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(fields.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (fields.website && fields.website.trim()) {
    const cleaned = fields.website.trim().toLowerCase();
    if (!cleaned.includes('.') || cleaned.length < 4) {
      errors.website = 'Please provide a valid domain (e.g. company.com).';
    }
  }

  if (fields.phone && fields.phone.trim()) {
    const phoneClean = fields.phone.replace(/[\s\-\+\(\)]/g, '');
    if (phoneClean.length < 6) {
      errors.phone = 'Please provide a valid phone number.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateCsvFromLeads(leads: LeadSubmission[]): string {
  const headers = [
    'ID',
    'Date Submitted',
    'Full Name',
    'Email Address',
    'Phone Number',
    'Company / Website',
    'Monthly Budget',
    'Requested Discipline',
    'Notes / Brief',
    'Source Form',
    'Sync Status',
  ];

  const escapeCsv = (val: string) => `"${(val || '').replace(/"/g, '""')}"`;

  const rows = leads.map((lead) => [
    escapeCsv(lead.id),
    escapeCsv(lead.submittedAt),
    escapeCsv(lead.name),
    escapeCsv(lead.email),
    escapeCsv(lead.phone || 'N/A'),
    escapeCsv(lead.companyOrWebsite),
    escapeCsv(lead.monthlyBudget),
    escapeCsv(lead.serviceOrDiscipline),
    escapeCsv(lead.message),
    escapeCsv(lead.sourceForm),
    escapeCsv(lead.syncStatus),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
}

export function downloadCsvFile(content: string, filename = 'magentrix-leads-export.csv'): void {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
