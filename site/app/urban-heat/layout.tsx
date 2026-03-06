import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are British Cities Becoming Dangerously Hot?',
  description: 'The summer of 2022 saw UK temperatures exceed 40&deg;C for the first time, with over 2,800 excess deaths attributed to the heatwave. Urban areas are significantly hotter than surrounding countryside &mdash; London is on average 4&deg;C warmer &mdash; and as the climate warms, this &lsquo;heat island&rsquo; effect is intensifying. The UK has no mandatory standards for indoor temperatures in workplaces or homes.',
  openGraph: {
    title: 'Are British Cities Becoming Dangerously Hot?',
    description: 'The summer of 2022 saw UK temperatures exceed 40&deg;C for the first time, with over 2,800 excess deaths attributed to the heatwave. Urban areas are significantly hotter than surrounding countryside &mdash; London is on average 4&deg;C warmer &mdash; and as the climate warms, this &lsquo;heat island&rsquo; effect is intensifying. The UK has no mandatory standards for indoor temperatures in workplaces or homes.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/urban-heat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are British Cities Becoming Dangerously Hot?',
    description: 'The summer of 2022 saw UK temperatures exceed 40&deg;C for the first time, with over 2,800 excess deaths attributed to the heatwave. Urban areas are significantly hotter than surrounding countryside &mdash; London is on average 4&deg;C warmer &mdash; and as the climate warms, this &lsquo;heat island&rsquo; effect is intensifying. The UK has no mandatory standards for indoor temperatures in workplaces or homes.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/urban-heat',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
