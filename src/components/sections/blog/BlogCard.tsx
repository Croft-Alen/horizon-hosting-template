'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, PenSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    description: string;
    author: string;
    authorImage: string;
    bannerImage: string;
    publishedDate: string;
    readTime: number;
    tags: string[];
  };
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <Card className="overflow-hidden hover:border-white/20 transition-all duration-300 h-full flex flex-col p-0">
          
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-cardBg flex-shrink-0">
            <img 
              src={post.bannerImage} 
              alt={post.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PenSquare className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-xs sm:text-sm text-text-muted">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-text-muted">
                <Clock className="w-3 h-3 text-text-muted" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-text-heading mb-1.5 group-hover:text-brand transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm sm:text-base text-text-muted line-clamp-2 flex-grow">
              {post.description}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}