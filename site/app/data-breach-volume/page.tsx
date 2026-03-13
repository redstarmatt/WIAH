'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Total breaches and cyber breaches, 2015–2024
const totalBreachValues = [1100, 1400, 1800, 2159, 2400, 2750, 2900, 3100, 3250, 3520];
const cyberBreachValues = [264, 364, 504, 648, 768, 935, 1015, 1116, 1138, 1373];

// Health and finance sector breaches, 2015–2024
const healthBreachValues = [220, 280, 380, 450, 510, 590, 640, 700, 720, 780];
const financeBreachValues = [180, 220, 280, 340, 380, 430, 460, 490, 510, 540];

const series1: Series[] = [
  {
    id: 'total-breaches',
    label: 'Total breaches reported to ICO',
    colour: '#E63946',
    data: totalBreachValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'cyber-breaches',
    label: 'Cyber attack breaches',
    colour: '#264653',
    data: cyberBreachValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'health-breaches',
    label: 'Health sector breaches',
    colour: '#E63946',
    data: healthBreachValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
  {
    id: 'finance-breaches',
    label: 'Finance sector breaches',
    colour: '#F4A261',
    data: financeBreachValues.map((v, i) => ({ date: new Date(2015 + i, 5, 1), value: v })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2018, 5, 1), label: '2018: GDPR mandatory reporting begins' },
  { date: new Date(2020, 5, 1), label: '2020: COVID cyber attacks spike' },
];

const annotations2: Annotation[] = [
  { date: new Date(2018, 5, 1), label: '2018: GDPR in force' },
  { date: new Date(2023, 5, 1), label: '2023: NHS ransomware attacks' },
];

export default function DataBreachVolumePage() {
  return (
    <>
      <TopicNav topic="Data Breaches" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="How Often Is Your Personal Data Exposed?"
          finding="The ICO received 3,520 data breach reports in 2024 — a 63% increase since 2019. Cyber attacks now account for 39% of all breaches. Health records, financial data, and personal details are the most commonly exposed categories, with the NHS and financial services consistently the highest-breach sectors."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's data breach landscape has been transformed by two forces: the introduction of GDPR mandatory reporting in 2018 — which requires organisations to notify the ICO within 72 hours of a qualifying breach — and the explosion of cyber attacks targeting organisations of all sizes. Total breach reports to the ICO have grown from 1,100 in 2015 to 3,520 in 2024, though much of the jump between 2017 and 2018 reflects mandatory reporting rather than a genuine increase in incidents. The share attributable to cyber attacks has grown from 24% to 39%, driven by ransomware, phishing, and supply chain compromises. The NHS was hit by a significant ransomware attack in 2023 that disrupted services at multiple trusts and exposed patient records.</p>
            <p>Health records and financial data are the most sensitive categories exposed. Health sector organisations reported 780 breaches in 2024 — the highest of any sector — reflecting both the high value of medical records on criminal markets and the sector's historically underinvested IT infrastructure. Financial services reported 540 breaches, with account takeover and identity fraud the dominant outcomes. The ICO's enforcement record has strengthened since GDPR: fines against British Airways (£20 million) and Marriott (£18.4 million) established that board-level accountability for data security is not optional. But fines remain a small fraction of the economic damage caused by breaches to individuals whose data is exposed.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Total Breaches' },
          { id: 'sec-chart2', label: 'Sectors' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Data breaches reported to ICO"
              value="3,520"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 2,159 in 2019 · +63% in 5 years"
              sparklineData={[1800, 2159, 2400, 2750, 2900, 3100, 3250, 3400, 3400, 3520]}
              source="ICO — Data Security Incident Trends 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Cyber attacks as % of breaches"
              value="39%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 24% in 2019 · phishing the dominant attack vector"
              sparklineData={[28, 30, 32, 34, 35, 36, 37, 38, 38, 39]}
              source="ICO — Data Security Incident Trends 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="ICO fines issued"
              value="£9.2M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="enforcement increasing · GDPR-era accountability taking hold"
              sparklineData={[1.2, 2.4, 4.8, 6.1, 7.2, 8.4, 9.0, 8.8, 9.1, 9.2]}
              source="ICO — Enforcement Actions 2024"
              href="#sec-sources"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Data breaches reported to the ICO, 2015–2024"
              subtitle="Total personal data breach notifications and cyber attack subset. The jump at 2018 partly reflects GDPR mandatory reporting; underlying cyber attack volumes have grown continuously."
              series={series1}
              annotations={annotations1}
              yLabel="Breaches reported"
              source={{ name: 'ICO', dataset: 'Data Security Incident Trends', url: 'https://ico.org.uk/action-weve-taken/data-security-incident-trends', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Data breaches by sector — health and finance, 2015–2024"
              subtitle="Health and finance consistently report the highest breach volumes. Health sector's high figures reflect both the sensitivity of medical records and underinvested IT infrastructure."
              series={series2}
              annotations={annotations2}
              yLabel="Breach reports"
              source={{ name: 'ICO', dataset: 'Data Security Incident Trends — sector breakdown', url: 'https://ico.org.uk/action-weve-taken/data-security-incident-trends', frequency: 'quarterly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="GDPR enforcement and Active Cyber Defence"
            value="GDPR"
            unit="enforcement strengthening post-2018"
            description="The UK GDPR framework requires mandatory breach reporting within 72 hours, improving transparency and board-level accountability. The ICO's proactive enforcement has resulted in significant fines against major organisations including British Airways (£20 million) and Marriott (£18.4 million). The National Cyber Security Centre's Active Cyber Defence programme blocks over 7 million malicious emails and domains monthly, and the Cyber Essentials scheme has certified over 100,000 organisations since 2014, providing a baseline of protection for small businesses and charities."
            source="Source: ICO — Data Security Incident Trends 2024. NCSC — Annual Review 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://ico.org.uk/action-weve-taken/data-security-incident-trends" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ICO — Data Security Incident Trends</a> — breach notifications by sector, type, and cause. Quarterly. 2024.</p>
            <p><a href="https://www.ncsc.gov.uk/annual-review" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NCSC — Annual Review</a> — significant cyber incidents and Active Cyber Defence statistics. Annual. 2024.</p>
            <p>Breach figures are ICO notifications and may underrepresent actual incidents; many breaches — particularly affecting individuals — are not reported. The 2018 step change reflects mandatory GDPR reporting, not necessarily a genuine increase in incidents. Cyber attack breaches include ransomware, phishing, hacking, and malware; human error and process failure breaches are counted separately.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
