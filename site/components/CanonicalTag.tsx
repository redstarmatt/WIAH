'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const BASE_URL = 'https://www.wiah.uk';

export default function CanonicalTag() {
  const pathname = usePathname();

  useEffect(() => {
    const canonical = `${BASE_URL}${pathname}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }, [pathname]);

  return null;
}
