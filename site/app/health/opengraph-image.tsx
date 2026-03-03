import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Health',
    metric: '7.6M',
    subtitle: 'people on the NHS waiting list',
  });
}
