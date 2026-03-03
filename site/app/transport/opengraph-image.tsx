import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Transport',
    metric: '86%',
    subtitle: 'of trains arrived on time — down from 90% a decade ago',
  });
}
