'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Criminal assets recovered (£m), 2012–2024 — Home Office
const assetsRecoveredValues = [154, 168, 179, 194, 218, 235, 248, 265, 290, 310, 318, 355, 378];

// Confiscation orders made vs enforced, 2012–2024 — NAO / Home Office
const ordersMadeValues = [6800, 7100, 7400, 7600, 7800, 7900, 7900, 7800, 7700, 7850, 7900, 7950, 7900];
const ordersEnforcedValues = [3700, 3900, 4100, 4200, 4400, 4500, 4500, 4400, 4200, 4300, 4350, 4400, 4270];

// Account Freezing Orders (annual), 2018–2024 — NCA
const accountFreezingValues = [120, 285, 420, 560, 680, 720, 750];

const series1: Series[] = [
  {
    id: 'assets-recovered',
    label: 'Criminal assets recovered (£m)',
    colour: '#2A9D8F',
    data: assetsRecoveredValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'orders-made',
    label: 'Confiscation orders made',
    colour: '#6B7280',
    data: ordersMadeValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
  {
    id: 'orders-enforced',
    label: 'Confiscation orders enforced',
    colour: '#E63946',
    data: ordersEnforcedValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2018, 0, 1), label: '2018: Unexplained Wealth Orders introduced' },
  { date: new Date(2022, 0, 1), label: '2022: Economic Crime Act — crypto seizure powers' },
];

export default function AssetRecoveryRatesPage() {
  return (
    <>
      <TopicNav topic="Justice" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Crime & Justice"
          question="Does crime actually not pay in Britain?"
          finding="The UK recovers just 3% of an estimated £12 billion laundered annually through the country. Criminal asset recovery has risen to £378 million per year, but only 54% of all confiscation orders are ever enforced. Unexplained Wealth Orders — once heralded as a game-changer — have been used just 9 times since 2018."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Proceeds of Crime Act 2002 gave UK law enforcement sweeping powers to strip criminals of their assets. In theory, crime should not pay. In practice, the enforcement gap is vast. Courts impose roughly 7,900 confiscation orders per year, but only around 54% are ever enforced — meaning nearly half of all court-ordered asset seizures go uncollected. The total amount recovered, £378 million in 2023/24, sounds significant until set against the National Crime Agency's own estimate that £12 billion is laundered through the UK every year. That 3% recovery rate has barely shifted in a decade. The NAO has repeatedly criticised HMCTS and enforcement agencies for failing to collect debts owed under confiscation orders, with over £1.8 billion in outstanding unpaid orders accumulating on the books.</p>
            <p>Unexplained Wealth Orders, introduced under the Criminal Finances Act 2017, were supposed to change the calculus. They allow the NCA to compel politically exposed persons and suspected criminals to explain the source of assets worth over £50,000 — reversing the burden of proof for assets that appeared far beyond legitimate means. But in practice, UWOs have been used only 9 times since their introduction in 2018. The NCA's failed attempt to use a UWO against the family of a Kazakh banker cost the agency over £1.5 million in legal fees and had a chilling effect on further applications. By contrast, Account Freezing Orders — a lower-threshold tool — have surged to over 750 per year, proving more practical. The Economic Crime and Corporate Transparency Act 2022 introduced new crypto asset seizure powers, and the NCA has reported several successful crypto seizures — including a £3.4 billion Bitcoin haul linked to a Chinese money laundering network.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Assets recovered' },
          { id: 'sec-chart2', label: 'Confiscation gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Criminal assets recovered"
              value="£378M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="+145% since 2012 · but only 3% of £12bn laundered annually"
              sparklineData={assetsRecoveredValues}
              source="Home Office — Asset Recovery Statistical Bulletin 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Confiscation order enforcement rate"
              value="54%"
              unit="2024"
              direction="flat"
              polarity="up-is-good"
              changeText="Nearly half of court-ordered confiscation goes uncollected · £1.8bn outstanding"
              sparklineData={ordersEnforcedValues.map((v, i) => Math.round((v / ordersMadeValues[i]) * 100))}
              source="NAO — Criminal confiscation order enforcement 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Unexplained Wealth Orders used"
              value="9"
              unit="since 2018"
              direction="flat"
              polarity="up-is-good"
              changeText="NCA deterred after costly failed case · legal costs over £1.5m"
              sparklineData={[1, 2, 1, 2, 1, 1, 1]}
              source="NCA — Annual Report 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Criminal assets recovered under POCA, England & Wales, 2012–2024"
              subtitle="Total value of assets recovered annually through confiscation, cash forfeiture, and civil recovery (£ millions). Rising trend, but still a fraction of total criminal proceeds."
              series={series1}
              annotations={annotations}
              yLabel="£ millions"
              source={{ name: 'Home Office', dataset: 'Asset Recovery Statistical Bulletin', url: 'https://www.gov.uk/government/statistics/asset-recovery-statistical-bulletin-financial-years-ending-2015-to-2024', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Confiscation orders made vs enforced, England & Wales, 2012–2024"
              subtitle="Court-imposed confiscation orders (grey) vs orders actually collected (red). The enforcement gap — nearly half of all orders — represents over £1.8bn in uncollected criminal proceeds accumulating on HMCTS books."
              series={series2}
              annotations={[{ date: new Date(2019, 0, 1), label: '2019: NAO criticises enforcement rate' }]}
              yLabel="Orders"
              source={{ name: 'NAO / Home Office', dataset: 'Criminal Confiscation Order Enforcement', url: 'https://www.nao.org.uk/reports/criminal-confiscation/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Economic Crime Act 2022 — new crypto seizure powers"
            value="£3.4bn"
            unit="Bitcoin seized in single NCA operation — largest crypto seizure in UK history"
            description="The Economic Crime and Corporate Transparency Act 2022 gave UK law enforcement the power to seize crypto assets without first securing a criminal conviction. The NCA's largest crypto seizure — £3.4 billion in Bitcoin linked to a Chinese money laundering network — demonstrated the scale of illicit digital assets flowing through the UK. New provisions also allow for the seizure of crypto held in overseas wallets. Account Freezing Orders, a lower-threshold civil tool introduced in 2017, have grown to over 750 per year, proving more practical than Unexplained Wealth Orders for routine enforcement. The UK's Economic Crime Coordination Centre, launched in 2024, aims to bring law enforcement, prosecutors, and financial intelligence teams together in a single joint unit to increase coordination across the asset recovery system."
            source="Source: NCA Annual Report 2024. Home Office — Economic Crime and Corporate Transparency Act 2022 Impact Assessment."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/statistics/asset-recovery-statistical-bulletin-financial-years-ending-2015-to-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Asset Recovery Statistical Bulletin</a> — annual publication covering confiscation, cash forfeiture, civil recovery, and revenue orders under the Proceeds of Crime Act 2002.</p>
            <p><a href="https://www.nao.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Audit Office — Criminal confiscation order enforcement</a> — audit reviews of POCA enforcement effectiveness. Outstanding orders data from HMCTS enforcement statistics.</p>
            <p>The £12 billion annual money laundering estimate is from the NCA National Strategic Assessment of Serious and Organised Crime. Recovery rates are calculated as total assets recovered divided by estimated proceeds of crime — the denominator is inherently uncertain. Confiscation order enforcement rate is orders resulting in full or partial collection divided by total orders made in the same year.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
