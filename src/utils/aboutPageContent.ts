/**
 * About Us Page Content Object & Validation Utilities for Magnetrix Digital
 * Keep all copy and links centralized in this file for easy updating.
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FounderContactActions {
  whatsapp: string;
  call: string;
  email: string;
}

export interface FounderInfo {
  heading: string;
  name: string;
  title: string;
  photoPlaceholderLabel: string;
  photoUrl?: string; // Replace with founder photo URL when available
  credentials: string;
  paragraphs: string[];
  contactActions: FounderContactActions;
}

export interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface ConsultationFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceInterestedIn: string;
  message: string;
}

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  serviceInterestedIn?: string;
  message?: string;
}

export const ABOUT_PAGE_CONTENT = {
  seo: {
    title: 'About Magnetrix Digital | Full-Service Digital Marketing Agency in New Delhi',
    description: 'Magnetrix Digital is a full-service digital marketing agency in New Delhi, India. We attract customers with data-driven strategy, SEO, Meta ads, and web design.',
    url: 'https://magnetrixdigital.com/about',
  },
  hero: {
    badge: 'Magnetrix Digital · New Delhi, India',
    h1: "Be the brand people can't ignore.",
    intro:
      "Magnetrix Digital is a full-service digital marketing agency in New Delhi, India. We believe the best marketing doesn't chase customers. It attracts them. Like a magnet, the right strategy pulls the right people toward your brand, and keeps them there.",
    supportingLine:
      'Founded in 2025, we work with businesses of every size and in every industry. From first-time founders to established companies, we turn attention into enquiries, enquiries into customers, and customers into loyal fans.',
    primaryCta: 'Book a Free Consultation',
    secondaryCta: 'Chat on WhatsApp',
    whatsappUrl: 'https://wa.me/919211374014',
    phoneDisplay: '+91 92113 74014',
    phoneTel: 'tel:+919211374014',
  },
  missionVision: {
    mission: {
      tag: 'Our Mission',
      statement:
        'To make powerful, honest and measurable digital marketing accessible to every business that wants to grow.',
    },
    vision: {
      tag: 'Our Vision',
      statement:
        "To become India's most trusted growth partner for brands, known for clear communication, creative thinking and results you can see.",
    },
  },
  whatWeDo: {
    heading: 'What We Do',
    subheading: 'Comprehensive, high-intent capabilities engineered to attract and convert.',
    services: [
      {
        id: 'web-dev',
        title: 'Website Design & Development',
        description: 'Fast, modern websites built to convert visitors into customers.',
        icon: 'Monitor',
      },
      {
        id: 'social-media',
        title: 'Social Media Marketing',
        description: 'Content and communities that build trust and engagement.',
        icon: 'Share2',
      },
      {
        id: 'meta-ads',
        title: 'Meta Ads (Facebook & Instagram)',
        description: 'Targeted campaigns focused on leads and sales, not vanity metrics.',
        icon: 'Target',
      },
      {
        id: 'google-ads',
        title: 'Google Ads',
        description: 'Reach people at the exact moment they search for what you offer.',
        icon: 'Search',
      },
      {
        id: 'seo-content',
        title: 'SEO & Content Marketing',
        description: 'Rank higher and get found organically.',
        icon: 'FileText',
      },
      {
        id: 'branding',
        title: 'Branding & Creative Design',
        description: 'A look and voice people remember.',
        icon: 'Palette',
      },
      {
        id: 'email-whatsapp',
        title: 'Email & WhatsApp Marketing',
        description: 'Direct communication that brings customers back.',
        icon: 'Mail',
      },
      {
        id: 'influencer-video',
        title: 'Influencer & Video Marketing',
        description: 'Stories that reach new audiences.',
        icon: 'Video',
      },
      {
        id: 'analytics-cro',
        title: 'Analytics & Conversion Optimization',
        description: "Clear data on what's working and what to improve.",
        icon: 'BarChart2',
      },
    ] as ServiceItem[],
  },
  founder: {
    heading: 'Meet the Founder',
    name: 'Utkarsh Giri',
    title: 'Founder of Magnetrix Digital',
    photoPlaceholderLabel: 'Utkarsh Giri',
    photoUrl: '', // Leave empty for stylized vector badge, or set image URL here
    credentials:
      'MBA in Marketing Management & BA in Economics (Zakir Husain Delhi College, University of Delhi)',
    paragraphs: [
      'Utkarsh holds an MBA in Marketing Management and a BA in Economics from Zakir Husain Delhi College, University of Delhi. At 24, he started Magnetrix with a clear goal: to give businesses the kind of thoughtful, data-driven marketing that is often reserved for big brands, without the confusing jargon or inflated costs.',
      "His economics background shapes how Magnetrix works. Every rupee spent on marketing should have a purpose and a measurable return. He stays closely involved in every client's journey, so you work with someone who genuinely cares about your growth.",
    ],
    contactActions: {
      whatsapp: 'https://wa.me/919211374014',
      call: 'tel:+919211374014',
      email: 'mailto:Magnetrix.digital@gmail.com',
    },
  } as FounderInfo,
  brands: {
    intro:
      "We've had the privilege of helping businesses across industries grow their digital presence, including:",
    clientNames: [
      'Screen Fixer',
      'Primex Laboratories',
      'Kumbh Camp Om',
      'Anantraj Consultancy',
      'Axma International Event Hub Pvt Ltd',
      'Urban Viraasat (Real Estate)',
      'Aidue Holidays',
    ],
    closingLine:
      "From website design and social media management to Meta and Google Ads campaigns, we've supported brands in services, real estate, travel, events and more.",
  },
  differentiators: {
    heading: 'What Makes Us Different',
    subheading: 'No agency bloat, no handoffs, no empty promises.',
    items: [
      {
        id: 'founder-led',
        title: 'Founder-led attention',
        description: 'Your project gets real care, not a handoff to a junior team.',
      },
      {
        id: 'one-team',
        title: 'One team, one strategy',
        description:
          'Website, ads, social and content work together, so your brand stays consistent.',
      },
      {
        id: 'custom-never-copy',
        title: 'Custom, never copy-paste',
        description: 'Every strategy is built around your business, audience and goals.',
      },
      {
        id: 'honest-reporting',
        title: 'Honest, simple reporting',
        description: 'Plain-language updates on what we did, what it achieved and what’s next.',
      },
      {
        id: 'fast-modern',
        title: 'Fast and modern',
        description:
          'As a young agency, we move quickly and adopt the latest tools and platforms.',
      },
    ] as DifferentiatorItem[],
  },
  howWeWork: {
    heading: 'How We Work',
    subheading: 'A disciplined, 4-step framework designed for speed and compounding returns.',
    steps: [
      {
        stepNumber: 1,
        title: 'Discover',
        description: 'We learn your business, audience and goals.',
      },
      {
        stepNumber: 2,
        title: 'Strategize',
        description: 'We build a plan backed by research and data.',
      },
      {
        stepNumber: 3,
        title: 'Execute',
        description: 'We create and launch with attention to detail.',
      },
      {
        stepNumber: 4,
        title: 'Optimize',
        description: 'We track results and keep improving them.',
      },
    ] as ProcessStep[],
  },
  values: {
    heading: 'Our Values',
    subheading: 'The principles that guide how we treat every client and campaign.',
    items: [
      {
        title: 'Clarity',
        description: 'No jargon, no hidden costs.',
      },
      {
        title: 'Curiosity',
        description: 'We keep learning so you stay ahead.',
      },
      {
        title: 'Accountability',
        description: 'We own our results.',
      },
      {
        title: 'Partnership',
        description: 'Your growth is our growth.',
      },
    ] as ValueItem[],
  },
  ctaSection: {
    heading: 'Ready to Make Your Brand Magnetic?',
    text: "Let's talk about your goals. Book a free consultation or message us directly.",
    primaryBtn: 'Book a Free Consultation',
    whatsappBtn: 'Chat on WhatsApp: +91 92113 74014',
    callBtn: 'Call Us: +91 92113 74014',
    whatsappUrl: 'https://wa.me/919211374014',
    callUrl: 'tel:+919211374014',
    agencyEmail: 'Magnetrix.digital@gmail.com',
  },
  footer: {
    companyName: 'Magnetrix Digital',
    location: 'New Delhi, India',
    phone: '+91 92113 74014',
    phoneTel: 'tel:+919211374014',
    whatsappUrl: 'https://wa.me/919211374014',
    copyright: '© 2025 Magnetrix Digital. All rights reserved.',
  },
};

/**
 * Validates consultation form input data with strict field checks
 */
export function validateConsultationForm(data: Partial<ConsultationFormData>): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.phone || !/^[0-9+() -]{7,16}$/.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid contact number.';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please provide a valid business email address.';
  }

  if (!data.serviceInterestedIn || data.serviceInterestedIn.trim() === '') {
    errors.serviceInterestedIn = 'Please select a service of interest.';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Please provide a short description of your goals or requirements.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Service options available in consultation form dropdown
 */
export const CONSULTATION_SERVICES_OPTIONS = [
  'Website Design & Development',
  'Social Media Marketing',
  'Meta Ads (Facebook & Instagram)',
  'Google Ads',
  'SEO & Content Marketing',
  'Branding & Creative Design',
  'Email & WhatsApp Marketing',
  'Influencer & Video Marketing',
  'Analytics & Conversion Optimization',
  'Comprehensive 360° Growth Retainer',
];
