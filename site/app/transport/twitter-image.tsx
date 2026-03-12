import { generateOgImage, size, contentType } from '@/lib/og';
import { getOgMetrics } from '@/lib/og-metrics';

export { size, contentType };

export default function Image() {
  const { metric, subtitle } = getOgMetrics('transport');
  return generateOgImage({
    topic: 'Transport',
    metric,
    subtitle,
  });
}
