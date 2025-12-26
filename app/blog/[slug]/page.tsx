import { getPostData, getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Hàm này giữ nguyên, không cần sửa
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

// Cập nhật kiểu dữ liệu cho params là Promise
type Props = {
  params: Promise<{ slug: string }>
}

export default async function Post({ params }: Props) {
  // BƯỚC QUAN TRỌNG: Phải await params trước khi dùng
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Sau khi có slug chính xác, mới gọi hàm lấy dữ liệu
  const postData = await getPostData(slug);

  return (
    <article>
      <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6">
        <ArrowLeft size={16} className="mr-1" /> Back to Blog
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{postData.title}</h1>
      
      <div className="flex items-center text-gray-500 text-sm mb-8 space-x-4">
        <time>{postData.date}</time>
        <span>•</span>
        <div className="flex gap-2">
            {postData.tags?.map((tag: string) => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">#{tag}</span>
            ))}
        </div>
      </div>
      
      <div 
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
      />
    </article>
  );
}