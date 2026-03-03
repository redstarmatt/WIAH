import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Dashboard',
    metric: '20',
    subtitle: 'headline metrics across 10 topics — the state of the nation at a glance',
  });
}
