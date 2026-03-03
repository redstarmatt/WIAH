import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Social Care',
    metric: '13.2K',
    subtitle: 'patients delayed in hospital each day waiting for social care',
  });
}
