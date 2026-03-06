import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Homelessness Actually Getting Worse?',
  description: 'Homelessness in England has reached a record level. In 2023/24, 117,500 households were accepted as homeless by local authorities — up 119% since 2012/13. 159,900 children are growing up in temporary accommodation.',
  openGraph: {
    title: 'Is Homelessness Actually Getting Worse?',
    description: 'Homelessness in England has reached a record level. In 2023/24, 117,500 households were accepted as homeless by local authorities — up 119% since 2012/13. 159,900 children are growing up in temporary accommodation.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/homelessness',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Homelessness Actually Getting Worse?',
    description: 'Homelessness in England has reached a record level. In 2023/24, 117,500 households were accepted as homeless by local authorities — up 119% since 2012/13. 159,900 children are growing up in temporary accommodation.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/homelessness',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
