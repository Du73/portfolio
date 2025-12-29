import type { Metadata } from 'next';
import { FileText, Download } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Giới thiệu - Portfolio',
  description: 'Thông tin về tôi, kỹ năng kỹ thuật và chứng chỉ trong lĩnh vực DevOps',
};

export default function About() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">INTRODUCTION</h1>
      
      {/* Profile Image and Introduction */}
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="flex-shrink-0">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow-lg">
            <Image
              src="/profile.jpg"
              alt="Nguyen Khanh Huan - DevOps Engineer"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            "I am a final-year student at HCM University of Technology(HUTECH). I am passionate about automation, cloud computing, and containerization. Focusing on Infrastructure as Code and Automation. Dedicated to building scalable systems that maximize reliability and developer efficiency"
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">SKILLS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">Cloud & Infrastructure</h3>
            <p>AWS (EC2, S3, RDS), Terraform, Ansible, Linux (Ubuntu/CentOS)</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">Container & Orchestration</h3>
            <p>Docker, Docker Compose, Kubernetes (K8s), Helm</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">CI/CD & Monitoring</h3>
            <p>Jenkins, GitHub Actions, Prometheus, Grafana, ELK Stack</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <h3 className="font-semibold text-blue-600 mb-2">Programming & Scripting</h3>
            <p>Python, Bash Shell, JavaScript/TypeScript, SQL</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border-l-4 border-blue-600">
            <h3 className="font-semibold text-blue-600 mb-2">AWS Solutions Architect Associate (SAA)</h3>
            <p className="text-gray-600 dark:text-gray-400">Amazon Web Services</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Designing and deploying scalable, highly available, and fault-tolerant systems on AWS</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border-l-4 border-green-600">
            <h3 className="font-semibold text-green-600 mb-2">TOEIC 825</h3>
            <p className="text-gray-600 dark:text-gray-400">ETS (Educational Testing Service)</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Test of English for International Communication - Score: 825</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">RESUME</h2>
        <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Curriculum Vitae</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View or download my resume</p>
              </div>
            </div>
            <div className="flex gap-3 ml-auto">
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                <FileText size={18} />
                View CV
              </a>
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <Download size={18} />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">CONTACT</h2>
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-gray-100">Email:</strong>{' '}
            <a href="mailto:nguyenkhanhhuan2004@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">
              nguyenkhanhhuan2004@gmail.com
            </a>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-gray-100">GitHub:</strong>{' '}
            <a 
              href="https://github.com/Du73" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              github.com/Du73
            </a>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong className="text-gray-900 dark:text-gray-100">LinkedIn:</strong>{' '}
            <a 
              href="https://www.linkedin.com/in/hu%C3%A2n-kh%C3%A1nh-4532aa313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              linkedin.com/in/huan-khanh-4532aa313
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}