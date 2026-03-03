import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Broadband & Digital',
    metric: '126 Mbps',
    subtitle: 'median speed — up 8× since 2013, but 2M adults never online',
  });
}
