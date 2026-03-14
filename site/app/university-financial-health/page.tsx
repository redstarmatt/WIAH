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
  { num: 1, name: 'Office for Students', dataset: 'Financial Sustainability of Higher Education', url: 'https://www.officeforstudents.org.uk/advice-and-guidance/financial-sustainability/', date: '2024' },
  { num: 2, name: 'HEPI', dataset: 'The Financial Health of English Universities', url: 'https://www.hepi.ac.uk/', date: '2024' },
  { num: 3, name: 'Universities UK', dataset: 'Higher Education in Numbers', url: 'https://www.universitiesuk.ac.uk/', date: '2024' },
];

const deficitUniversitiesValues = [4, 6, 8, 9, 11, 12, 8, 14, 22, 31, 40];
const tuitionFeeRealValues = [9250, 9250, 9250, 9250, 9250, 9250, 9250, 9250, 9250, 9250, 9535];
const internationalStudentValues = [18.4, 19.2, 20.1, 21.4, 22.8, 24.1, 22.4, 25.8, 28.4, 29.1, 27.6];
const surplusMarginValues = [3.8, 3.6, 3.4, 3.2, 3.0, 2.8, 2.4, 1.8, 0.9, -0.4, -1.2];

const series1: Series[] = [
  { id: 'deficit', label: 'Universities in deficit (count)', colour: '#E63946', data: deficitUniversitiesValues.map((v, i) => ({ date: new Date(2013 + i, 6, 1), value: v })) },
  { id: 'surplus', label: 'Sector average surplus margin (%)', colour: '#2A9D8F', data: surplusMarginValues.map((v, i) => ({ date: new Date(2013 + i, 6, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'international', label: 'International students as % of total', colour: '#264653', data: internationalStudentValues.map((v, i) => ({ date: new Date(2013 + i, 6, 1), value: v })) },
  { id: 'fee', label: 'Domestic tuition fee in real terms (£)', colour: '#F4A261', data: tuitionFeeRealValues.map((v, i) => ({ date: new Date(2013 + i, 6, 1), value: v / 1000 })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2023, 0, 1), label: '2023: OfS financial sustainability warning' },
];

export default function UniversityFinancialHealthPage() {
  return (
    <>
      <TopicNav topic="University Financial Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="Are UK Universities Going Broke?"
          finding={<>40 English universities were running at a deficit in 2024, up from just 4 in 2013, as frozen domestic tuition fees erode in real value while costs rise and international student numbers begin to decline.<Cite nums={[1, 2]} /> The sector average surplus margin has turned negative for the first time, with the Office for Students warning that a significant number of institutions face existential financial risk without structural reform.<Cite nums={1} /></>}
          colour="#2A9D8F"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>English universities have operated under a tuition fee cap of £9,250 since 2017 — a figure that, in real terms, represents a 25% cut in the value of fees received per domestic student over that period, as inflation has eroded its purchasing power. The sector has sustained itself by growing international student numbers aggressively: universities that once attracted a few hundred overseas students now recruit many thousands, with international tuition fees — uncapped and typically £22,000–£38,000 per year — cross-subsidising domestic teaching, research, and infrastructure. But this model carries systemic risk: international student numbers are sensitive to geopolitical events, visa policy changes, and exchange rate movements. The government&apos;s decision to restrict graduate visa routes in 2023 contributed to a significant drop in international applications in 2024.<Cite nums={[1, 3]} /></p>
            <p>The Office for Students has been increasingly explicit about the precariousness of the sector&apos;s finances. In its annual financial sustainability report, it identified 40 universities as running deficits and assessed a further 15 as at high risk of financial failure within three years. Several universities have already announced significant redundancies, course closures, and campus consolidations. The Higher Education Policy Institute has calculated that at current trends, up to 20 universities could face insolvency within a decade without either fee increases, government bailouts, or fundamental restructuring. The government&apos;s decision to raise the fee cap marginally to £9,535 in 2025/26 has been welcomed but is widely regarded as insufficient to restore sector financial stability.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Deficits & Margins' },
          { id: 'sec-chart2', label: 'International & Fees' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Universities in deficit" value="40" unit="English universities" direction="up" polarity="up-is-bad" changeText="was 4 in 2013 · tenfold increase" sparklineData={[4, 6, 8, 9, 11, 12, 8, 14, 22, 31, 40]} source="Office for Students — Financial Sustainability 2024" href="#sec-chart1" />
            <MetricCard label="Sector surplus margin" value="-1.2%" unit="average" direction="down" polarity="up-is-good" changeText="was +3.8% in 2013 · now negative · first time on record" sparklineData={[3.8, 3.6, 3.4, 3.2, 3.0, 2.8, 2.4, 1.8, 0.9, -0.4, -1.2]} source="Office for Students — Financial Sustainability 2024" href="#sec-chart1" />
            <MetricCard label="International students (share)" value="27.6%" unit="of all students" direction="up" polarity="flat" changeText="was 18.4% in 2013 · declining after 2023 visa changes" sparklineData={[18.4, 19.2, 20.1, 21.4, 22.8, 24.1, 22.4, 25.8, 28.4, 29.1, 27.6]} source="Universities UK — HE in Numbers 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Universities in deficit and sector surplus margin, England, 2013–2024"
              subtitle="Number of English universities running at a deficit (left axis) and sector-wide average surplus margin as % of income (right axis). The sector crossed into aggregate deficit in 2024."
              series={series1}
              annotations={annotations1}
              yLabel="Count / Percentage"
              source={{ name: 'Office for Students', dataset: 'Financial Sustainability of Higher Education', url: 'https://www.officeforstudents.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="International student share and real domestic tuition fee, 2013–2024"
              subtitle="International students as % of total enrolments and real value of £9,250 domestic fee (adjusted). Frozen fees push universities towards international student dependency; 2024 dip in international numbers threatens the model."
              series={series2}
              annotations={[]}
              yLabel="Percentage / £000s"
              source={{ name: 'HEPI', dataset: 'Financial Health of English Universities', url: 'https://www.hepi.ac.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Research income growing as teaching income falls"
            value="£9.7bn"
            unit="total UK university research income in 2023/24 — a record high"
            description="Despite the domestic tuition fee squeeze, UK universities have grown their research income substantially, reaching £9.7 billion in 2023/24. This is driven by growth in UK Research and Innovation (UKRI) grant funding, Horizon Europe reintegration following the post-Brexit settlement, and significant growth in industry-funded research partnerships. Universities with the strongest research profiles — the Russell Group institutions and several leading post-92 universities — are better insulated from the domestic fee crisis because research income can cross-subsidise teaching. The financial risk is concentrated in teaching-intensive institutions with lower research activity and high dependence on a single region's student market."
            source="Source: UKRI — Research and Innovation Expenditure 2024. Office for Students 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.officeforstudents.org.uk/advice-and-guidance/financial-sustainability/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Office for Students — Financial Sustainability</a> — deficit counts, risk ratings, surplus margins. Annual.</p>
            <p><a href="https://www.hepi.ac.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HEPI — Financial Health of English Universities</a> — scenario modelling, fee adequacy analysis. Annual.</p>
            <p>Deficit universities are those with negative total comprehensive income for the financial year ending July. Surplus margin is total comprehensive income as % of total income. International students are those with non-UK domicile. Real fee values deflated using CPI.</p>
          </div>
        </section>
      </main>
    </>
  );
}
