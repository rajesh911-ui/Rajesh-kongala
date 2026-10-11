export interface ModuleItem {
  id: number;
  number: string;
  duration: string;
  title: string;
  summary: string;
  topics: string[];
  toolsCovered: string[];
  deliverable: string;
}

export interface CapabilityItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  examplePrompt?: string;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone?: string;
  experienceLevel: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  cohort: string;
  experience: 'beginner' | 'nocoder' | 'pro';
  paymentMethod: 'card' | 'wallet' | 'paypal';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  postalCode: string;
  agreeTerms: boolean;
}
