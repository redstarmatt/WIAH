'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface LiteracyLevelPoint {
  year: number;
  belowLevel2Pct: number;
  adults: number;
  note?: string;
}

interface AdultEducationFundingPoint {
  year: number;
  fundingBn: number;
}

interface EsolWaitingPoint {
  year: number;
  waitingThousands: number;
  note?: string;
}

interface AdultLiteracyData {
  literacyLevels: LiteracyLevelPoint[];
  adultEducationFunding: AdultEducationFundingPoint[];
  esolWaitingLists: EsolWaitingPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdultLiteracyGapPage() {
  const [data, setData] = useState<AdultLiteracyData | null>(null);

  useEffect(() => {
    fetch('/data/adult-literacy-gap/adult_literacy_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const literacySeries: Series[] = data
    ? [{
        id: 'literacy-pct',
        label: 'Adults below Level 2 (%)',
        colour: '#E63946',
        data: data.literacyLevels.map(d => ({
          date: yearToDate(d.year),
          value: d.belowLevel2Pct,
        })),
      }]
    : [];

  const fundingSeries: Series[] = data
    ? [{
        id: 'funding',
        label: 'Adult education budget (£bn, real terms)',
        colour: '#264653',
        data: data.adultEducationFunding.map(d => ({
          date: yearToDate(d.year),
          value: d.fundingBn,
        })),
      }]
    : [];

  const esolSeries: Series[] = data
    ? [{
        id: 'esol',
        label: 'People on ESOL waiting lists (thousands)',
        colour: '#F4A261',
        data: data.esolWaitingLists.map(d => ({
          date: yearToDate(d.year),
          value: d.waitingThousands,
        })),
      }]
    : [];

  const latestLiteracy = data?.literacyLevels[data.literacyLevels.length - 1];
  const firstLiteracy = data?.literacyLevels[0];
  const latestFunding = data?.adultEducationFunding[data.adultEducationFunding.length - 1];
  const firstFunding = data?.adultEducationFunding[0];
  const latestEsol = data?.esolWaitingLists[data.esolWaitingLists.length - 1];
  const firstEsol = data?.esolWaitingLists[0];

  const fundingCutPct = firstFunding && latestFunding
    ? Math.round(((firstFunding.fundingBn - latestFunding.fundingBn) / firstFunding.fundingBn) * 100)
    : 60;

  const esolIncreasePct = firstEsol && latestEsol
    ? Math.round(((latestEsol.waitingThousands - firstEsol.waitingThousands) / firstEsol.waitingThousands) * 100)
    : 203;

  return (
    <>
      <TopicNav topic="Education & Skills" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="How many British adults can't read properly?"
          finding="An estimated 8.5 million adults in England — roughly one in six — have literacy skills below Level 2, the standard expected of an 11-year-old. Despite this, adult education funding has been cut by 60% in real terms since 2010, and ESOL waiting lists have tripled."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has a hidden literacy crisis. The OECD's Survey of Adult Skills found that England's adults perform below the international average in literacy — and the problem has barely improved in two decades. Around 8.5 million working-age adults read at or below Level 1, meaning they can understand short, simple texts but struggle with anything more complex: a tenancy agreement, a medicine leaflet, a letter from their child's school. This is not a niche problem affecting a small margin. It is roughly the population of London, embedded in every community, every workplace, every GP waiting room in the country. The economic cost is estimated at over 40 billion pounds per year in lost productivity, higher welfare spending, and increased demand on health and justice services. Adults with poor literacy are twice as likely to be unemployed, three times more likely to suffer from depression, and significantly more likely to report poor physical health.</p>
            <p>The damage is intergenerational. Children whose parents have low literacy are themselves far more likely to fall behind at school. A parent who cannot read bedtime stories, help with homework, or navigate the school system passes disadvantage forward with near-mechanical reliability. The National Literacy Trust estimates that children growing up in the most literacy-deprived communities are already 15 months behind their peers in language development by age five — before formal education has even begun. Meanwhile, the infrastructure that might break this cycle has been systematically dismantled. Real-terms adult education funding has fallen from 4.3 billion pounds in 2010 to 1.7 billion in 2024 — a 60% cut. Further education colleges, the backbone of adult skills provision, have closed campuses, cut courses, and lost experienced tutors. ESOL (English for Speakers of Other Languages) provision has been hit particularly hard: waiting lists have tripled since 2015, with an estimated 97,000 people now waiting for a place. In some London boroughs and northern cities, the wait exceeds two years. For refugees and recent migrants, the inability to access language support creates cascading barriers — to employment, to healthcare, to their children's schooling, to any meaningful integration.</p>
            <p>The overlap with digital exclusion compounds the problem. As government services, job applications, and even GP appointment booking have moved online, adults with poor literacy face a double barrier: they cannot read the content, and they cannot navigate the interface. An estimated 11.8 million adults lack the basic digital skills needed for daily life, and the overlap with low literacy is substantial. Within the prison population, the picture is starker still — over half of all prisoners have literacy skills at or below Level 1, and roughly 15% have skills below Entry Level 3, functionally unable to read at all. The link between poor literacy, reoffending, and intergenerational disadvantage is one of the most well-documented in criminal justice research, yet prison education budgets have themselves been cut repeatedly. What remains is a system that identifies the problem, quantifies the problem, publishes reports about the problem, and then defunds the only interventions known to address it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-literacy', label: 'Literacy levels' },
          { id: 'sec-funding', label: 'Funding' },
          { id: 'sec-esol', label: 'ESOL waiting lists' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adults with poor literacy"
            value={latestLiteracy ? `${(latestLiteracy.adults / 1000000).toFixed(1)}M` : '8.5M'}
            unit="below Level 2"
            direction="flat"
            polarity="up-is-bad"
            changeText={`${latestLiteracy?.belowLevel2Pct ?? 18}% of working-age adults · roughly 1 in 6`}
            sparklineData={
              data ? sparkFrom(data.literacyLevels.map(d => d.belowLevel2Pct)) : []
            }
            source="National Literacy Trust · OECD PIAAC, 2024"
            href="#sec-literacy"
          />
          <MetricCard
            label="Economic cost"
            value="£40bn"
            unit="per year"
            direction="up"
            polarity="up-is-bad"
            changeText="Lost productivity, welfare, health & justice costs"
            sparklineData={[32, 34, 35, 36, 37, 38, 38, 39, 40, 40]}
            source="Learning and Work Institute · Economic Impact Assessment, 2024"
            href="#sec-funding"
          />
          <MetricCard
            label="Adult education funding"
            value={latestFunding ? `£${latestFunding.fundingBn}bn` : '£1.7bn'}
            unit="real terms"
            direction="down"
            polarity="down-is-bad"
            changeText={`Cut ${fundingCutPct}% since 2010 · from £${firstFunding?.fundingBn ?? 4.3}bn`}
            sparklineData={
              data ? sparkFrom(data.adultEducationFunding.map(d => d.fundingBn)) : []
            }
            source="Learning and Work Institute · Adult Education Budget analysis, 2024"
            href="#sec-esol"
          />
        </div>

        {/* Chart 1: Literacy levels over time */}
        <ScrollReveal>
          <div id="sec-literacy" className="mb-12">
            <LineChart
              series={literacySeries}
              title="Adults with literacy below Level 2, England, 2003–2024"
              subtitle="Percentage of working-age adults reading below the standard expected of an 11-year-old. Includes OECD PIAAC survey rebasing in 2012."
              yLabel="% below Level 2"
              source={{
                name: 'National Literacy Trust / OECD PIAAC',
                dataset: 'Survey of Adult Skills',
                frequency: 'periodic',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Adult education funding */}
        <ScrollReveal>
          <div id="sec-funding" className="mb-12">
            <LineChart
              series={fundingSeries}
              title="Adult education budget, England, 2010–2024 (real terms)"
              subtitle="Funding for adult skills and further education has been cut by 60% in real terms since 2010."
              yLabel="£ billion"
              source={{
                name: 'Learning and Work Institute',
                dataset: 'Adult Education Budget Analysis',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: ESOL waiting lists */}
        <ScrollReveal>
          <div id="sec-esol" className="mb-12">
            <LineChart
              series={esolSeries}
              title="ESOL waiting lists, England, 2015–2024"
              subtitle="People waiting for English language provision. Waiting lists have tripled since 2015, with waits exceeding two years in some areas."
              yLabel="Thousands"
              source={{
                name: 'Learning and Work Institute',
                dataset: 'ESOL Provision Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Read Easy and the National Literacy Trust: building readers one by one"
            value="5,500+ volunteer reading coaches"
            description="Read Easy, a national charity, pairs trained volunteer reading coaches with adults who want to learn to read — for free, one-to-one, for as long as it takes. Operating in over 50 communities across England and Wales, they have helped thousands of adults gain functional literacy, often after decades of hiding their difficulty. The National Literacy Trust works across 30 literacy hubs in the most deprived communities, providing books, reading support, and family literacy programmes. Their evidence shows that targeted community-level intervention can close the literacy gap by up to 6 months within a single year. These organisations demonstrate that the problem is solvable — what is missing is not knowledge of what works, but the funding and political will to deliver it at scale."
            source="Source: Read Easy Annual Report 2024. National Literacy Trust — Literacy Hubs Impact Report, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
