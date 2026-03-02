import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Star, MapPin, Phone, Globe, Clock, Image, Send, RefreshCw } from 'lucide-react';
import type { GoogleBusinessProfile, Post, Review, BusinessHours } from '../integrations/google/types';

const mockBusiness: GoogleBusinessProfile = {
  id: '1',
  name: 'Zyka Credit',
  url: 'https://business.google.com/zykacredit',
  address: {
    addressLines: ['123 Main St'],
    locality: 'New York',
    region: 'NY',
    postalCode: '10001',
    country: 'US',
  },
  phoneNumber: '+1 (555) 123-4567',
  websiteUrl: 'https://zykacredit.com',
  rating: 4.8,
  reviewCount: 156,
  hours: {
    monday: { openTime: '09:00', closeTime: '18:00' },
    tuesday: { openTime: '09:00', closeTime: '18:00' },
    wednesday: { openTime: '09:00', closeTime: '18:00' },
    thursday: { openTime: '09:00', closeTime: '18:00' },
    friday: { openTime: '09:00', closeTime: '18:00' },
    saturday: { openTime: '10:00', closeTime: '16:00' },
    sunday: null,
  },
  posts: [
    {
      id: '1',
      summary: 'Special financing offers available! Get approved today with low interest rates.',
      callToAction: { type: 'SIGN_UP', url: 'https://zykacredit.com/apply' },
      publishTime: '2025-02-20T10:00:00Z',
      state: 'LIVE',
    },
  ],
  reviews: [
    {
      id: '1',
      starRating: 5,
      comment: 'Great service! The team helped me get approved quickly.',
      createTime: '2025-02-15T14:30:00Z',
      reviewer: { displayName: 'John D.', profilePhotoUrl: '' },
      reply: { comment: 'Thank you for the review, John!', updateTime: '2025-02-15T16:00:00Z' },
    },
    {
      id: '2',
      starRating: 4,
      comment: 'Good experience overall. Would recommend.',
      createTime: '2025-02-10T09:15:00Z',
      reviewer: { displayName: 'Sarah M.', profilePhotoUrl: '' },
    },
  ],
};

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

