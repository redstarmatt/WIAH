import { generateOgImage, size, contentType, runtime } from '@/lib/og';

export { runtime, size, contentType };

export default function Image() {
  return generateOgImage({
    topic: 'Education',
    metric: '21.2%',
    subtitle: 'of pupils persistently absent from school',
  });
}
