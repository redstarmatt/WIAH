'use client';

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

// UK deaths attributable to AMR, 2016–2024 — UKHSA / Global Burden of Disease
const amrDeathsValues = [5200, 5500, 5800, 6100, 6400, 6700, 6500, 6800, 7000];

// E. coli bloodstream infection resistance to 3rd-gen cephalosporins (%), 2016–2024 — UKHSA
const ecoliResistanceValues = [38, 39, 40, 41, 42, 43, 44, 45, 46];

// Antibiotic prescribing in primary care (millions of items), 2014–2024 — NHS England
const prescribingValues = [47.0, 46.8, 46.2, 45.1, 43.8, 41.2, 38.5, 36.1, 35.5, 35.2, 35.0];

const series1: Series[] = [
  {
    id: 'amr-deaths',
    label: 'UK deaths attributable to AMR',
    colour: '#E63946',
    data: amrDeathsValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
  },
  {
    id: 'ecoli-resistance',
    label: 'E. coli resistance rate (%)',
    colour: '#264653',
    data: ecoliResistanceValues.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v * 100 })),
  },
];

const series2: Series[] = [
  {
    id: 'prescribing',
    label: 'Antibiotic prescriptions (millions)',
    colour: '#2A9D8F',
    data: prescribingValues.map((v, i) => ({ date: new Date(2014 + i, 0, 1), value: v * 1000000 })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: UK National Action Plan on AMR launched' },
  { date: new Date(2020, 0, 1), label: '2020: COVID-19 — prescribing falls further' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'UKHSA', dataset: 'UK Antimicrobial Resistance Annual Report', url: 'https://www.gov.uk/government/collections/uk-antimicrobial-resistance-amr-annual-report', date: '2024' },
  { num: 2, name: 'Global Burden of Disease', dataset: 'Global mortality from bacterial AMR', date: '2019' },
  { num: 3, name: "O'Neill Review", dataset: 'Tackling Drug-Resistant Infections Globally', date: '2016' },
  { num: 4, name: 'NHS England', dataset: 'Primary Care Prescribing Analysis', url: 'https://www.england.nhs.uk/publication/primary-care-prescribing-data/', date: '2024' },
];

export default function AntibioticResistancePage() {
  return (
    <>
      <TopicNav topic="Antibiotic Resistance" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Antibiotic Resistance"
          question="Are antibiotics still working?"
          finding="Drug-resistant infections kill an estimated 7,000 people in the UK each year — and that number is rising. 46% of E. coli bloodstream infections are now resistant to standard antibiotics, up from 38% in 2016. Without action, AMR could kill 10 million people globally per year by 2050, more than cancer."
          colour="#264653"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Antimicrobial resistance (AMR) kills an estimated 7,000 people in the UK every year and was directly responsible for 1.27 million deaths globally in 2019 — more than HIV or malaria.<Cite nums={[1, 2]} /> Without concerted action, the O'Neill Review projects that figure will reach 10 million per year by 2050.<Cite nums={3} /> The mechanism is evolutionary: bacteria exposed to antibiotics that do not kill them develop resistance over generations. In England, the scale is already visible in routine surveillance data. Of all E. coli bloodstream infections — the most common bloodstream infection in the country — 46% are now resistant to third-generation cephalosporins, up from 38% in 2016.<Cite nums={1} /> When first-line antibiotics fail, patients must be treated with broader-spectrum drugs that are more expensive, have more side effects, and themselves drive further resistance in a worsening spiral. MRSA rates fell sharply from their mid-2000s peak but have begun rising again.<Cite nums={1} /></p>
            <p>The drivers of resistance span three interconnected systems. In human medicine, antibiotics have historically been overprescribed — for viral infections they cannot treat, or as a precaution rather than a diagnosis. Primary care prescribing in England has fallen significantly — from 47 million items in 2014 to around 35 million in 2024, one of the sharpest reductions in the developed world.<Cite nums={4} /> But this progress is being outpaced by global overuse, particularly in agriculture, where an estimated 60% of global antibiotic use occurs in livestock. In the environment, pharmaceutical manufacturing waste contaminates rivers with antibiotic residues, creating reservoirs of resistant bacteria. The pipeline has meanwhile run dry: no new antibiotic class has been successfully commercialised since the 1980s, because antibiotics are cheap, used sparingly by design, and rapidly rendered obsolete — making them among the least attractive investments in the pharmaceutical sector.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Deaths & resistance' },
          { id: 'sec-chart2', label: 'Prescribing' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="UK deaths attributable to AMR"
              value="7,000"
              unit="2024 est."
              direction="up"
              polarity="up-is-bad"
              changeText="+35% since 2016 · forecast to reach 10,000 by 2035"
              sparklineData={amrDeathsValues}
              source="UKHSA — UK AMR Indicators and Benchmarks 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="E. coli resistance to standard antibiotics"
              value="46%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 38% in 2016 · bloodstream infections · first-line drugs failing"
              sparklineData={ecoliResistanceValues}
              source="UKHSA — Bloodstream Infection Surveillance 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Antibiotic prescriptions (primary care)"
              value="35M"
              unit="2024"
              direction="down"
              polarity="up-is-bad"
              changeText="-26% since 2014 peak · one of the largest falls in Europe"
              sparklineData={prescribingValues}
              source="NHS England — Primary Care Prescribing Analysis 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK AMR deaths and E. coli resistance rate, 2016–2024"
              subtitle="Deaths attributable to antimicrobial resistance (red) and percentage of E. coli bloodstream infections resistant to 3rd-generation cephalosporins (blue, scaled). Both trending upward."
              series={series1}
              annotations={annotations}
              yLabel="Deaths / Resistance (scaled)"
              source={{ name: 'UKHSA', dataset: 'UK AMR Indicators; Bloodstream Infection Surveillance', url: 'https://www.gov.uk/government/collections/uk-antimicrobial-resistance-amr-annual-report', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Antibiotic prescribing in primary care, England, 2014–2024"
              subtitle="Total antibiotic items prescribed in NHS primary care settings (millions). Down 26% since the 2014 peak — a meaningful reduction, but global AMR continues to worsen."
              series={series2}
              annotations={[{ date: new Date(2019, 0, 1), label: '2019: NICE guidance on prescribing stewardship updated' }]}
              yLabel="Items prescribed"
              source={{ name: 'NHS England', dataset: 'Primary Care Prescribing Analysis', url: 'https://www.england.nhs.uk/publication/primary-care-prescribing-data/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="UK prescribing falls — and a new commercial model for antibiotics"
            value="-26%"
            unit="fall in primary care antibiotic prescribing since 2014"
            description="The UK's National Action Plan on AMR has delivered one of the largest reductions in antibiotic prescribing of any developed country — down 26% since the 2014 peak. The UK was also the first country to pilot a 'Netflix model' for antibiotic procurement: paying pharmaceutical companies an annual subscription fee for access to a new antibiotic, regardless of volume used. This delinks revenue from sales volume, reducing the commercial pressure to overprescribe. Two new antibiotics — cefiderocol and ceftazidime-avibactam — have been contracted under this model, securing UK access to drugs that are effective against some of the most resistant infections seen in NHS hospitals."
            source="Source: NHS England — Primary Care Prescribing Analysis 2024. DHSC — Antimicrobial Resistance National Action Plan 2024 progress report."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/uk-antimicrobial-resistance-amr-annual-report" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UKHSA — UK Antimicrobial Resistance Annual Report</a> — annual publication covering resistance rates, prescribing trends, and mortality estimates.</p>
            <p><a href="https://www.england.nhs.uk/publication/primary-care-prescribing-data/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Primary Care Prescribing Analysis</a> — monthly and annual antibiotic prescribing data by drug, setting, and geography.</p>
            <p>AMR death estimates combine deaths directly attributable to resistant infections with deaths where AMR was a contributing factor, using UKHSA surveillance and Global Burden of Disease methodology. E. coli resistance figures are from mandatory bloodstream infection surveillance. All figures are for England unless stated.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
