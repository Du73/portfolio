import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="space-y-6">
        {allPostsData.map(({ id, date, title, description, tags }) => (
          <div key={id} className="block group border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0">
            <p className="text-sm text-gray-500 mb-1">{date}</p>
            <Link href={`/blog/${id}`}>
              <h2 className="text-xl font-bold group-hover:text-blue-600 transition mb-2">{title}</h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{description}</p>
            <div className="flex gap-2">
                {tags?.map(tag => (
                   <span key={tag} className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">#{tag}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}