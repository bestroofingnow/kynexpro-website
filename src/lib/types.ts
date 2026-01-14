export interface AuditReport {
  overallScore: number;
  website: string;
  generatedAt: string;
  pageSpeed: {
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    timeToInteractive: number;
    score: number;
  };
  metaTags: {
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    hasOgTags: boolean;
    hasTwitterCards: boolean;
    issues: string[];
    score: number;
  };
  backlinks: {
    total: number;
    dofollow: number;
    nofollow: number;
    quality: 'low' | 'medium' | 'high';
    topDomains: { domain: string; authority: number }[];
    score: number;
  };
  keywords: {
    ranking: { keyword: string; position: number; searchVolume: number }[];
    opportunities: { keyword: string; difficulty: number; volume: number }[];
    score: number;
  };
  competitors: {
    name: string;
    domain: string;
    score: number;
    traffic: string;
    strengths: string[];
    weaknesses: string[];
  }[];
  mobile: {
    isMobileFriendly: boolean;
    viewportConfigured: boolean;
    textReadable: boolean;
    tapTargetsSize: boolean;
    issues: string[];
    score: number;
  };
  security: {
    hasHttps: boolean;
    validCertificate: boolean;
    headers: { name: string; present: boolean; value?: string }[];
    score: number;
  };
  content: {
    wordCount: number;
    headingsStructure: { h1: number; h2: number; h3: number };
    imagesWithAlt: number;
    imagesWithoutAlt: number;
    internalLinks: number;
    externalLinks: number;
    score: number;
  };
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    title: string;
    description: string;
    impact: string;
  }[];
}

export interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  auditScore: number;
  submittedAt: string;
}

export type AuditStage =
  | 'idle'
  | 'connecting'
  | 'scanning'
  | 'analyzing-competitors'
  | 'checking-seo'
  | 'building-report'
  | 'complete';
