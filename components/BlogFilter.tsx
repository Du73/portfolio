'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PostData } from '@/lib/posts';

interface BlogFilterProps {
  posts: PostData[];
  allTags: string[];
}

export default function BlogFilter({ posts, allTags }: BlogFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts;

  return (
    <>
      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition ${
            selectedTag === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Tất cả ({posts.length})
        </button>
        {allTags.map(tag => {
          const count = posts.filter(post => post.tags?.includes(tag)).length;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              #{tag} ({count})
            </button>
          );
        })}
      </div>

      {/* Posts list */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ id, date, title, description, tags }) => (
            <div key={id} className="block group border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{date}</p>
              <Link href={`/blog/${id}`}>
                <h2 className="text-xl font-bold group-hover:text-blue-600 transition mb-2">{title}</h2>
              </Link>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{description}</p>
              <div className="flex gap-2">
                {tags?.map(tag => (
                  <span 
                    key={tag} 
                    className="text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTag(tag);
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            Không tìm thấy bài viết nào với tag này.
          </p>
        )}
      </div>
    </>
  );
}

