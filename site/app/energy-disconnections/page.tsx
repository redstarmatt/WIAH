'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofgem', dataset: 'Prepayment meter installation data — supplier compliance reporting', url: 'https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you', date: '2024' },
  { num: 2, name: 'Ofgem', dataset: 'Consumer Vulnerability Report', url: 'https://www.ofgem.gov.uk/publications/consumer-vulnerability-strategy', date: '2024' },
  { num: 3, name: 'Citizens Advice', dataset: 'Energy statistics and case evidence', url: 'https://www.citizensadvice.org.uk/about-us/our-work/policy-research/policy-research-topics/energy-policy-research-and-consultation-responses/', date: '2024' },
];

export default function EnergyDisconnectionsPage() {
  const forcedPPMData = [80, 150, 200, 280, 380, 480, 600, 320, 120];
  const selfDisconnectData = [1.2, 1.3, 1.4, 1.6, 1.8, 2.2, 4.8, 3.8, 3.2];

  const forcedPPMSeries: Series[] = [
    {
      id: 'forcedppm',
      label: 'Forced prepayment meter installations (thousands)',
      colour: '#E63946',
      data: forcedPPMData.map((v: number, i: number) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
  ];

  const selfDisconnectSeries: Series[] = [
    {
      id: 'selfdisconnect',
      label: 'Households self-disconnecting (millions/yr)',
      colour: '#E63946',
      data: selfDisconnectData.map((v: number, i: number) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
  ];

  const forcedPPMAnnotations: Annotation[] = [
    { date: new Date(2022, 0, 1), label: '2022: Energy price crisis — PPM surge' },
    { date: new Date(2023, 0, 1), label: '2023: Ofgem investigation & ban' },
  ];

  const selfDisconnectAnnotations: Annotation[] = [
    { date: new Date(2021, 0, 1), label: '2021: Energy price cap begins rising' },
    { date: new Date(2022, 0, 1), label: '2022: Energy Price Guarantee introduced' },
  ];

  return (
    <>
      <TopicNav topic="Energy Disconnections" />
      <SectionNav sections={[
        { id: 'sec-metrics', label: 'Key Metrics' },
        { id: 'sec-forced', label: 'Forced Installations' },
        { id: 'sec-self', label: 'Self-Disconnections' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy"
          question="How Many Homes Are Being Disconnected from Energy?"
          finding="Forced prepayment meter installations reached 600,000 in 2022 — disproportionately affecting vulnerable households, before being banned by Ofgem in 2023."
          colour="#E63946"
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-12">
            <MetricCard
              label="Forced PPM installations (thousands)"
              value="120"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 600k peak in 2022 · Ofgem ban on vulnerable households"
              sparklineData={[200, 280, 380, 480, 600, 320, 120]}
              source="Ofgem — 2024"
            />
            <MetricCard
              label="Self-disconnections (millions/yr)"
              value="3.2"
              direction="down"
              polarity="up-is-bad"
              changeText="down from 4.8m peak · still 3× pre-crisis level"
              sparklineData={[1.4, 1.6, 1.8, 2.2, 4.8, 3.8, 3.2]}
              source="Ofgem — 2024"
            />
            <MetricCard
              label="Households in fuel debt (millions)"
              value="6.2"
              direction="down"
              polarity="up-is-bad"
              changeText="6.2m in arrears · easing from 2022 peak of 6.8m"
              sparklineData={[3.5, 3.7, 4.0, 5.5, 6.8, 6.5, 6.2]}
              source="Citizens Advice / Ofgem — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-forced" className="mb-12">
            <LineChart
              title="Forced prepayment meter installations, England 2016–2024 (thousands)"
              subtitle="Number of prepayment meters forcibly installed by energy suppliers in households with debt, often without proper welfare checks."
              series={forcedPPMSeries}
              annotations={forcedPPMAnnotations}
              yLabel="Installations (thousands)"
              source={{
                name: 'Ofgem',
                dataset: 'Prepayment meter installation data — supplier compliance reporting',
                frequency: 'annual',
                url: 'https://www.ofgem.gov.uk/check-if-energy-price-cap-affects-you',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-self" className="mb-12">
            <LineChart
              title="Households self-disconnecting from energy supply 2016–2024 (millions)"
              subtitle="Estimated households that ran out of prepayment meter credit and could not top up — a form of involuntary disconnection disproportionate to lower-income households."
              series={selfDisconnectSeries}
              annotations={selfDisconnectAnnotations}
              yLabel="Households (millions/yr)"
              source={{
                name: 'Ofgem',
                dataset: 'Consumer Vulnerability Report',
                frequency: 'annual',
                url: 'https://www.ofgem.gov.uk/publications/consumer-vulnerability-strategy',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Vulnerable Households Protected"
            value="2023"
            description="Ofgem's 2023 ban on forcibly installing prepayment meters in homes with vulnerable occupants — including those with children, serious illness, or disability — marked a significant regulatory intervention. Energy suppliers must now complete welfare checks before any forced installation and cannot install PPMs in households where doing so would risk harm."
            source="Ofgem, Involuntary Prepayment Meter Installation Code of Practice"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12 mt-8">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The energy crisis exposed who bears the risk</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Around 7 million households in Great Britain use prepayment meters<Cite nums={2} /> — disproportionately lower-income, in previous energy debt, or in rented accommodation where landlords have installed them. When prepayment credit runs out and the household cannot afford to top up, the supply stops. This "self-disconnection" is effectively involuntary — not a choice but a consequence of poverty. Self-disconnections peaked at 4.8 million in 2022<Cite nums={2} /> as wholesale energy prices spiked following Russia's invasion of Ukraine.</p>
              <p>The forced installation scandal emerged in early 2023 when ITV and Citizens Advice documented energy suppliers using debt collection agents to force open doors and install prepayment meters in homes including those with young children, seriously ill occupants, and elderly people — often without any welfare check.<Cite nums={3} /> At its 2022 peak, 600,000 forced installations were carried out in a single year.<Cite nums={1} /> Ofgem's subsequent investigation found widespread non-compliance with existing vulnerability guidelines. A temporary ban was imposed in February 2023 and made permanent for vulnerable households later that year.<Cite nums={1} /></p>
              <p>The underlying drivers persist. Fuel debt reached £2.6 billion in 2023, with 6.2 million households in arrears.<Cite nums={[2, 3]} /> The structural vulnerability — 19 million homes on gas central heating with poor insulation — means the exposure will recur with the next energy price shock. The Warm Homes Discount, Cold Weather Payment, and Winter Fuel Payment together total approximately £2.5 billion per year, far below what would bring all fuel-poor households to affordable energy at current market rates.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ofgem.gov.uk/publications/consumer-vulnerability-strategy" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofgem — Consumer Vulnerability Report</a> — annual report covering prepayment meter data, self-disconnection estimates, and supplier compliance. Supplemented by Citizens Advice quarterly energy statistics.</p>
            <p>Forced PPM installation figures from Ofgem supplier licence compliance reporting. Fuel debt data from Ofgem Supplier Financial Resilience reporting. Self-disconnection estimates are modelled from Ofgem survey data and Citizens Advice case evidence. All figures are for Great Britain unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
