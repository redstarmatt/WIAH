import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Justice',
    metric: '5.6%',
    subtitle: 'of crimes result in a charge',
  });
}
