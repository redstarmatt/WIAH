'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'OHID', dataset: 'National Dental Epidemiology Programme — Oral Health Survey of 5-year-old children', url: 'https://www.gov.uk/government/statistics/oral-health-survey-of-5-year-old-children', date: '2023' },
  { num: 2, name: 'PHE / OHID', dataset: 'Water Fluoridation Health Monitoring Report', url: 'https://www.gov.uk/government/publications/water-fluoridation-health-monitoring-report-for-england-2022', date: '2022' },
  { num: 3, name: 'OHID / GP Patient Survey', dataset: 'Adult Dental Health — Access to NHS Dental Services', url: 'https://www.gov.uk/government/organisations/office-for-health-improvement-and-disparities/about/statistics', date: '2025' },
  { num: 4, name: 'NHS BSA', dataset: 'NHS Dental Statistics for England', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics', date: '2025' },
  { num: 5, name: 'NHS England', dataset: 'Hospital Episode Statistics — Tooth Extractions in Children', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity', date: '2025' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DecayDisparityPoint {
  year: number;
  deprivedPct: number;
  affluentPct: number;
  ratio: number;
}

interface NhsDentistAccessPoint {
  year: number;
  unablePct: number;
}

interface NhsDentistWorkforcePoint {
  year: number;
  dentists: number;
  udaDeliveryPct: number;
}

interface ChildHospitalExtractionPoint {
  year: number;
  admissions: number;
}

interface OralHealthData {
  decayDisparity: DecayDisparityPoint[];
  nhsDentistAccess: NhsDentistAccessPoint[];
  nhsDentistWorkforce: NhsDentistWorkforcePoint[];
  childHospitalExtractions: ChildHospitalExtractionPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OralHealthInequalitiesPage() {
  const [data, setData] = useState<OralHealthData | null>(null);

  useEffect(() => {
    fetch('/data/oral-health-inequalities/oral_health_inequalities.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const decayDisparitySeries: Series[] = data
    ? [
        {
          id: 'deprived',
          label: 'Most deprived quintile',
          colour: '#E63946',
          data: data.decayDisparity.map(d => ({
            date: yearToDate(d.year),
            value: d.deprivedPct,
          })),
        },
        {
          id: 'affluent',
          label: 'Least deprived quintile',
          colour: '#2A9D8F',
          data: data.decayDisparity.map(d => ({
            date: yearToDate(d.year),
            value: d.affluentPct,
          })),
        },
      ]
    : [];

  const accessSeries: Series[] = data
    ? [{
        id: 'access',
        label: 'Adults unable to access NHS dentist (%)',
        colour: '#E63946',
        data: data.nhsDentistAccess.map(d => ({
          date: yearToDate(d.year),
          value: d.unablePct,
        })),
      }]
    : [];

  const extractionsSeries: Series[] = data
    ? [{
        id: 'extractions',
        label: 'Hospital admissions for child tooth extractions',
        colour: '#F4A261',
        data: data.childHospitalExtractions.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : [];

  // ── Derived metrics ──────────────────────────────────────────────────────

  const latestDecay = data?.decayDisparity[data.decayDisparity.length - 1];
  const latestAccess = data?.nhsDentistAccess[data.nhsDentistAccess.length - 1];
  const prevAccess = data?.nhsDentistAccess[data.nhsDentistAccess.length - 2];
  const latestWorkforce = data?.nhsDentistWorkforce[data.nhsDentistWorkforce.length - 1];
  const firstWorkforce = data?.nhsDentistWorkforce[0];

  const workforceLoss = latestWorkforce && firstWorkforce
    ? firstWorkforce.dentists - latestWorkforce.dentists
    : 4700;

  const accessChange = latestAccess && prevAccess
    ? latestAccess.unablePct - prevAccess.unablePct
    : 1;

  // ── Annotations ───────────────────────────────────────────────────────

  const decayAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID suspends dental surveys' },
  ];

  const accessAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: NHS dental services collapse' },
    { date: new Date(2022, 6, 1), label: '2022: Contract reform' },
  ];

  const extractionsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Elective procedures halted' },
  ];

  return (
    <>
      <TopicNav topic="Oral Health Inequalities" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Oral Health Inequalities"
          question="Is Oral Health Still Determined by Your Postcode?"
          finding="Children in the most deprived areas are three times as likely to have tooth decay as those in the most affluent — a gap that has remained virtually unchanged for over a decade. 43% of adults cannot access an NHS dentist when they need one, up from 14% in 2012. England has lost nearly 5,000 NHS dentists since 2012."
          colour="#E63946"
          preposition="in"
        />

        {/* Editorial context */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Oral health is one of the starkest markers of inequality in England. A child growing up in Blackpool, Knowsley, or Tower Hamlets is roughly three times as likely to arrive at school with visible tooth decay as a child in Hart, Waverley, or the Cotswolds. This is not a new problem. The ratio has hovered around 3:1 for over a decade<Cite nums={1} />, surviving multiple government strategies, dental contract reforms, and a pandemic that made everything worse. The gap is not narrowing because the structural drivers — poverty, diet, lack of fluoridated water, and a disintegrating NHS dental service — remain largely unaddressed. Only around 9% of England's population receives fluoridated water, compared with over 70% in the United States and nearly all of the Republic of Ireland.<Cite nums={2} /> The Health and Care Act 2022 gave the Secretary of State powers to expand fluoridation schemes, but no new schemes have been commissioned.
            </p>
            <p>
              The adult picture is equally bleak. In 2012, 14% of adults reported being unable to access an NHS dentist when they needed one. By 2025, that figure had risen to 43%<Cite nums={3} /> — a tripling in just over a decade. The cause is straightforward: NHS dentistry is funded through Units of Dental Activity (UDAs), a contract system introduced in 2006 that dentists and professional bodies have consistently described as unfit for purpose. It incentivises volume over prevention, pays dentists significantly less than private work, and has driven a steady exodus from NHS practice. England has lost nearly 5,000 NHS dentists since 2012, a decline of roughly 19%.<Cite nums={4} /> The 2022 contract reform made modest improvements to UDA values but fell far short of the fundamental restructuring the sector has demanded. Patients in coastal towns, rural areas, and deprived urban communities are disproportionately affected — dental deserts where no NHS dentist is accepting new patients now cover large parts of the country.
            </p>
            <p>
              Perhaps the most damning statistic is that tooth extraction under general anaesthetic remains the most common reason for hospital admission among children aged five to nine in England. Around 41,500 children were admitted in 2024/25 for the removal of decayed teeth<Cite nums={5} /> — a procedure that is almost entirely preventable with basic oral hygiene, reduced sugar consumption, and access to routine dental check-ups. The pandemic drove extraction numbers down temporarily as elective procedures were halted, but they have since climbed back towards pre-pandemic levels. Each admission costs the NHS an estimated 800 pounds, represents a day of school missed, and carries the small but real risks of general anaesthesia for a young child. This is not a failure of individual parenting. It is a failure of public health infrastructure that allows preventable disease to concentrate in communities that already bear the greatest burden of deprivation.
            </p>
          </div>

          <div className="mt-6">
            <References items={editorialRefs} />
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-disparity', label: 'Decay disparity' },
          { id: 'sec-access', label: 'NHS access' },
          { id: 'sec-extractions', label: 'Child extractions' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Child decay: deprived vs affluent"
            value={latestDecay ? `${latestDecay.ratio.toFixed(1)}:1` : '3.1:1'}
            unit="ratio"
            direction="flat"
            polarity="up-is-bad"
            changeText="persistent gap since 2012 · fluoridation covers only 9% of England"
            sparklineData={
              data ? data.decayDisparity.map(d => d.ratio) : [2.85, 3.0, 3.0, 3.0, 3.1, 3.1]
            }
            source="OHID — National Dental Epidemiology Programme, 2023"
            href="#sec-disparity"
          />
          <MetricCard
            label="Adults unable to access NHS dentist"
            value={latestAccess ? `${latestAccess.unablePct}%` : '43%'}
            direction="up"
            polarity="up-is-bad"
            changeText={`+${accessChange}pp year-on-year · up from 14% in 2012`}
            sparklineData={
              data ? sparkFrom(data.nhsDentistAccess.map(d => d.unablePct)) : []
            }
            source="OHID — Adult Dental Health Survey, 2025"
            href="#sec-access"
          />
          <MetricCard
            label="NHS dentists lost since 2012"
            value={workforceLoss.toLocaleString()}
            unit="fewer dentists"
            direction="down"
            polarity="down-is-bad"
            changeText={
              latestWorkforce && firstWorkforce
                ? `${firstWorkforce.dentists.toLocaleString()} in 2012 → ${latestWorkforce.dentists.toLocaleString()} in 2025 · −${Math.round((workforceLoss / firstWorkforce.dentists) * 100)}%`
                : '24,500 in 2012 → 19,800 in 2025 · −19%'
            }
            sparklineData={
              data ? sparkFrom(data.nhsDentistWorkforce.map(d => d.dentists)) : []
            }
            source="NHS BSA — NHS Dental Statistics, 2025"
            href="#sec-extractions"
          />
        </div>

        {/* Chart 1: Decay disparity */}
        <ScrollReveal>
          <div id="sec-disparity" className="mb-12">
            <LineChart
              series={decayDisparitySeries}
              annotations={decayAnnotations}
              title="Tooth decay in 5-year-olds by deprivation, England, 2012–2023"
              subtitle="Percentage of children with visible decay experience, most deprived vs least deprived IMD quintile."
              yLabel="Children with decay (%)"
              source={{
                name: 'OHID',
                dataset: 'National Dental Epidemiology Programme — Oral Health Survey of 5-year-old children',
                url: 'https://www.gov.uk/government/statistics/oral-health-survey-of-5-year-old-children',
                date: 'Nov 2025',
                frequency: 'biennial',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: NHS dentist access */}
        <ScrollReveal>
          <div id="sec-access" className="mb-12">
            <LineChart
              series={accessSeries}
              annotations={accessAnnotations}
              title="Adults unable to access NHS dentist when needed, England, 2012–2025"
              subtitle="Percentage of adults reporting they could not get an NHS dental appointment. Tripled in a decade."
              yLabel="Unable to access (%)"
              source={{
                name: 'OHID / GP Patient Survey',
                dataset: 'Adult Dental Health — Access to NHS Dental Services',
                url: 'https://www.gov.uk/government/statistics/oral-health-survey-of-adults-attending-dental-practices',
                date: 'Nov 2025',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Child hospital extractions */}
        <ScrollReveal>
          <div id="sec-extractions" className="mb-12">
            <LineChart
              series={extractionsSeries}
              annotations={extractionsAnnotations}
              title="Hospital admissions for child tooth extractions, England, 2012–2025"
              subtitle="Children admitted for extraction of decayed teeth under general anaesthetic. The most common reason for hospital admission in 5–9 year olds."
              yLabel="Admissions"
              source={{
                name: 'NHS England',
                dataset: 'Hospital Episode Statistics — Tooth Extractions in Children',
                url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity',
                date: 'Nov 2025',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Fluoridation works — where it exists"
            value="28% lower"
            unit="decay rates"
            description="In areas with fluoridated water supplies, tooth decay rates in children are approximately 28% lower than in non-fluoridated areas, with the benefit most pronounced in deprived communities. The Health and Care Act 2022 transferred responsibility for fluoridation decisions from local authorities to the Secretary of State for Health, removing one of the key barriers to expansion. Public Health England's 2018 monitoring report found no evidence of adverse health effects at the concentrations used in England (1 part per million). Birmingham, the West Midlands, and parts of the North East already benefit from fluoridation — the evidence base is well established. Expanding coverage to the rest of England could prevent tens of thousands of child hospital extractions each year."
            source="Source: PHE — Water Fluoridation Health Monitoring Report, 2022. OHID — National Dental Epidemiology Programme, 2023."
          />
        </ScrollReveal>

        {/* Sources & methodology */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/oral-health-survey-of-5-year-old-children" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                OHID — National Dental Epidemiology Programme
              </a> — child tooth decay surveys (biennial). Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-dental-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                NHS BSA — NHS Dental Statistics for England
              </a> — workforce, UDA delivery, patient volumes (annual). Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                NHS England — Hospital Episode Statistics
              </a> — child tooth extraction admissions (annual). Retrieved Nov 2025.
            </p>
            <p>
              <a href="https://www.gov.uk/government/publications/water-fluoridation-health-monitoring-report-for-england-2022" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                PHE / OHID — Water Fluoridation Health Monitoring Report
              </a> — fluoridation coverage and health outcomes (periodic). Retrieved Nov 2025.
            </p>
            <p className="mt-4">
              All figures are for England unless otherwise stated. Child decay data uses the Index of Multiple Deprivation (IMD) to define quintiles. COVID-19 disrupted dental services and surveys in 2020–2021; data for those years reflects reduced activity rather than reduced need. The 2022 NHS dental contract reform changed UDA targets, making pre/post comparisons of delivery rates approximate.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
