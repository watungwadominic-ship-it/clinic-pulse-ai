import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOMetadataProps {
  title: string;
  description: string;
  type?: 'website' | 'article';
  schema?: Record<string, any> | Record<string, any>[];
}

export default function SEOMetadata({
  title,
  description,
  type = 'website',
  schema
}: SEOMetadataProps) {
  const location = useLocation();
  const currentUrl = `https://clinic-pulse-ai.vercel.app${location.pathname}${location.search}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to manage standard meta tags
    const updateMetaTag = (selectors: string, attributes: Record<string, string>) => {
      let element = document.querySelector(selectors);
      if (!element) {
        element = document.createElement('meta');
        Object.entries(attributes).forEach(([key, value]) => {
          element?.setAttribute(key, value);
        });
        document.head.appendChild(element);
      } else {
        Object.entries(attributes).forEach(([key, value]) => {
          element?.setAttribute(key, value);
        });
      }
    };

    // 3. Helper to manage link tags (canonical URL)
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        element.setAttribute('href', href);
        document.head.appendChild(element);
      } else {
        element.setAttribute('href', href);
      }
    };

    // 4. Update Meta tags
    updateMetaTag('meta[name="description"]', { name: 'description', content: description });
    updateMetaTag('meta[name="keywords"]', { 
      name: 'keywords', 
      content: 'clinic pulse, dental roi calculator, medical revenue leak, clinic no-shows, practice automation, medical automation security, hipaa compliant scheduler, anolla, medical operations' 
    });

    // 5. Update Open Graph Tags (for rich social/Google search embeds)
    updateMetaTag('meta[property="og:title"]', { property: 'og:title', content: title });
    updateMetaTag('meta[property="og:description"]', { property: 'og:description', content: description });
    updateMetaTag('meta[property="og:type"]', { property: 'og:type', content: type });
    updateMetaTag('meta[property="og:url"]', { property: 'og:url', content: currentUrl });
    updateMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: 'ClinicPulse AI' });
    updateMetaTag('meta[property="og:image"]', { property: 'og:image', content: 'https://clinic-pulse-ai.vercel.app/logo.svg' });

    // 6. Update Canonical URL
    updateLinkTag('canonical', currentUrl);

    // 7. Inject & Update JSON-LD Script
    // Remove any existing dynamic schema script first
    const existingSchemaScript = document.getElementById('dynamic-seo-schema');
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'dynamic-seo-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount or update
    return () => {
      const exitingScript = document.getElementById('dynamic-seo-schema');
      if (exitingScript) {
        exitingScript.remove();
      }
    };
  }, [title, description, type, currentUrl, schema]);

  return null; // Side-effect only component
}