export default function GoogleBusinessManager() {
  const [business, setBusiness] = useState<GoogleBusinessProfile>(mockBusiness);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPost, setNewPost] = useState({ summary: '', ctaType: 'SIGN_UP', ctaUrl: '' });
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('overview');

  const handleConnect = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsConnected(true);
    setIsLoading(false);
  };

  const handleReply = async (reviewId: string) => {
    if (!replyText[reviewId]?.trim()) return;
    const updatedReviews = business.reviews?.map(r =>
      r.id === reviewId ? { ...r, reply: { comment: replyText[reviewId], updateTime: new Date().toISOString() } } : r
    );
    setBusiness({ ...business, reviews: updatedReviews });
    setReplyText({ ...replyText, [reviewId]: '' });
  };

  const handleCreatePost = () => {
    if (!newPost.summary.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      summary: newPost.summary,
      callToAction: newPost.ctaUrl ? { type: newPost.ctaType as Post['callToAction']['type'], url: newPost.ctaUrl } : undefined,
      publishTime: new Date().toISOString(),
      state: 'LIVE',
    };
    setBusiness({ ...business, posts: [...(business.posts || []), post] });
    setNewPost({ summary: '', ctaType: 'SIGN_UP', ctaUrl: '' });
  };

  const handleDeletePost = (postId: string) => {
    setBusiness({ ...business, posts: business.posts?.filter(p => p.id !== postId) });
  };

  const updateHours = (day: string, field: 'openTime' | 'closeTime', value: string) => {
    const currentHours = business.hours?.[day] || { openTime: '09:00', closeTime: '17:00' };
    const updatedHours: BusinessHours = {
      ...business.hours,
      [day]: { ...currentHours, [field]: value },
    };
    setBusiness({ ...business, hours: updatedHours });
  };

  const toggleDay = (day: string, isOpen: boolean) => {
    const updatedHours: BusinessHours = {
      ...business.hours,
      [day]: isOpen ? { openTime: '09:00', closeTime: '17:00' } : null,
    };
    setBusiness({ ...business, hours: updatedHours });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Google Business Profile</h1>
          <p className="text-muted-foreground">Manage your business presence on Google</p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Badge variant="default" className="bg-green-600">
              <Globe className="mr-1 h-3 w-3" />
              Connected
            </Badge>
          ) : (
            <Badge variant="secondary">Not Connected</Badge>
          )}
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : isConnected ? <RefreshCw className="mr-2 h-4 w-4" /> : null}
            {isConnected ? 'Sync' : 'Connect Google'}
          </Button>
        </div>
      </div>

      {!isConnected ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Your Business</CardTitle>
            <CardDescription>Link your Google Business Profile to manage it here</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Google Client ID</Label>
              <Input placeholder="Enter your Google Client ID" type="password" />
            </div>
            <div className="grid gap-2">
              <Label>Google Client Secret</Label>
              <Input placeholder="Enter your Google Client Secret" type="password" />
            </div>
            <p className="text-sm text-muted-foreground">
              You'll need to create a project in Google Cloud Console and enable the My Business API.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="info">Business Info</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Rating</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    {business.rating} <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Reviews</CardDescription>
                  <CardTitle className="text-3xl">{business.reviewCount}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Active Posts</CardDescription>
                  <CardTitle className="text-3xl">{business.posts?.length || 0}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{business.address.addressLines.join(', ')}, {business.address.locality}, {business.address.region} {business.address.postalCode}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{business.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <a href={business.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {business.websiteUrl}
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Business Name</Label>
                  <Input value={business.name} onChange={e => setBusiness({ ...business, name: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Phone Number</Label>
                  <Input value={business.phoneNumber || ''} onChange={e => setBusiness({ ...business, phoneNumber: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Website URL</Label>
                  <Input value={business.websiteUrl || ''} onChange={e => setBusiness({ ...business, websiteUrl: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Street Address</Label>
                  <Input value={business.address.addressLines[0]} onChange={e => setBusiness({
                    ...business,
                    address: { ...business.address, addressLines: [e.target.value] }
                  })} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>City</Label>
                    <Input value={business.address.locality} onChange={e => setBusiness({
                      ...business,
                      address: { ...business.address, locality: e.target.value }
                    })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>State</Label>
                    <Input value={business.address.region} onChange={e => setBusiness({
                      ...business,
                      address: { ...business.address, region: e.target.value }
                    })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>ZIP</Label>
                    <Input value={business.address.postalCode} onChange={e => setBusiness({
                      ...business,
                      address: { ...business.address, postalCode: e.target.value }
                    })} />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {days.map(day => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={business.hours?.[day] !== null}
                        onCheckedChange={checked => toggleDay(day, checked)}
                      />
                      <span className="w-24 capitalize">{day}</span>
                    </div>
                    {business.hours?.[day] ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          className="w-32"
                          value={business.hours[day]?.openTime || '09:00'}
                          onChange={e => updateHours(day, 'openTime', e.target.value)}
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          className="w-32"
                          value={business.hours[day]?.closeTime || '17:00'}
                          onChange={e => updateHours(day, 'closeTime', e.target.value)}
                        />
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Closed</span>
                    )}
                  </div>
                ))}
                <Button>Save Hours</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Post Summary</Label>
                  <Textarea
                    value={newPost.summary}
                    onChange={e => setNewPost({ ...newPost, summary: e.target.value })}
                    placeholder="What's happening with your business?"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Call to Action</Label>
                    <Select value={newPost.ctaType} onValueChange={v => setNewPost({ ...newPost, ctaType: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LEARN_MORE">Learn More</SelectItem>
                        <SelectItem value="BOOK">Book</SelectItem>
                        <SelectItem value="ORDER">Order</SelectItem>
                        <SelectItem value="SIGN_UP">Sign Up</SelectItem>
                        <SelectItem value="CALL_NOW">Call Now</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>CTA URL</Label>
                    <Input
                      value={newPost.ctaUrl}
                      onChange={e => setNewPost({ ...newPost, ctaUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <Button onClick={handleCreatePost}>
                  <Plus className="mr-2 h-4 w-4" />
                  Publish Post
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Posts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.posts?.map(post => (
                  <Card key={post.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <p>{post.summary}</p>
                        {post.callToAction && (
                          <Badge variant="outline">
                            {post.callToAction.type.replace('_', ' ')}: {post.callToAction.url}
                          </Badge>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Posted: {new Date(post.publishTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={post.state === 'LIVE' ? 'default' : 'secondary'}>{post.state}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {business.reviews?.map(review => (
                  <Card key={review.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {review.reviewer.displayName[0]}
                        </div>
                        <div>
                          <p className="font-medium">{review.reviewer.displayName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.createTime).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.starRating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                    {review.comment && <p className="mb-3">{review.comment}</p>}
                    {review.reply ? (
                      <div className="ml-4 pl-4 border-l-2 border-muted">
                        <p className="text-sm text-muted-foreground">Your reply:</p>
                        <p>{review.reply.comment}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Reply to this review..."
                          value={replyText[review.id] || ''}
                          onChange={e => setReplyText({ ...replyText, [review.id]: e.target.value })}
                        />
                        <Button size="sm" onClick={() => handleReply(review.id)}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
