export interface SEOPageConfig {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export interface StructuredData {
  id: string;
  type: 'Organization' | 'LocalBusiness' | 'WebSite' | 'Article' | 'Product' | 'Review' | 'FAQ';
  data: Record<string, unknown>;
}

export interface SEOConfig {
  pages: SEOPageConfig[];
  globalScripts?: string;
  analyticsId?: string;
  verificationCodes?: Record<string, string>;
}
