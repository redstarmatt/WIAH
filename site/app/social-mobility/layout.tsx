import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Mobility',
  description: 'Intergenerational social mobility in Britain has stalled since the 1980s, and the class you are born into remains the strongest predictor of the class you will ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
