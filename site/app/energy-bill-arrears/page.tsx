'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofgem', dataset: 'Consumer Vulnerability Strategy — Debt and Arrears', url: 'https://www.ofgem.gov.uk/information-for-households/energy-bill-help-hub', date: '2024' },
  { num: 2, name: 'Citizens Advice', dataset: 'Energy Crisis Analysis', url: 'https://www.citizensadvice.org.uk/about-us/our-work/policy/energy/', date: '2024' },
  { num: 3, name: 'National Energy Action', dataset: 'Fuel Poverty Monitor', url: 'https://www.nea.org.uk/research/', date: '2024' },
];

const arrearsHouseholdValues = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.9, 2.8, 3.2, 2.9, 2.8];
const totalDebtValues = [360, 380, 410, 440, 480, 510, 590, 1380, 2100, 1920, 1850];
const prepaymentMeterValues = [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 5.4, 7.1, 6.8, 6.5];
const disconnectionRiskValues = [420, 430, 440, 460, 480, 510, 560, 980, 1320, 1180, 1050];

const series1: Series[] = [
  { id: 'arrears', label: 'Households in energy bill arrears (millions)', colour: '#E63946', data: arrearsHouseholdValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'debt', label: 'Total energy debt outstanding (£ million)', colour: '#F4A261', data: totalDebtValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'prepay', label: 'Prepayment meter households (millions)', colour: '#6B7280', data: prepaymentMeterValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'discRisk', label: 'Households at disconnection risk (thousands)', colour: '#E63946', data: disconnectionRiskValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2022, 3, 1), label: '2022: Energy price cap doubled' },
  { date: new Date(2022, 9, 1), label: '2022: £400 Energy Support Scheme' },
];

export default function EnergyBillArrearsPage() {
  return (
    <>
      <TopicNav topic="Energy Bill Arrears" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy"
          question="How Many Households Can&apos;t Afford Their Energy Bills?"
          finding={<>Around 2.8 million UK households are in energy bill arrears — owing a collective £1.85 billion — while 6.5 million households are on prepayment meters that self-disconnect when credit runs out, meaning they effectively face involuntary energy rationing.<Cite nums={[1, 2]} /> The energy crisis of 2022–23 roughly doubled both debt and arrears, and recovery has been incomplete.<Cite nums={[1, 3]} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Energy affordability became an acute crisis in 2022 when the Ofgem price cap rose from £1,277 per year (October 2021) to £3,549 per year (October 2022), before the government&apos;s Energy Price Guarantee capped typical bills at £2,500 for most households. For low-income households — which spend a higher proportion of income on energy — this represented an impossible pressure. Arrears and debt ballooned: total outstanding energy debt reached a peak of £2.1 billion in 2023, and Citizens Advice reported 1,200 people a day seeking help with energy bills during the peak crisis period.<Cite nums={[1, 2]} /> The worst-affected were households on prepayment meters, which were forcibly installed by some suppliers to recover debts — a practice that Ofgem subsequently banned after investigative journalism and parliamentary pressure exposed its scale.</p>
            <p>The prepayment meter issue revealed a deeper inequity in the energy system: households on prepayment meters pay more per unit for their energy than those on direct debit, despite being overwhelmingly lower-income and already in financial difficulty. Around 6.5 million households now use prepayment meters — including 4 million with smart meters that can be switched to prepayment mode remotely. National Energy Action estimates that over 6 million households are in fuel poverty — spending more than 10% of income on fuel — even at reduced post-crisis price cap levels.<Cite nums={3} /> The Warm Home Discount and Winter Fuel Payment provide some support, but the latter was restricted to pension credit recipients from 2024, removing it from around 10 million pensioners who do not claim pension credit despite being eligible.<Cite nums={[1, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Arrears & Debt' },
          { id: 'sec-chart2', label: 'Prepayment Meters' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Households in energy arrears" value="2.8M" unit="households" direction="up" polarity="up-is-bad" changeText="was 1.1M in 2013 · peaked at 3.2M during crisis" sparklineData={[1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.9, 2.8, 3.2, 2.9, 2.8]} source="Ofgem — Consumer Vulnerability 2024" href="#sec-chart1" />
            <MetricCard label="Total energy debt outstanding" value="£1.85bn" unit="collective debt" direction="up" polarity="up-is-bad" changeText="was £360M in 2013 · peaked at £2.1bn in 2023" sparklineData={[360, 380, 410, 440, 480, 510, 590, 1380, 2100, 1920, 1850]} source="Ofgem — Consumer Vulnerability 2024" href="#sec-chart1" />
            <MetricCard label="Prepayment meter households" value="6.5M" unit="households" direction="up" polarity="up-is-bad" changeText="was 4.2M in 2013 · pay more per unit than DD customers" sparklineData={[4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 5.4, 7.1, 6.8, 6.5]} source="Ofgem — Consumer Vulnerability 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Households in energy arrears and total energy debt, 2013–2024"
              subtitle="Households in arrears (millions) and total outstanding energy debt (£ million). Both surged during the 2022–23 energy price crisis and are falling back slowly."
              series={series1}
              annotations={annotations1}
              yLabel="Millions / £ million"
              source={{ name: 'Ofgem', dataset: 'Consumer Vulnerability Strategy', url: 'https://www.ofgem.gov.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Prepayment meter households and disconnection risk, 2013–2024"
              subtitle="Prepayment meter households (millions) and those at risk of self-disconnection (thousands). Prepayment meters effectively ration energy use for those who cannot afford to top up."
              series={series2}
              annotations={[{ date: new Date(2023, 2, 1), label: '2023: Ofgem bans forced PPM installation' }]}
              yLabel="Millions / Thousands"
              source={{ name: 'National Energy Action', dataset: 'Fuel Poverty Monitor', url: 'https://www.nea.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Warm Home Discount reaches 3 million households"
            value="£150"
            unit="annual rebate for eligible low-income households — 3 million beneficiaries"
            description="The Warm Home Discount scheme provides a £150 annual rebate on energy bills for eligible low-income and vulnerable households. From 2022, the scheme was reformed to operate through automatic data-matching between the DWP, Ofgem, and energy suppliers — meaning eligible households receive the rebate without needing to apply. Around 3 million households now receive the discount annually. The reform to automatic matching significantly improved take-up, particularly among pension credit recipients who previously did not claim the rebate despite being entitled."
            source="Source: Ofgem — Warm Home Discount 2024. DESNZ — Fuel Poverty Statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ofgem.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofgem — Consumer Vulnerability Strategy</a> — debt, arrears, prepayment meter data. Annual.</p>
            <p><a href="https://www.citizensadvice.org.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Citizens Advice — Energy Crisis Analysis</a> — advice demand, vulnerability data. Annual.</p>
            <p><a href="https://www.nea.org.uk/research/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Energy Action — Fuel Poverty Monitor</a> — fuel poverty rates, geographic analysis. Annual.</p>
            <p>Arrears data is from supplier returns to Ofgem. Fuel poverty uses the Low Income Low Energy Efficiency (LILEE) definition. Prepayment meter data includes both traditional and smart meters configured in prepayment mode.</p>
          </div>
        </section>
      </main>
    </>
  );
}
