/**
 * State-based translations and localization map for UI strings
 * Supports English, Spanish, Hindi, German, French, and Dubai / Arabic
 */

export type Language = 'en' | 'hi' | 'de' | 'fr' | 'ar' | 'es';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  region?: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸', region: 'Global' },
  { code: 'hi', label: 'India', nativeLabel: 'Hindi (हिन्दी)', flag: '🇮🇳', region: 'India' },
  { code: 'de', label: 'Germany', nativeLabel: 'Deutsch', flag: '🇩🇪', region: 'DACH' },
  { code: 'fr', label: 'France', nativeLabel: 'Français', flag: '🇫🇷', region: 'EU' },
  { code: 'ar', label: 'Dubai / UAE', nativeLabel: 'Dubai (العربية)', flag: '🇦🇪', region: 'UAE' },
  { code: 'es', label: 'Spain / LatAm', nativeLabel: 'Español', flag: '🇪🇸', region: 'Global' },
];

export interface TranslationStrings {
  // Navigation
  navServices: string;
  navWork: string;
  navAbout: string;
  navBlog: string;
  navAudit: string;
  navContact: string;
  navGetStarted: string;
  navPartnerTagline: string;

  // Hero
  heroKicker: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroCta: string;
  heroHappyClients: string;
  heroCommunity: string;
  heroMetric1Label: string;
  heroMetric2Label: string;

  // Contact Page
  contactKicker: string;
  contactTitleLine1: string;
  contactTitleLine2: string;
  contactSubtitle: string;
  contactFirstNamePlaceholder: string;
  contactLastNamePlaceholder: string;
  contactEmailPlaceholder: string;
  contactPhonePlaceholder: string;
  contactServicePlaceholder: string;
  contactMessagePlaceholder: string;
  contactSendMessage: string;
  contactSending: string;
  contactSuccessTitle: string;
  contactSuccessMessage: string;
  contactSendAnother: string;

  // Common
  backToOverview: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    navServices: 'Services',
    navWork: 'Our Work',
    navAbout: 'About Us',
    navBlog: 'Blog',
    navAudit: 'Free Audit',
    navContact: 'Contact',
    navGetStarted: 'Get Started',
    navPartnerTagline: 'Your Growth Partner',

    heroKicker: 'Serving clients worldwide with proven strategies',
    heroTitlePrefix: 'Digital Marketing Crafted for Real Business ',
    heroTitleHighlight: 'Growth',
    heroSubtitle: 'We help brands grow with data-driven strategies, transparent reporting, and measurable results.',
    heroCta: 'Get Started',
    heroHappyClients: '50K+ Happy Clients',
    heroCommunity: 'Global community',
    heroMetric1Label: 'Campaigns launched',
    heroMetric2Label: 'Client retention',

    contactKicker: 'GET IN TOUCH',
    contactTitleLine1: "Let's Build",
    contactTitleLine2: 'Something Great',
    contactSubtitle: 'Have a project or partnership in mind? Fill out the form and our team will get back to you shortly.',
    contactFirstNamePlaceholder: 'First Name',
    contactLastNamePlaceholder: 'Last Name',
    contactEmailPlaceholder: 'Email Address',
    contactPhonePlaceholder: 'Phone Number',
    contactServicePlaceholder: 'Select Your Service (e.g. SEO, Social Media, Google Ads, etc.)',
    contactMessagePlaceholder: 'Tell us about your project, target metrics, or goals...',
    contactSendMessage: 'Send Message',
    contactSending: 'Sending Message...',
    contactSuccessTitle: 'Message Sent Successfully',
    contactSuccessMessage: 'Thank you for reaching out! Your inquiry has been registered and synced with our pipeline ledger. Our senior growth team will contact you shortly.',
    contactSendAnother: 'Send Another Message',

