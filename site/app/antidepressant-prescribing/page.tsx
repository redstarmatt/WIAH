'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Antidepressant prescription items dispensed (millions), 2008–2024 — NHS BSA
const prescriptionValues = [36, 39, 43, 46, 50, 53, 57, 61, 65, 68, 70, 73, 77, 82, 87, 88, 89];

// Patients receiving antidepressants (millions), 2008–2024 — NHS Digital
const patientValues = [4.1, 4.4, 4.7, 5.0, 5.3, 5.6, 5.9, 6.2, 6.5, 6.7, 6.9, 7.1, 7.4, 7.8, 8.1, 8.2, 8.3];

// NHS Talking Therapies completions (thousands) and antidepressant items (millions), 2012–2024
const talkingTherapyValues = [280, 320, 380, 440, 510, 580, 680, 780, 880, 950, 920, 1100, 1200];
const prescriptionsFrom2012 = [50, 53, 57, 61, 65, 68, 70, 73, 77, 82, 87, 88, 89];

const series1: Series[] = [
  {
    id: 'prescriptions',
    label: 'Prescription items dispensed (millions)',
    colour: '#264653',
    data: prescriptionValues.map((v, i) => ({ date: new Date(2008 + i, 0, 1), value: v * 1000000 })),
  },
];

const series2: Series[] = [
  {
    id: 'prescriptions-2012',
    label: 'Antidepressant items (millions)',
    colour: '#264653',
    data: prescriptionsFrom2012.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v * 1000000 })),
  },
  {
    id: 'talking-therapy',
    label: 'Talking therapy completions (thousands)',
    colour: '#2A9D8F',
    data: talkingTherapyValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v * 1000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2012, 0, 1), label: '2012: IAPT fully rolled out nationally' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — prescribing accelerates' },
  { date: new Date(2022, 0, 1), label: '2022: NICE publishes deprescribing guidance' },
];

export default function AntidepressantPrescribingPage() {
  return (
    <>
      <TopicNav topic="Mental Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="Are we medicating a mental health crisis?"
          finding="One in six adults in England is now prescribed an antidepressant. Prescription items have risen from 36 million in 2008 to 89 million in 2024 — a 147% increase with no year of decline. Access to talking therapies remains limited, particularly in deprived areas where prescribing rates are nearly twice the national average."
          colour="#264653"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Antidepressant prescribing in England has more than doubled since 2008. Around 8.3 million people — roughly one in six adults — now receive at least one antidepressant prescription per year. The total number of items dispensed reached 89 million in 2023/24, making antidepressants one of the most commonly prescribed drug classes in the country. This growth has been steady and unbroken: there is no single year in the past sixteen in which prescribing fell. The pandemic accelerated an existing trend, with items rising 3.8% in 2020/21 as GP practices shifted to remote consultations and referral pathways into talking therapies were disrupted. Once started, antidepressants are difficult to stop: NICE published its first dedicated deprescribing guidance in 2022, acknowledging that withdrawal symptoms had been systematically underestimated. An estimated 40% of long-term users could safely taper with support, but structured programmes remain rare.</p>
            <p>The NICE stepped care model recommends that mild to moderate depression should first be treated with guided self-help, cognitive behavioural therapy, or structured exercise — with antidepressants reserved for moderate to severe cases. In practice, the model is inverted. NHS Talking Therapies treated 1.2 million people in 2023/24, but average waits exceeded six weeks in many areas and completion rates remained below 50%. For a GP with a ten-minute appointment slot and a distressed patient, a prescription is often the only intervention immediately available. Regional variation is stark: the North East dispenses 198 antidepressant items per 1,000 population — nearly twice the rate of London at 104. This mirrors the geography of deprivation and limited access to alternatives. The question is not whether antidepressants work — for many people they are essential — but whether a health system that prescribes 89 million items a year is treating the right problem.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Prescribing trend' },
          { id: 'sec-chart2', label: 'Therapy vs prescribing' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Antidepressant prescription items"
              value="89M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+147% since 2008 · no year of decline in 16 years"
              sparklineData={prescriptionValues.slice(-8)}
              source="NHS BSA — Prescription Cost Analysis 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Adults on antidepressants"
              value="8.3M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 6 adults · up from 4.1M in 2008 · +102%"
              sparklineData={patientValues.slice(-8)}
              source="NHS Digital — Medicines Used in Mental Health 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Regional prescribing gap"
              value="1.9x"
              unit="North East vs London"
              direction="up"
              polarity="up-is-bad"
              changeText="North East: 198 items/1000 · London: 104 items/1000 · mirrors deprivation"
              sparklineData={[1.4, 1.5, 1.6, 1.6, 1.7, 1.7, 1.8, 1.9]}
              source="NHS BSA — Prescription Cost Analysis by Sub-ICB 2024"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Antidepressant prescription items dispensed, England, 2008–2024"
              subtitle="Total items dispensed per year. Growth has been continuous — no single year of decline in sixteen years. Pandemic accelerated an existing trend."
              series={series1}
              annotations={annotations}
              yLabel="Items dispensed"
              source={{ name: 'NHS BSA', dataset: 'Prescription Cost Analysis', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis-england', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Antidepressant prescribing vs talking therapy completions, England, 2012–2024"
              subtitle="Antidepressant items (blue, millions) and NHS Talking Therapies completions (green, thousands). Both rising — but prescribing has grown much faster, and therapy access remains constrained."
              series={series2}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: COVID disrupts therapy referrals' }]}
              yLabel="Items / Completions"
              source={{ name: 'NHS Digital / NHS BSA', dataset: 'Medicines Used in Mental Health; NHS Talking Therapies reports', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-bulletin', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="NICE deprescribing guidance and 3,400 social prescribing link workers"
            value="40%"
            unit="of long-term antidepressant users could safely taper with support"
            description="NICE published its first dedicated deprescribing guidance for antidepressants in 2022, acknowledging that withdrawal symptoms had been systematically underestimated and recommending structured, gradual dose reductions. NHS England has embedded over 3,400 social prescribing link workers in primary care networks across England, connecting patients with community activities, debt advice, employment support, and structured exercise programmes — addressing some of the social drivers that lead to prescribing. The NHS Talking Therapies programme treated 1.2 million people in 2023/24 with a recovery rate of around 53%, demonstrating that effective alternatives to medication can be delivered at scale when funded adequately."
            source="Source: NICE — Medicines associated with dependence or withdrawal symptoms 2022. NHS England — Social Prescribing Link Workers 2024. NHS Talking Therapies Annual Report 2024."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis-england" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS BSA — Prescription Cost Analysis</a> — annual publication covering all items dispensed in community pharmacies in England, including antidepressants by drug class and BNF chapter.</p>
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/mental-health-bulletin" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS Digital — Mental Health Bulletin / Medicines Used in Mental Health</a> — annual data on patients receiving mental health medication. Patient counts differ from prescription item counts as one patient may receive multiple items per year.</p>
            <p>Antidepressants include all drugs in BNF section 4.3 (antidepressants). Regional prescribing rates are items per 1,000 registered patients, derived from sub-ICB level data. Talking Therapies completions cover courses of treatment that reached a defined minimum number of sessions.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
