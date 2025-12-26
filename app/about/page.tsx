export default function About() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">About Me</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        I am a final-year student specializing in DevOps engineering. My focus is on creating reliable, scalable infrastructure and automating deployment processes to improve developer productivity.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
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
    </div>
  );
}