    backToOverview: 'Back to Overview',
  },
  hi: {
    navServices: 'सेवाएं',
    navWork: 'हमारा कार्य',
    navAbout: 'हमारे बारे में',
    navBlog: 'ब्लॉग',
    navAudit: 'मुफ्त ऑडिट',
    navContact: 'संपर्क करें',
    navGetStarted: 'शुरू करें',
    navPartnerTagline: 'आपका ग्रोथ पार्टनर',

    heroKicker: 'प्रमाणित रणनीतियों के साथ दुनिया भर में ग्राहकों की सेवा',
    heroTitlePrefix: 'वास्तविक व्यावसायिक विकास के लिए ',
    heroTitleHighlight: 'डिजिटल मार्केटिंग',
    heroSubtitle: 'हम डेटा-संचालित रणनीतियों, पारदर्शी रिपोर्टिंग और मापने योग्य परिणामों के साथ ब्रांड्स को आगे बढ़ाते हैं।',
    heroCta: 'शुरू करें',
    heroHappyClients: '50K+ संतुष्ट ग्राहक',
    heroCommunity: 'वैश्विक समुदाय',
    heroMetric1Label: 'अभियान शुरू किए गए',
    heroMetric2Label: 'ग्राहक प्रतिधारण',

    contactKicker: 'संपर्क करें',
    contactTitleLine1: 'आइए मिलकर बनाएं',
    contactTitleLine2: 'कुछ असाधारण',
    contactSubtitle: 'क्या आपके मन में कोई परियोजना या साझेदारी है? फॉर्म भरें और हमारी टीम जल्द ही आपसे संपर्क करेगी।',
    contactFirstNamePlaceholder: 'पहला नाम',
    contactLastNamePlaceholder: 'अंतिम नाम',
    contactEmailPlaceholder: 'ईमेल पता',
    contactPhonePlaceholder: 'फ़ोन नंबर',
    contactServicePlaceholder: 'अपनी सेवा चुनें (जैसे SEO, सोशल मीडिया, Google Ads आदि)',
    contactMessagePlaceholder: 'हमें अपनी परियोजना, लक्षित मैट्रिक्स या लक्ष्यों के बारे में बताएं...',
    contactSendMessage: 'संदेश भेजें',
    contactSending: 'संदेश भेजा जा रहा है...',
    contactSuccessTitle: 'संदेश सफलतापूर्वक भेजा गया',
    contactSuccessMessage: 'संपर्क करने के लिए धन्यवाद! आपकी पूछताछ दर्ज हो गई है और हमारी पाइपलाइन के साथ समन्वयित हो गई है। हमारी वरिष्ठ टीम जल्द ही आपसे संपर्क करेगी।',
    contactSendAnother: 'एक और संदेश भेजें',

    backToOverview: 'अवलोकन पर वापस जाएं',
  },
  de: {
    navServices: 'Leistungen',
    navWork: 'Referenzen',
    navAbout: 'Über uns',
    navBlog: 'Blog',
    navAudit: 'Kostenloses Audit',
    navContact: 'Kontakt',
    navGetStarted: 'Jetzt Starten',
    navPartnerTagline: 'Ihr Wachstumspartner',

    heroKicker: 'Weltweite Kundenbetreuung mit bewährten Wachstumsstrategien',
    heroTitlePrefix: 'Digitales Marketing für echtes geschäftliches ',
    heroTitleHighlight: 'Wachstum',
    heroSubtitle: 'Wir skalieren Marken mit datenbasierten Strategien, transparenter Berichterstattung und messbaren Ergebnissen.',
    heroCta: 'Jetzt Starten',
    heroHappyClients: '50K+ Zufriedene Kunden',
    heroCommunity: 'Globale Community',
    heroMetric1Label: 'Gestartete Kampagnen',
    heroMetric2Label: 'Kundenbindung',

    contactKicker: 'KONTAKT AUFNEHMEN',
    contactTitleLine1: 'Lassen Sie uns',
    contactTitleLine2: 'Großes erschaffen',
    contactSubtitle: 'Haben Sie ein Projekt oder eine Kooperation im Sinn? Füllen Sie das Formular aus – unser Team meldet sich in Kürze.',
    contactFirstNamePlaceholder: 'Vorname',
    contactLastNamePlaceholder: 'Nachname',
    contactEmailPlaceholder: 'E-Mail-Adresse',
    contactPhonePlaceholder: 'Telefonnummer',
    contactServicePlaceholder: 'Leistung auswählen (z. B. SEO, Social Media, Google Ads usw.)',
    contactMessagePlaceholder: 'Erzählen Sie uns von Ihrem Projekt, Ihren Zielen oder Kennzahlen...',
    contactSendMessage: 'Nachricht Senden',
    contactSending: 'Wird gesendet...',
    contactSuccessTitle: 'Nachricht erfolgreich gesendet',
    contactSuccessMessage: 'Vielen Dank für Ihre Nachricht! Ihre Anfrage wurde registriert und in unserem System synchronisiert. Unser Team wird sich in Kürze bei Ihnen melden.',
    contactSendAnother: 'Weitere Nachricht senden',

    backToOverview: 'Zurück zur Übersicht',
  },
  fr: {
    navServices: 'Services',
    navWork: 'Nos Réalisations',
    navAbout: 'À Propos',
    navBlog: 'Blog',
    navAudit: 'Audit Gratuit',
    navContact: 'Contact',
    navGetStarted: 'Commencer',
    navPartnerTagline: 'Votre Partenaire Croissance',

    heroKicker: 'Au service de clients internationaux avec des stratégies éprouvées',
    heroTitlePrefix: 'Marketing Digital Conçu pour une Vraie ',
    heroTitleHighlight: 'Croissance',
    heroSubtitle: 'Nous accompagnons la croissance des marques grâce à des stratégies axées sur les données, un reporting transparent et des résultats mesurables.',
    heroCta: 'Commencer',
    heroHappyClients: '50K+ Clients Satisfaits',
    heroCommunity: 'Communauté mondiale',
    heroMetric1Label: 'Campagnes lancées',
    heroMetric2Label: 'Rétention client',

    contactKicker: 'CONTACTEZ-NOUS',
    contactTitleLine1: 'Bâtissons',
    contactTitleLine2: 'Quelque Chose de Grand',
    contactSubtitle: 'Vous avez un projet ou un partenariat en tête ? Remplissez le formulaire et notre équipe vous recontactera rapidement.',
    contactFirstNamePlaceholder: 'Prénom',
    contactLastNamePlaceholder: 'Nom',
    contactEmailPlaceholder: 'Adresse E-mail',
    contactPhonePlaceholder: 'Numéro de Téléphone',
    contactServicePlaceholder: 'Sélectionnez votre service (ex. SEO, Réseaux Sociaux, Google Ads, etc.)',
    contactMessagePlaceholder: 'Parlez-nous de votre projet, de vos indicateurs cibles ou de vos objectifs...',
    contactSendMessage: 'Envoyer le Message',
    contactSending: 'Envoi en cours...',
    contactSuccessTitle: 'Message Envoyé avec Succès',
    contactSuccessMessage: 'Merci de nous avoir contactés ! Votre demande a été enregistrée et synchronisée avec notre registre. Notre équipe vous répondra très rapidement.',
    contactSendAnother: 'Envoyer un Autre Message',

    backToOverview: 'Retour à la Présentation',
  },
  ar: {
    navServices: 'الخدمات',
    navWork: 'أعمالنا',
    navAbout: 'من نحن',
    navBlog: 'المدونة',
    navAudit: 'تدقيق مجاني',
    navContact: 'اتصل بنا',
    navGetStarted: 'ابدأ الآن',
    navPartnerTagline: 'شريكك في النمو',

    heroKicker: 'خدمة عملاء عالميين باستراتيجيات نمو مثبتة',
    heroTitlePrefix: 'تسويق رقمي مصمم لتحقيق ',
    heroTitleHighlight: 'نمو حقيقي',
    heroSubtitle: 'نساعد العلامات التجارية على التوسع من خلال استراتيجيات مدفوعة بالبيانات وتقارير شفافة ونتائج قابلة للقياس.',
    heroCta: 'ابدأ الآن',
    heroHappyClients: '+50 ألف عميل سعيد',
    heroCommunity: 'مجتمع عالمي',
    heroMetric1Label: 'حملات تم إطلاقها',
    heroMetric2Label: 'نسبة الاحتفاظ بالعملاء',

    contactKicker: 'تواصل معنا (دبي والإمارات)',
    contactTitleLine1: 'لنصنع معاً',
    contactTitleLine2: 'شيئاً استثنائياً',
    contactSubtitle: 'هل لديك مشروع أو شراكة في ذهنك؟ املأ النموذج وسيقوم فريقنا بالتواصل معك قريباً.',
    contactFirstNamePlaceholder: 'الاسم الأول',
    contactLastNamePlaceholder: 'اسم العائلة',
    contactEmailPlaceholder: 'البريد الإلكتروني',
    contactPhonePlaceholder: 'رقم الهاتف',
    contactServicePlaceholder: 'اختر الخدمة (مثل SEO، وسائل التواصل، إعلانات Google وغيرها)',
    contactMessagePlaceholder: 'أخبرنا عن مشروعك أو أهدافك أو الأرقام التي تسعى إليها...',
    contactSendMessage: 'إرسال الرسالة',
    contactSending: 'جاري الإرسال...',
    contactSuccessTitle: 'تم إرسال الرسالة بنجاح',
    contactSuccessMessage: 'شكراً لتواصلك معنا! تم تسجيل استفسارك ومزامنته مع نظامنا. سيتواصل معك فريقنا في دبي قريباً.',
    contactSendAnother: 'إرسال رسالة أخرى',

    backToOverview: 'العودة للرئيسية',
  },
  es: {
    navServices: 'Servicios',
    navWork: 'Proyectos',
    navAbout: 'Nosotros',
    navBlog: 'Blog',
    navAudit: 'Auditoría Gratis',
    navContact: 'Contacto',
    navGetStarted: 'Comenzar',
    navPartnerTagline: 'Tu Socio de Crecimiento',

    heroKicker: 'Atendiendo clientes globalmente con estrategias probadas',
    heroTitlePrefix: 'Marketing Digital Diseñado para el Crecimiento ',
    heroTitleHighlight: 'Real',
    heroSubtitle: 'Ayudamos a las marcas a escalar con estrategias basadas en datos, reportes transparentes y resultados medibles.',
    heroCta: 'Comenzar',
    heroHappyClients: '50K+ Clientes Felices',
    heroCommunity: 'Comunidad global',
    heroMetric1Label: 'Campañas lanzadas',
    heroMetric2Label: 'Retención de clientes',

    contactKicker: 'PONTE EN CONTACTO',
    contactTitleLine1: 'Construyamos',
    contactTitleLine2: 'Algo Extraordinario',
    contactSubtitle: '¿Tienes un proyecto o colaboración en mente? Completa el formulario y nuestro equipo te responderá pronto.',
    contactFirstNamePlaceholder: 'Nombre',
    contactLastNamePlaceholder: 'Apellido',
    contactEmailPlaceholder: 'Correo Electrónico',
    contactPhonePlaceholder: 'Teléfono',
    contactServicePlaceholder: 'Selecciona tu Servicio (ej. SEO, Redes Sociales, Google Ads, etc.)',
    contactMessagePlaceholder: 'Cuéntanos sobre tu proyecto, métricas objetivo o metas...',
    contactSendMessage: 'Enviar Mensaje',
    contactSending: 'Enviando Mensaje...',
    contactSuccessTitle: 'Mensaje Enviado con Éxito',
    contactSuccessMessage: '¡Gracias por contactarnos! Tu consulta ha sido registrada y sincronizada con nuestro libro de prospectos. Nuestro equipo se comunicará contigo en breve.',
    contactSendAnother: 'Enviar Otro Mensaje',

    backToOverview: 'Volver al Inicio',
  },
};

export const LANGUAGE_STORAGE_KEY = 'magentrix_app_language';

const VALID_LANGUAGES: Language[] = ['en', 'hi', 'de', 'fr', 'ar', 'es'];

export function getInitialLanguage(storedValue?: string | null): Language {
  if (storedValue && VALID_LANGUAGES.includes(storedValue as Language)) {
    return storedValue as Language;
  }
  return 'en';
}

export function getNextLanguage(current: Language): Language {
  const currentIndex = VALID_LANGUAGES.indexOf(current);
  const nextIndex = (currentIndex + 1) % VALID_LANGUAGES.length;
  return VALID_LANGUAGES[nextIndex];
}

export function getTranslation(lang: Language): TranslationStrings {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
