import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'What is actually happening?',
    short_name: 'WIAH',
    description: 'The real state of the UK — visible, understandable, shareable.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0D1117',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
