import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Immigration',
    metric: '906K',
    subtitle: 'estimated net migration to the UK, year ending June 2024',
  });
}
