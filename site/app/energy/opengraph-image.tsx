import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Energy',
    metric: '45%',
    subtitle: 'of electricity now from renewables — up from 3% in 2000',
  });
}
