import { SITE_CONFIG } from './constants';

export function generateSEOMeta(title: string, description?: string) {
  const baseKeywords = [
    'Classdom',
    'online education',
    'classroom management',
    'middle-class education',
    'educational resources',
    'teacher resources',
    'Google Classroom',
    'remote learning',
    'digital classroom',
    'educational technology'
  ];

  return {
    title: `${title} | ${SITE_CONFIG.name}`,
    description: description || SITE_CONFIG.description,
    keywords: baseKeywords.join(', '),
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description: description || SITE_CONFIG.description,
      site_name: SITE_CONFIG.name,
      type: 'website',
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description: description || SITE_CONFIG.description
    }
  };
}

export function generateStructuredData(page: {
  title: string;
  description: string;
  type: 'Article' | 'WebPage' | 'Product';
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": page.type,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": SITE_CONFIG.domain
    },
    "headline": page.title,
    "description": page.description,
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_CONFIG.domain}/logo.png`
      }
    }
  };

  if (page.type === 'Article') {
    return {
      ...baseData,
      "datePublished": page.datePublished,
      "dateModified": page.dateModified,
      "author": {
        "@type": "Person",
        "name": page.author
      }
    };
  }

  return baseData;
}