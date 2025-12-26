import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import BlogFilter from '@/components/BlogFilter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Java & JavaScript Network Programming',
  description: 'Blog về lập trình mạng với Java và JavaScript. Chia sẻ kiến thức về Socket Programming, RESTful API, WebSocket, và nhiều chủ đề khác.',
};

export default function Blog() {
  const allPostsData = getSortedPostsData();
  const allTags = Array.from(new Set(allPostsData.flatMap(post => post.tags || [])));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Chia sẻ kiến thức về lập trình mạng với Java & JavaScript
      </p>
      
      <BlogFilter posts={allPostsData} allTags={allTags} />
    </div>
  );
}