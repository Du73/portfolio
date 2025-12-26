import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Rental Room Management System (DevOps)",
    description: "Deployed a full-stack Flutter & .NET Core application. Setup CI/CD pipeline using GitHub Actions to build Docker images and deploy to an AWS EC2 instance. Configured Nginx as a Reverse Proxy.",
    tags: ["Docker", "GitHub Actions", "AWS", "Nginx", ".NET Core"],
    github: "https://github.com/yourusername/project1",
    demo: "#"
  },
  {
    title: "Automated K8s Cluster on Local",
    description: "Provisioned a local Kubernetes cluster using Vagrant and Ansible. Implemented monitoring with Prometheus and Grafana dashboards.",
    tags: ["Kubernetes", "Ansible", "Vagrant", "Monitoring"],
    github: "https://github.com/yourusername/project2",
    demo: "#"
  }
];

export default function Projects() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition bg-white dark:bg-slate-900">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <div className="flex space-x-2">
                <a href={project.github} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"><Github size={20} /></a>
                <a href={project.demo} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"><ExternalLink size={20} /></a>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 text-xs rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}