'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Clock, 
  PenSquare,
  Calendar, 
  Share2, 
  Link as LinkIcon,
  ChevronRight
} from 'lucide-react';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import NotFound from '@/components/shared/NotFound';
import blogData from '@/data/blog.json';
import navigationData from '@/data/navigation.json';
import { useState, useEffect } from 'react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copyText, setCopyText] = useState('Copy Link');
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  
  const post = blogData.blog.posts.find((p) => p.slug === slug);

  useEffect(() => {
    // Check if Blog is enabled in navigation
    const resourcesLink = navigationData.header.links.find((l: any) => l.label === 'Resources');
    const blogItem = resourcesLink?.items.find((item: any) => item.label === 'Blog');
    const enabled = blogItem?.enabled !== false;
    
    setIsEnabled(enabled);
    setIsLoading(false);
  }, []);

  // Show loading state while checking
  if (isLoading) {
    return <div className="min-h-screen bg-pageBg" />;
  }

  // Show 404 if Blog is disabled
  if (!isEnabled) {
    return <NotFound />;
  }

  if (!post) {
    return <NotFound />;
  }

  const headingRegex = /<h2>(.*?)<\/h2>/g;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    headings.push(match[1]);
  }

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyText('Link Copied!');
    setTimeout(() => {
      setCopyText('Copy Link');
    }, 2000);
  };

  return (
    <>
      <section className="min-h-screen bg-pageBg pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
            
            <div className="w-full lg:w-[70%]">
              <div className="mb-4 sm:mb-6 lg:mb-4">
                <Link href="/blog" className="inline-flex items-center gap-1 text-sm sm:text-base text-text-muted hover:text-brand transition-colors">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Blog
                </Link>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-3 sm:mb-4 leading-tight"
              >
                {post.title}
              </motion.h1>

              <p className="text-base sm:text-lg text-text-muted mb-4 sm:mb-6 leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <PenSquare className="w-4 h-4 text-text-muted" />
                  <span className="text-xs sm:text-sm text-text-muted font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-muted">
                  <Calendar className="w-4 h-4 text-text-muted" />
                  <span>{formatDate(post.publishedDate)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-muted">
                  <Clock className="w-4 h-4 text-text-muted" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-cardBg mb-6 sm:mb-8">
                <img 
                  src={post.bannerImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>

              <div 
                className="blog-post-content text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            <div className="w-full lg:w-[30%] lg:sticky lg:top-24 lg:self-start">
              {headings.length > 0 && (
                <Card className="hidden md:block p-4 sm:p-6 mb-4 sm:mb-6">
                  <h4 className="text-sm font-semibold text-text-heading mb-3 sm:mb-4">Table of Contents</h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {headings.map((heading, index) => (
                      <li key={index}>
                        <a 
                          href={`#heading-${index}`}
                          className="text-xs sm:text-sm text-text-muted hover:text-brand transition-colors block py-1 border-b border-white/5 last:border-0"
                          onClick={(e) => {
                            e.preventDefault();
                            const elements = document.querySelectorAll('.blog-post-content h2');
                            if (elements[index]) {
                              elements[index].scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          {heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              <Card className="p-4 sm:p-6">
                <h4 className="text-sm font-semibold text-text-heading mb-3 sm:mb-4">Share this article</h4>
                <div className="space-y-2">
                  <Card className="p-0 hover:border-white/20 transition-colors cursor-pointer">
                    <button className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg text-text-body">
                      <FaTwitter className="w-4 h-4 text-text-muted" />
                      <span className="text-xs sm:text-sm hidden sm:inline">Share on Twitter</span>
                      <span className="text-xs sm:text-sm sm:hidden">Twitter</span>
                    </button>
                  </Card>
                  <Card className="p-0 hover:border-white/20 transition-colors cursor-pointer">
                    <button className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg text-text-body">
                      <FaFacebook className="w-4 h-4 text-text-muted" />
                      <span className="text-xs sm:text-sm hidden sm:inline">Share on Facebook</span>
                      <span className="text-xs sm:text-sm sm:hidden">Facebook</span>
                    </button>
                  </Card>
                  <Card className="p-0 hover:border-white/20 transition-colors cursor-pointer">
                    <button className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg text-text-body">
                      <FaLinkedin className="w-4 h-4 text-text-muted" />
                      <span className="text-xs sm:text-sm hidden sm:inline">Share on LinkedIn</span>
                      <span className="text-xs sm:text-sm sm:hidden">LinkedIn</span>
                    </button>
                  </Card>
                  <Card 
                    className="p-0 hover:border-white/20 transition-colors cursor-pointer"
                    onClick={copyLink}
                  >
                    <button className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 rounded-lg text-text-body">
                      <LinkIcon className="w-4 h-4 text-text-muted" />
                      <span className="text-xs sm:text-sm">{copyText}</span>
                    </button>
                  </Card>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}