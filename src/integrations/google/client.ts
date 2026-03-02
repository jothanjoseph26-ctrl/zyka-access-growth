import type { GoogleBusinessProfile, GoogleBusinessConfig, Post, Review, Photo } from './types';

const BASE_URL = 'https://mybusiness.googleapis.com/v4';

export class GoogleBusinessClient {
  private accessToken: string;
  private config: GoogleBusinessConfig;

  constructor(accessToken: string, config: GoogleBusinessConfig) {
    this.accessToken = accessToken;
    this.config = config;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Google Business API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getAccount(): Promise<{ account: { name: string; accountId: string } }> {
    return this.request('/accounts');
  }

  async getLocations(): Promise<{ locations: GoogleBusinessProfile[] }> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations`);
  }

  async getLocation(locationId: string): Promise<GoogleBusinessProfile> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}`);
  }

  async updateLocation(locationId: string, data: Partial<GoogleBusinessProfile>): Promise<GoogleBusinessProfile> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getReviews(locationId: string): Promise<{ reviews: Review[] }> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/reviews`);
  }

  async replyToReview(locationId: string, reviewId: string, comment: string): Promise<Review> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/reviews/${reviewId}/reply`, {
      method: 'PUT',
      body: JSON.stringify({ comment }),
    });
  }

  async getPosts(locationId: string): Promise<{ posts: Post[] }> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/posts`);
  }

  async createPost(locationId: string, post: Partial<Post>): Promise<Post> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/posts`, {
      method: 'POST',
      body: JSON.stringify({ post: post }),
    });
  }

  async deletePost(locationId: string, postId: string): Promise<void> {
    await this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async getPhotos(locationId: string): Promise<{ photos: Photo[] }> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/media`);
  }

  async uploadPhoto(locationId: string, photo: { category: string; mediaUri: string }): Promise<Photo> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/media`, {
      method: 'POST',
      body: JSON.stringify(photo),
    });
  }

  async deletePhoto(locationId: string, photoId: string): Promise<void> {
    await this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}/media/${photoId}`, {
      method: 'DELETE',
    });
  }

  async updateHours(locationId: string, hours: Record<string, unknown>): Promise<GoogleBusinessProfile> {
    return this.request(`/accounts/${this.config.businessAccountId}/locations/${locationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ regularHours: hours }),
    });
  }
}

export async function getAccessToken(refreshToken: string, clientId: string, clientSecret: string): Promise<string> {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export function createGoogleBusinessClient(config: GoogleBusinessConfig, accessToken: string): GoogleBusinessClient {
  return new GoogleBusinessClient(accessToken, config);
}
