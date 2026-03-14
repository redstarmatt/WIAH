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
  { num: 1, name: 'MHCLG', dataset: 'English Housing Survey: Energy Efficiency', url: 'https://www.gov.uk/government/collections/english-housing-survey', date: '2024' },
  { num: 2, name: 'DESNZ', dataset: 'Energy Performance of Buildings Statistics', url: 'https://www.gov.uk/government/collections/energy-performance-of-buildings', date: '2024' },
  { num: 3, name: 'Committee on Climate Change', dataset: 'Progress in Reducing UK Emissions', url: 'https://www.theccc.org.uk/publication/progress-in-reducing-uk-emissions/', date: '2024' },
];

const ercAboveValues = [34.2, 36.8, 39.4, 42.1, 44.8, 47.2, 49.8, 52.4, 54.8, 57.1, 59.4];
const fuelPovertyValues = [10.4, 10.8, 11.2, 10.8, 10.6, 11.4, 14.2, 16.8, 14.4, 13.2, 12.8];
const insulationInstallValues = [1820000, 1640000, 1420000, 1180000, 840000, 620000, 480000, 580000, 720000, 890000, 1050000];
const heatingDecarbValues = [0.2, 0.3, 0.4, 0.6, 0.8, 1.1, 1.4, 1.8, 2.4, 3.1, 4.2];

const series1: Series[] = [
  { id: 'erc', label: 'Homes with EPC rating C or above (%)', colour: '#2A9D8F', data: ercAboveValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })) },
  { id: 'fuelpoverty', label: 'Households in fuel poverty (%)', colour: '#E63946', data: fuelPovertyValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'insulation', label: 'Insulation measures installed (thousands)', colour: '#264653', data: insulationInstallValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v / 1000 })) },
  { id: 'heating', label: 'Heat pump and low-carbon heating installations (thousands)', colour: '#F4A261', data: heatingDecarbValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v * 100 })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2015, 5, 1), label: '2015: Green Deal scrapped — insulation collapses' },
  { date: new Date(2022, 9, 1), label: '2022: Energy crisis — fuel poverty peaks' },
  { date: new Date(2023, 5, 1), label: '2023: Great British Insulation Scheme launched' },
];

