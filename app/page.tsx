import Link from 'next/link';
import { ArrowRight, Server, Cloud, Terminal, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - DevOps Engineer Portfolio',
  description: 'Portfolio của DevOps Engineer - Chuyên về automation, cloud computing, và containerization',
};

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-center py-12 space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Hi, I'm <span className="text-blue-600">Nguyen Khanh Huan</span>. <br />
        DevOps Enthusiast focused on AWS, IaC, and CI/CD automation.
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
        I bridge the gap between development and operations. Passionate about automating infrastructure, optimizing CI/CD pipelines, and cloud computing.
      </p>
      
      <div className="flex flex-wrap gap-4">  
        <Link href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center">
          View Projects <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <Link href="/blog" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center">
          Read Blog <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        <a 
          href="/cv.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition flex items-center"
        >
          View CV <FileText className="ml-2 h-4 w-4" />
        </a>
        <Link href="/about" className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition">
          More About Me
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
        {[
          { icon: Terminal, title: "Infrastructure as Code", desc: "Terraform, Ansible" },
          { icon: Server, title: "Containerization", desc: "Docker, Kubernetes" },
          { icon: Cloud, title: "Cloud Services", desc: "AWS, Azure" },
        ].map((item, index) => (
          <div key={index} className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-slate-900">
            <item.icon className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}