'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function WinterFuelPaymentReformPage() {
  // Chart 1: Winter Fuel Payment recipients 2020–2024 (millions)
  const recipients = [11.4, 11.3, 11.2, 11.0, 1.5];

  const recipientSeries: Series[] = [
    {
      id: 'recipients',
      label: 'Winter Fuel Payment recipients (millions)',
      colour: '#F4A261',
      data: recipients.map((v, i) => ({ date: new Date(2020 + i, 0, 1), value: v })),
    },
  ];

  const recipientAnnotations: Annotation[] = [
    { date: new Date(2024, 0, 1), label: '2024: Means test introduced' },
  ];

  // Chart 2: Pensioner fuel poverty rate 2019–2024 (%)
  const fuelPovertyRate = [7.8, 7.9, 10.2, 13.4, 11.9, 13.5];

  const fuelPovertySeries: Series[] = [
    {
      id: 'fuel-poverty',
      label: 'Pensioner households in fuel poverty (%)',
      colour: '#E63946',
      data: fuelPovertyRate.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];

  const fuelPovertyAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Energy price shock' },
    { date: new Date(2024, 0, 1), label: '2024: WFP means-tested' },
  ];

  return (
    <>
      <TopicNav topic="Winter Fuel Payment Reform" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Winter Fuel Payment Reform"
          question="Who Lost the Winter Fuel Payment?"
          finding="The decision to means-test Winter Fuel Payment removed the benefit from 10 million pensioners — saving £1.5 billion — with critics warning 100,000+ pensioners could fall into fuel poverty as a result."
          colour="#F4A261"
          preposition="on"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-recipients', label: 'Recipients' },
          { id: 'sec-poverty', label: 'Fuel poverty' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Pensioners losing WFP (millions)"
              value="10"
              direction="down"
              polarity="down-is-bad"
              changeText="from 11.4m to 1.5m recipients · 85% removed at a stroke"
              sparklineData={[11.4, 11.3, 11.2, 11.0, 1.5]}
              source="DWP — Winter Fuel Payment Statistics 2024"
            />
            <MetricCard
              label="Annual saving (£bn)"
              value="1.5"
              direction="up"
              polarity="neutral"
              changeText="fiscal saving · contested vs poverty cost"
              sparklineData={[0, 0, 0, 0, 1.5]}
              source="HM Treasury — Autumn Statement 2024"
            />
            <MetricCard
              label="Pensioners in fuel poverty post-reform (estimated thousands)"
              value="100+"
              direction="up"
              polarity="up-is-bad"
              changeText="IFS / JRF central estimate · 850k eligible for Pension Credit not claiming"
              sparklineData={[0, 0, 0, 50, 100]}
              source="IFS / JRF — WFP Reform Impact 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-recipients" className="mb-12">
            <LineChart
              title="Winter Fuel Payment recipients, UK, 2020–2024 (millions)"
              subtitle="Total households receiving Winter Fuel Payment annually. 2024 reflects the introduction of means test restricting eligibility to Pension Credit recipients."
              series={recipientSeries}
              annotations={recipientAnnotations}
              yLabel="Recipients (millions)"
              source={{
                name: 'Department for Work and Pensions',
                dataset: 'Winter Fuel Payment Statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/winter-fuel-payments',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-poverty" className="mb-12">
            <LineChart
              title="Pensioner households in fuel poverty, England, 2019–2024 (%)"
              subtitle="Pensioner households spending more than 10% of income on energy (Low Income High Costs definition). 2024 includes projected impact of WFP means test."
              series={fuelPovertySeries}
              annotations={fuelPovertyAnnotations}
              yLabel="Fuel poverty rate (%)"
              source={{
                name: 'DESNZ / National Energy Action',
                dataset: 'Fuel Poverty Statistics — England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/fuel-poverty-statistics',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on Winter Fuel Payment reform</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The Winter Fuel Payment was introduced in 1997 as a universal £200–300 annual payment to all households with a member aged 66 or over. In July 2024, the government means-tested it from winter 2024–25, restricting eligibility to pensioners receiving Pension Credit. The change removed the benefit from approximately 10 million households — reducing recipients from 11.4 million to 1.5 million — saving an estimated £1.5 billion per year.</p>
              <p>The reform's core vulnerability is Pension Credit non-take-up. The benefit is worth around £3,900 a year to eligible pensioners, but approximately 850,000 eligible households do not claim it — often older people unaware of their entitlement or unable to navigate digital applications. These pensioners are genuinely poor but fall outside the means-test, leaving them without the Winter Fuel Payment. The JRF, IFS, and Age UK all estimated the reform would push between 100,000 and 300,000 additional pensioners below the poverty line.</p>
              <p>Pensioner fuel poverty was already elevated by the 2022–23 energy price shock — rising from around 8% in 2019 to over 13% in 2022 before partial recovery. The removal of Winter Fuel Payment for those not on Pension Credit is projected to increase fuel poverty among pensioners in 2024–25 before any effect on take-up is seen. The actual poverty and mortality impact will only be fully assessable once winter 2024–25 data becomes available.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/winter-fuel-payments" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP</a> — Winter Fuel Payment Statistics. Published annually.</p>
            <p><a href="https://www.gov.uk/government/collections/fuel-poverty-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ</a> — Fuel Poverty Statistics, England. Published annually using Low Income High Costs (LIHC) definition.</p>
            <p><a href="https://www.jrf.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">JRF</a> and <a href="https://www.ifs.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">IFS</a> — WFP reform poverty impact projections 2024. Recipient figures drawn from DWP administrative data. 2024 figure reflects first year of means-tested payment. Poverty projections represent central estimates published prior to reform implementation.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
