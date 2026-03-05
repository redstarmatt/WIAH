import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wellbeing',
  description: 'Life satisfaction has fallen below pre-pandemic levels, anxiety is higher than at any time since records began, and one in four adults now feels lonely. After p',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
