import { generateOgImage, size, contentType } from '@/lib/og';

export const runtime = 'edge';
export { size, contentType };

export default function Image() {
  return generateOgImage({});
}
