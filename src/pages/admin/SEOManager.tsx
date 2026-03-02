import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, Eye, Code } from 'lucide-react';
import type { SEOPageConfig, StructuredData } from '@/integrations/seo/types';

const defaultPages: SEOPageConfig[] = [
  { path: '/', title: 'Home', description: '', keywords: [] },
  { path: '/about', title: 'About Us', description: '', keywords: [] },
  { path: '/solutions', title: 'Solutions', description: '', keywords: [] },
  { path: '/how-it-works', title: 'How It Works', description: '', keywords: [] },
  { path: '/contact', title: 'Contact', description: '', keywords: [] },
  { path: '/apply', title: 'Apply Now', description: '', keywords: [] },
];

const defaultStructuredData: StructuredData[] = [
  {
    id: '1',
    type: 'Organization',
    data: {
      name: 'Zyka Credit',
      url: 'https://zykacredit.com',
      logo: 'https://zykacredit.com/logo.png',
      description: 'Financial solutions for everyone'
    }
  },
  {
    id: '2',
    type: 'LocalBusiness',
    data: {
      name: 'Zyka Credit',
      address: {
        streetAddress: '',
        addressLocality: '',
        addressRegion: '',
        postalCode: '',
        addressCountry: 'US'
      },
      telephone: '',
      priceRange: '$$'
    }
  }
];

export default function SEOManager() {
  const [pages, setPages] = useState<SEOPageConfig[]>(defaultPages);
  const [structuredData, setStructuredData] = useState<StructuredData[]>(defaultStructuredData);
  const [selectedPage, setSelectedPage] = useState<SEOPageConfig>(defaultPages[0]);
  const [newKeyword, setNewKeyword] = useState('');
  const [activeTab, setActiveTab] = useState('pages');

  const updatePage = (field: keyof SEOPageConfig, value: unknown) => {
    const updated = pages.map(p => 
      p.path === selectedPage.path ? { ...p, [field]: value } : p
    );
    setPages(updated);
    setSelectedPage({ ...selectedPage, [field]: value });
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !selectedPage.keywords.includes(newKeyword.trim())) {
      updatePage('keywords', [...selectedPage.keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    updatePage('keywords', selectedPage.keywords.filter(k => k !== keyword));
  };

  const addStructuredData = (type: StructuredData['type']) => {
    const newData: StructuredData = {
      id: Date.now().toString(),
      type,
      data: {}
    };
    setStructuredData([...structuredData, newData]);
  };

  const removeStructuredData = (id: string) => {
    setStructuredData(structuredData.filter(s => s.id !== id));
  };

  const generateSitemap = () => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>https://zykacredit.com${page.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
    return sitemap;
  };

  const generateMetaTags = () => {
    const page = selectedPage;
    let tags = `<title>${page.title}</title>
<meta name="description" content="${page.description}">`;
    
    if (page.keywords.length > 0) {
      tags += `\n<meta name="keywords" content="${page.keywords.join(', ')}">`;
    }
    
    if (page.noIndex) {
      tags += `\n<meta name="robots" content="noindex, nofollow">`;
    }

    tags += `\n
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:type" content="website">`;
    
    if (page.ogImage) {
      tags += `\n<meta property="og:image" content="${page.ogImage}">`;
    }

    return tags;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">SEO Manager</h1>
          <p className="text-muted-foreground">Manage your site's search engine optimization</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">Page Meta</TabsTrigger>
          <TabsTrigger value="structured">Structured Data</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Pages</CardTitle>
                <CardDescription>Select a page to edit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {pages.map(page => (
                  <Button
                    key={page.path}
                    variant={selectedPage.path === page.path ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedPage(page)}
                  >
                    {page.path}
                    {page.noIndex && <Badge variant="secondary" className="ml-2">noindex</Badge>}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Meta Tags - {selectedPage.path}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Page Title</Label>
                  <Input
                    value={selectedPage.title}
                    onChange={e => updatePage('title', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Meta Description</Label>
                  <Textarea
                    value={selectedPage.description}
                    onChange={e => updatePage('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Keywords</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newKeyword}
                      onChange={e => setNewKeyword(e.target.value)}
                      placeholder="Add keyword"
                      onKeyDown={e => e.key === 'Enter' && addKeyword()}
                    />
                    <Button onClick={addKeyword} type="button">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPage.keywords.map(keyword => (
                      <Badge key={keyword} variant="outline" className="cursor-pointer" onClick={() => removeKeyword(keyword)}>
                        {keyword} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>OG Image URL</Label>
                  <Input
                    value={selectedPage.ogImage || ''}
                    onChange={e => updatePage('ogImage', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>No Index</Label>
                    <p className="text-sm text-muted-foreground">Hide from search engines</p>
                  </div>
                  <Switch
                    checked={selectedPage.noIndex || false}
                    onCheckedChange={checked => updatePage('noIndex', checked)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Canonical URL</Label>
                  <Input
                    value={selectedPage.canonicalUrl || ''}
                    onChange={e => updatePage('canonicalUrl', e.target.value)}
                    placeholder="https://zykacredit.com/page"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="structured" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>JSON-LD Structured Data</CardTitle>
              <CardDescription>Schema.org markup for rich search results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {(['Organization', 'LocalBusiness', 'WebSite', 'Article', 'Product', 'Review', 'FAQ'] as const).map(type => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => addStructuredData(type)}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    {type}
                  </Button>
                ))}
              </div>

              <div className="space-y-4 mt-4">
                {structuredData.map(item => (
                  <Card key={item.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge>{item.type}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => removeStructuredData(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={JSON.stringify(item.data, null, 2)}
                        onChange={e => {
                          try {
                            const updated = structuredData.map(s =>
                              s.id === item.id ? { ...s, data: JSON.parse(e.target.value) } : s
                            );
                            setStructuredData(updated);
                          } catch {}
                        }}
                        rows={8}
                        className="font-mono text-sm"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap Preview</CardTitle>
              <CardDescription>Auto-generated XML sitemap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download sitemap.xml
                </Button>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generateSitemap()}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Google Analytics ID</Label>
                <Input placeholder="G-XXXXXXXXXX" />
              </div>
              <div className="grid gap-2">
                <Label>Google Search Console Verification</Label>
                <Input placeholder="google-site-verification code" />
              </div>
              <div className="grid gap-2">
                <Label>Bing Webmaster Tools Verification</Label>
                <Input placeholder="Bing verification code" />
              </div>
              <div className="grid gap-2">
                <Label>Custom Scripts (Head)</Label>
                <Textarea placeholder="<script>...</script>" rows={4} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Download } from 'lucide-react';
