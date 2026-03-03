import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Poverty',
    metric: '3.4M',
    subtitle: 'children in poverty — and 3.1M emergency food parcels a year',
  });
}
