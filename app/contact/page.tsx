// src/app/contact/page.tsx
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Contact Me</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Interested in working together or have a question about DevOps? 
        Feel free to reach out.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>your.email@example.com</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
            <Phone className="h-5 w-5 text-blue-600" />
            <span>+84 123 456 789</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Ho Chi Minh City, Vietnam</span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-slate-900"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-slate-900"
              placeholder="Let's talk about infrastructure..."
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}