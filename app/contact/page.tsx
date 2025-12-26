import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên hệ - Portfolio',
  description: 'Liên hệ với tôi về các cơ hội hợp tác hoặc câu hỏi về DevOps',
};

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">CONTACT</h1>
      <p className="text-gray-600 dark:text-gray-300">
      "I am currently open to new opportunities. If you think I'd be a good fit for your team, please get in touch."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>nguyenkhanhhuan2004@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
            <Phone className="h-5 w-5 text-blue-600" />
            <span>+84 325 722 155</span>
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
              placeholder="youremail@.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Tin nhắn</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-slate-900"
              placeholder="Hãy cho tôi biết bạn muốn trao đổi về gì..."
              required
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