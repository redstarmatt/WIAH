import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Water',
    metric: '3.6M hrs',
    subtitle: 'of sewage discharged into rivers and seas',
  });
}
