import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why Isn't Britain Building Enough Homes?",
  description: 'England needs 300,000 new homes per year. It has not built this many since the 1960s. Just 234,000 homes were completed in 2022/23. Planning permission grants fell 14% in 2023. Labour has set a target of 1.5 million homes in 5 years — but the planning system, skills shortage, and viability have blocked every previous government.',
  openGraph: {
    title: "Why Isn't Britain Building Enough Homes?",
    description: 'England needs 300,000 new homes per year. It has not built this many since the 1960s. Just 234,000 homes were completed in 2022/23. Planning permission grants fell 14% in 2023. Labour has set a target of 1.5 million homes in 5 years — but the planning system, skills shortage, and viability have blocked every previous government.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/housebuilding',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Isn't Britain Building Enough Homes?",
    description: 'England needs 300,000 new homes per year. It has not built this many since the 1960s. Just 234,000 homes were completed in 2022/23. Planning permission grants fell 14% in 2023. Labour has set a target of 1.5 million homes in 5 years — but the planning system, skills shortage, and viability have blocked every previous government.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/housebuilding',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