export default function EnergyEfficiencyHousingPage() {
  return (
    <>
      <TopicNav topic="Energy Efficiency Housing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing"
          question="How Energy-Efficient Are Britain's Homes?"
          finding={<>59.4% of English homes now have an EPC rating of C or above — up from 34.2% in 2013 — but this still leaves over 11 million homes rated D or below, and the government&apos;s target of C-rated homes by 2035 for the private rented sector is significantly off-track.<Cite nums={[1, 2]} /> Insulation installation rates collapsed after the scrapping of the Green Deal in 2015 and have only partially recovered, while 12.8% of households remain in fuel poverty.<Cite nums={[1, 3]} /></>}
          colour="#F4A261"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has some of the oldest and least energy-efficient housing stock in Europe. Around 40% of homes — predominantly pre-1970s Victorian and Edwardian terraces, semi-detached and detached houses from the interwar period, and post-war flats — are rated D, E, F, or G on the Energy Performance Certificate scale, meaning they cost significantly more to heat, are more likely to suffer condensation and damp, and contribute disproportionately to the UK&apos;s residential carbon emissions. Progress in improving energy efficiency accelerated in the early 2010s when the government&apos;s Energy Company Obligation and Green Deal programmes drove substantial volumes of loft insulation, cavity wall insulation, and boiler upgrades — but a dramatic reversal occurred in 2015 when the Green Deal was scrapped and government support was sharply reduced, causing insulation installation rates to collapse by 75%.<Cite nums={[1, 3]} /></p>
            <p>The energy crisis of 2021–22 brutally exposed the consequences of this neglect. Households in the least efficient homes — concentrated among renters, the elderly, and those in post-industrial areas — saw energy bills rise to unsustainable levels, driving fuel poverty rates to over 16% in 2022. The government&apos;s retrofit programmes — the Boiler Upgrade Scheme, the Great British Insulation Scheme, and the Energy Company Obligation — have provided partial relief, but are operating at a pace far below what would be needed to meet the 2035 target for the private rented sector or the net-zero pathway for residential emissions. The Committee on Climate Change has consistently rated progress on residential retrofitting as insufficient, and notes that the UK risks being the only G7 country to miss its residential decarbonisation milestones.<Cite nums={[2, 3]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'EPC Ratings' },
          { id: 'sec-chart2', label: 'Retrofitting' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Homes rated EPC C or above" value="59.4%" unit="of English homes" direction="up" polarity="up-is-good" changeText="was 34.2% in 2013 · 11m homes still D or below" sparklineData={[34.2, 36.8, 39.4, 42.1, 44.8, 47.2, 49.8, 52.4, 54.8, 57.1, 59.4]} source="MHCLG — English Housing Survey 2024" href="#sec-chart1" />
            <MetricCard label="Households in fuel poverty" value="12.8%" unit="of all households" direction="down" polarity="up-is-bad" changeText="peaked at 16.8% in 2022 · still above pre-crisis level" sparklineData={[10.4, 10.8, 11.2, 10.8, 10.6, 11.4, 14.2, 16.8, 14.4, 13.2, 12.8]} source="DESNZ — Energy Performance 2024" href="#sec-chart1" />
            <MetricCard label="Insulation measures installed" value="1.05m" unit="per year" direction="up" polarity="up-is-good" changeText="was 1.82m in 2013 · collapsed after 2015 · recovering" sparklineData={[1820, 1640, 1420, 1180, 840, 620, 480, 580, 720, 890, 1050]} source="MHCLG — English Housing Survey 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="EPC C+ rated homes and fuel poverty rate, England, 2013–2024"
              subtitle="% of English homes rated EPC C or above and % of households in fuel poverty. EPC ratings improving steadily; fuel poverty spiked in 2022 energy crisis — poorest homes feel the impact most."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'MHCLG', dataset: 'English Housing Survey', url: 'https://www.gov.uk/government/collections/english-housing-survey', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Insulation installations and low-carbon heating uptake, England, 2013–2024"
              subtitle="Annual insulation measures installed (thousands) and heat pump / low-carbon heating installations (hundreds). Insulation collapsed after 2015 policy reversal; low-carbon heating growing from tiny base."
              series={series2}
              annotations={[]}
              yLabel="Thousands"
              source={{ name: 'DESNZ', dataset: 'Energy Performance of Buildings Statistics', url: 'https://www.gov.uk/government/collections/energy-performance-of-buildings', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Social housing leads on energy efficiency improvement"
            value="79%"
            unit="of social rented homes now rated EPC C or above — highest of any tenure"
            description="Social rented homes — owned by councils and housing associations — now have the highest energy efficiency ratings of any housing tenure, with 79% rated EPC C or above compared to 59% for all tenures and just 48% for private rented homes. This reflects sustained investment by social landlords in retrofitting, driven partly by regulatory requirements and partly by a genuine recognition that warm, efficient homes reduce rent arrears, improve tenant health, and reduce maintenance costs. The best-performing social landlords have achieved whole-street and whole-estate retrofits, including external wall insulation, triple glazing, and heat pump installation, delivering average bill reductions of £400–600 per household per year."
            source="Source: MHCLG — English Housing Survey 2024. National Housing Federation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/english-housing-survey" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">MHCLG — English Housing Survey</a> — EPC ratings, insulation, fuel poverty, tenure. Annual.</p>
            <p><a href="https://www.gov.uk/government/collections/energy-performance-of-buildings" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DESNZ — Energy Performance of Buildings</a> — EPC lodgements, installations, measures. Quarterly.</p>
            <p>EPC ratings from the national EPC register (lodged certificates). Fuel poverty defined as Low Income Low Energy Efficiency (LILEE) metric. Insulation measures from DESNZ ECO and government scheme data. Heat pump figures from MCS installations database. England only.</p>
          </div>
        </section>
      </main>
    </>
  );
}
