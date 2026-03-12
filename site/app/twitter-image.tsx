import { generateOgImage, size, contentType } from '@/lib/og';

export { size, contentType };

export default function Image() {
  return generateOgImage({});
}
