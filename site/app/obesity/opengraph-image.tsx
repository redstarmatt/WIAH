import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Obesity',
    metric: '26%',
    subtitle: 'of UK adults are obese, double the rate of 30 years ago',
  });
}
