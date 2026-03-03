import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Environment',
    metric: '-50%',
    subtitle: 'UK emissions since 1990 — but species at 68% of 1970 abundance',
  });
}
