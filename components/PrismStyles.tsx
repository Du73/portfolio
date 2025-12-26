'use client';

import { useEffect } from 'react';

export default function PrismStyles() {
  useEffect(() => {
    // Load Prism CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    document.head.appendChild(link);

    // Load Prism JS and highlight code
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
    script.async = true;
    script.onload = () => {
      // Load languages
      const languages = ['javascript', 'java', 'bash', 'json', 'yaml', 'typescript', 'markup', 'css'];
      languages.forEach((lang) => {
        const langScript = document.createElement('script');
        langScript.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
        langScript.async = true;
        document.body.appendChild(langScript);
      });

      // Highlight all code blocks after languages are loaded
      setTimeout(() => {
        if ((window as any).Prism) {
          (window as any).Prism.highlightAll();
        }
      }, 500);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Re-highlight when route changes
  useEffect(() => {
    const highlightCode = () => {
      if ((window as any).Prism) {
        (window as any).Prism.highlightAll();
      }
    };

    // Initial highlight
    highlightCode();

    // Re-highlight after a delay to ensure DOM is ready
    const timer = setTimeout(highlightCode, 100);

    return () => clearTimeout(timer);
  });

  return null;
}

