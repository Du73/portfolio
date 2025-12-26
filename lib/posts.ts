// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostData {
  id: string;
  date: string;
  title: string;
  description?: string;
  tags?: string[];
  contentHtml?: string;
}

export function getSortedPostsData(): PostData[] {
  // Tạo thư mục nếu chưa có để tránh lỗi
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; description: string; tags: string[] }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Extract language info from markdown code blocks before processing
  // This regex finds ```language and preserves it
  let processedMarkdown = matterResult.content;

  // Use remark-rehype to convert markdown to HTML with proper code block handling
  // This preserves language information from fenced code blocks (```java)
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMarkdown);
  
  let contentHtml = processedContent.toString();

  // Post-process: Ensure code blocks have language classes for Prism.js
  // rehype should automatically add language-* classes, but we'll verify and fix if needed
  
  // Add language classes to code blocks that don't have them
  contentHtml = contentHtml.replace(
    /<pre><code(?!\s+class="language-)([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (match, attrs, code) => {
      return `<pre><code class="language-text"${attrs || ''}>${code}</code></pre>`;
    }
  );

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; description: string; tags: string[] }),
  };
}