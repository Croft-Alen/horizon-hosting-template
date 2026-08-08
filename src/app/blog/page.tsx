'use client';

import { useState, useMemo, useEffect } from 'react';
import BlogHero from '@/components/sections/blog/BlogHero';
import BlogFilters from '@/components/sections/blog/BlogFilters';
import BlogCard from '@/components/sections/blog/BlogCard';
import CTA from '@/components/sections/home/CTA';
import NotFound from '@/components/shared/NotFound';
import blogData from '@/data/blog.json';
import navigationData from '@/data/navigation.json';

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  const posts = blogData.blog.posts;

  useEffect(() => {
    // Check if Blog is enabled in navigation
    const resourcesLink = navigationData.header.links.find((l: any) => l.label === 'Resources');
    const blogItem = resourcesLink?.items.find((item: any) => item.label === 'Blog');
    const enabled = blogItem?.enabled !== false;
    
    setIsEnabled(enabled);
    setIsLoading(false);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const tagMatch = selectedTag === 'all' || post.tags.includes(selectedTag);
      
      const searchMatch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      return tagMatch && searchMatch;
    });
  }, [selectedTag, searchQuery, posts]);

  // Show loading state while checking
  if (isLoading) {
    return <div className="min-h-screen bg-pageBg" />;
  }

  // Show 404 if Blog is disabled
  if (!isEnabled) {
    return <NotFound />;
  }

  return (
    <>
      <BlogHero />
      <BlogFilters 
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <section className="py-12 bg-pageBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <CTA />
    </>
  );
}