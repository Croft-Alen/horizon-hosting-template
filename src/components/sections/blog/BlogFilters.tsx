'use client';

import { Search } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import blogData from '@/data/blog.json';

interface BlogFiltersProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function BlogFilters({
  selectedTag,
  setSelectedTag,
  searchQuery,
  setSearchQuery
}: BlogFiltersProps) {
  const tags = blogData.blog.tags.filter((t) => t.enabled);

  return (
    <section className="py-5 bg-pageBg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className="focus:outline-none"
              >
                <Tag 
                  variant={selectedTag === tag.id ? 'brand' : 'dark'}
                  className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {tag.name}
                </Tag>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-cardBg border border-white/10 rounded-full text-text-body placeholder-text-muted text-sm focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}