export interface GoogleBusinessProfile {
  id: string;
  name: string;
  url: string;
  address: Address;
  phoneNumber?: string;
  websiteUrl?: string;
  rating?: number;
  reviewCount?: number;
  hours?: BusinessHours;
  photos?: Photo[];
  posts?: Post[];
  reviews?: Review[];
}

export interface Address {
  addressLines: string[];
  locality: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface BusinessHours {
  [day: string]: { openTime: string; closeTime: string } | null;
}

export interface Photo {
  id: string;
  url: string;
  name: string;
  category: 'exterior' | 'interior' | 'logo' | 'team' | 'product' | 'other';
}

export interface Post {
  id: string;
  summary?: string;
  callToAction?: {
    type: 'LEARN_MORE' | 'BOOK' | 'ORDER' | 'SIGN_UP' | 'CALL_NOW';
    url: string;
  };
  media?: { url: string; mimeType: string }[];
  publishTime: string;
  state: 'LIVE' | 'DRAFT' | 'EXPIRED';
}

export interface Review {
  id: string;
  starRating: number;
  comment?: string;
  createTime: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  reply?: {
    comment: string;
    updateTime: string;
  };
}

export interface GoogleBusinessConfig {
  clientId: string;
  clientSecret: string;
  refreshToken?: string;
  businessAccountId?: string;
}
