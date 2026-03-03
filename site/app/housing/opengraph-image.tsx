import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Housing',
    metric: '7.7x',
    subtitle: 'house price to earnings ratio in England',
  });
}
