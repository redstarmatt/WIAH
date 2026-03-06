import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Does where you grow up still determine where you end up?',
  description: 'Intergenerational social mobility in Britain has stalled since the 1980s, and the class you are born into remains the strongest predictor of the class you will die in.',
  openGraph: {
    title: 'Does where you grow up still determine where you end up?',
    description: 'Intergenerational social mobility in Britain has stalled since the 1980s, and the class you are born into remains the strongest predictor of the class you will die in.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/social-mobility',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Does where you grow up still determine where you end up?',
    description: 'Intergenerational social mobility in Britain has stalled since the 1980s, and the class you are born into remains the strongest predictor of the class you will die in.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/social-mobility',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
