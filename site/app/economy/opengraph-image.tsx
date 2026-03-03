import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Economy',
    metric: '£527/wk',
    subtitle: 'median real weekly earnings, finally above pre-2008 levels',
  });
}
