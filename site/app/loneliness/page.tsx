'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface LonelinessPoint {
  year: number;
  pctOftenAlways: number;
}

interface AgeGroupPoint {
  ageGroup: string;
  pctLonely: number;
}

interface LifeCircumstancePoint {
  circumstance: string;
  pctLonely: number;
}

interface LonelinessData {
  lonelinessPrevalence: LonelinessPoint[];
  byAgeGroup: AgeGroupPoint[];
  byLifeCircumstance: LifeCircumstancePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LonelinessPage() {
  const [data, setData] = useState<LonelinessData | null>(null);

  useEffect(() => {
    fetch('/data/loneliness/loneliness.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Chronic loneliness prevalence
  const prevalenceSeries: Series[] = data
    ? [{
        id: 'lonely',
        label: 'Adults reporting loneliness often or always (%)',
        colour: '#6B7280',
        data: data.lonelinessPrevalence.map(d => ({
          date: yearToDate(d.year),
          value: d.pctOftenAlways,
        })),
      }]
    : [];

  const prevalenceAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: 'COVID-19 lockdowns' },
  ];

  return (
    <main>
      <TopicNav topic="Loneliness" />

      <TopicHeader
        topic="Loneliness"
        colour="#6B7280"
        question="How many people are lonely in Britain?"
        finding="Around 3.8 million adults in England say they are chronically lonely, and loneliness carries health risks equivalent to smoking 15 cigarettes a day &mdash; yet public spending on the problem remains negligible."
      />

      {/* Metric cards */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <MetricCard
            label="Adults chronically lonely"
            value="3.8M"
            unit="people"
            polarity="up-is-bad"
            direction="up"
            changeText="9% of adults; up since pandemic"
            onExpand={() => {}}
          />
          <MetricCard
            label="Young people (16-24) lonely often/always"
            value="27"
            unit="%"
            polarity="up-is-bad"
            direction="up"
            changeText="Highest of any age group"
            onExpand={() => {}}
          />
          <MetricCard
            label="Estimated economic cost of loneliness per lonely person"
            value="&pound;9,900"
            unit="per year"
            polarity="up-is-bad"
            direction="up"
            changeText="Total NHS cost: &pound;2.4bn/year"
            onExpand={() => {}}
          />
        </div>
      </section>

      {/* Chart 1: Loneliness prevalence */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <LineChart
              title="Adults reporting loneliness often or always, England"
              subtitle="Percentage. Community Life Survey / ONS. &ldquo;Often/always&rdquo; corresponds to chronic loneliness."
              series={prevalenceSeries}
              annotations={prevalenceAnnotations}
              yLabel="Percentage (%)"
              source={{
                name: 'ONS',
                dataset: 'Community Life Survey',
                date: 'March 2026',
                frequency: 'Annual'
              }}
            />
          </section>
        </ScrollReveal>
      )}

      {/* Chart 2: By age group */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Percentage reporting loneliness, by age group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Community Life Survey / ONS</p>
            
            <div className="space-y-3">
              {data.byAgeGroup.map((item) => (
                <div key={item.ageGroup} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-mono text-wiah-black">{item.ageGroup}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="h-6 bg-wiah-grey rounded"
                      style={{
                        width: `${(item.pctLonely / 30) * 100}%`,
                        backgroundColor: '#6B7280',
                      }}
                    />
                    <div className="w-12 text-right font-mono text-sm font-bold text-wiah-black">
                      {item.pctLonely}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Chart 3: By life circumstance */}
      {data && (
        <ScrollReveal>
          <section className="max-w-5xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Loneliness prevalence by life circumstance</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Community Life Survey / ONS</p>
            
            <div className="space-y-3">
              {data.byLifeCircumstance.map((item) => (
                <div key={item.circumstance} className="flex items-center gap-4">
                  <div className="w-44 text-sm font-mono text-wiah-black">{item.circumstance}</div>
                  <div className="flex-1 flex items-center gap-3">
                    <div
                      className="h-6 bg-wiah-grey rounded"
                      style={{
                        width: `${(item.pctLonely / 40) * 100}%`,
                        backgroundColor: '#6B7280',
                      }}
                    />
                    <div className="w-12 text-right font-mono text-sm font-bold text-wiah-black">
                      {item.pctLonely}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Context section */}
      <section id="sec-context" className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-base text-wiah-black leading-[1.7] space-y-4">
          <p>Around 3.8 million adults in England &mdash; roughly 9% &mdash; report feeling lonely often or always. The figure that most surprises people is where loneliness is concentrated: young adults aged 16&ndash;24 have the highest rates, at around 27%, far above older age groups. Rates rose sharply during the pandemic and have not fully recovered. This is not a condition of old age and physical frailty alone; it is something that runs across the life course, with distinct causes at each stage.</p>
          <p>The health consequences are well-documented and serious. Chronic loneliness is associated with a 26% higher risk of premature death, comparable in effect to smoking 15 cigarettes a day. It accelerates cognitive decline, raises the risk of cardiovascular disease and depression, and appears to drive chronic inflammation through measurable physiological pathways. The estimated cost to the NHS runs to around &pound;2.4 billion a year &mdash; through increased GP visits, mental health presentations, and earlier onset of long-term conditions.</p>
          <p>The UK appointed the world&apos;s first Minister for Loneliness in 2018, and published a national strategy in 2021. Social prescribing &mdash; connecting patients to community activities rather than clinical services &mdash; has grown significantly. But the structural drivers are harder to address through policy. Trade union membership, religious attendance, and civic association participation have all declined over decades. Single-person households now account for 31% of all households. Car-centric urban design has systematically dismantled the incidental social contact that denser, walkable neighbourhoods generate.</p>
          <p>Loneliness is not evenly distributed geographically, and its causes vary sharply by place. Rural isolation &mdash; driven by poor transport, closed pubs and post offices, and dispersed populations &mdash; differs structurally from urban alienation, where people live densely but without connection. Certain groups are consistently overrepresented: unpaid carers who have withdrawn from work and social life, new parents navigating identity loss alongside physical exhaustion, bereaved people whose social networks often contract after loss, and disabled people for whom physical access and employment barriers compound social exclusion.</p>
          <p>The data has real limits worth stating plainly. Loneliness is self-reported, which means measurement is shaped by how willing people are to admit to it &mdash; a threshold that varies by age, gender, and cultural context. The surveys also cannot always distinguish between being alone and feeling lonely: solitude chosen freely is not the same experience as isolation imposed by circumstance. Critically, the evidence base on what interventions actually work remains thin. Social prescribing is promising but poorly evaluated at scale. The honest position is that we can measure the problem with reasonable confidence; we cannot yet say with the same confidence how to solve it.</p>
            <p>Library closures fall hardest on those with fewest alternatives. Older adults lose a social lifeline; children from low-income families lose their only access to books and quiet study space; homeless people lose daytime refuge, warmth, and toilet facilities. The emergence of 2,200 libraries as registered warm spaces in winter 2022&ndash;23 is a damning indictment &mdash; public buildings repurposed to prevent hypothermia because people cannot afford to heat their homes. Volunteer-run libraries, however well-intentioned, cannot replicate the professional services that qualified librarians delivered: structured job search support, digital skills training, ESOL classes, mental health signposting, and legal aid clinics. Councils that closed libraries to save &pound;30,000&ndash;&pound;80,000 per branch per year now spend more commissioning fragmented outreach services that reach fewer people. The logic of austerity destroyed integrated community infrastructure that cannot be cheaply rebuilt.</p>
            <p>CIPFA&apos;s annual library statistics &mdash; the primary source for branch counts, visits, and spending &mdash; are self-reported by local authorities, and completeness varies significantly year to year. Several councils have declined to participate entirely since 2019, creating gaps in the dataset. The definition of a &ldquo;branch&rdquo; is ambiguous: some authorities count mobile library stops and home delivery services as branches, others do not, making like-for-like comparisons unreliable. Visit figures rely on footfall counters that not all branches have installed, and methodologies for estimating uncounted visits differ between authorities. Digital loan data is only partially captured because some e-lending platforms, notably those operated by third-party providers, do not report usage back to the library service. The Libraries Act 1964&apos;s statutory duty to provide a &ldquo;comprehensive and efficient&rdquo; service has never been tested or defined in court, leaving the legal standard effectively meaningless.</p>
        </div>
      </section>

      {/* Positive callout */}
      <ScrollReveal>
        <section className="max-w-5xl mx-auto px-6 py-12">
          <PositiveCallout
            title="What&apos;s improving"
            value="Social prescribing"
            unit="now available in most GP practices"
            description="Social prescribing &mdash; where GPs refer patients to community activities, befriending services, or support groups rather than medication &mdash; is now available in most GP practices in England. NHS England plans to have a link worker in every PCN. Early evidence shows reduced GP appointments, lower antidepressant prescribing, and improved wellbeing scores."
            source="Source: NHS England &mdash; Social Prescribing 2024."
          />
        </section>
      </ScrollReveal>

      {/* Section nav */}
      <SectionNav sections={[
        { id: 'sec-context', label: 'Context' },
      ]} />
    </main>
  );
}
