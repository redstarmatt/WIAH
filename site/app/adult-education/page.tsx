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

interface ParticipationPoint {
  year: number;
  rate: number;
}

interface AebFundingPoint {
  year: number;
  realTermsBn: number;
}

interface EnrolmentPoint {
  year: number;
  entryAndLevel1: number;
  level2: number;
  level3: number;
  level4Plus: number;
}

interface AdultEducationData {
  participation: ParticipationPoint[];
  aebFunding: AebFundingPoint[];
  enrolmentsByLevel: EnrolmentPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdultEducationPage() {
  const [data, setData] = useState<AdultEducationData | null>(null);

  useEffect(() => {
    fetch('/data/adult-education/adult_education.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const participationSeries: Series[] = data
    ? [{
        id: 'participation',
        label: 'Adult learning participation (%)',
        colour: '#E63946',
        data: data.participation.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const aebFundingSeries: Series[] = data
    ? [{
        id: 'aeb-funding',
        label: 'AEB funding (real terms, \u00A3bn)',
        colour: '#E63946',
        data: data.aebFunding.map(d => ({
          date: yearToDate(d.year),
          value: d.realTermsBn,
        })),
      }]
    : [];

  const enrolmentSeries: Series[] = data
    ? [
        {
          id: 'entry-level1',
          label: 'Entry & Level 1',
          colour: '#6B7280',
          data: data.enrolmentsByLevel.map(d => ({
            date: yearToDate(d.year),
            value: d.entryAndLevel1,
          })),
        },
        {
          id: 'level2',
          label: 'Level 2',
          colour: '#F4A261',
          data: data.enrolmentsByLevel.map(d => ({
            date: yearToDate(d.year),
            value: d.level2,
          })),
        },
        {
          id: 'level3',
          label: 'Level 3',
          colour: '#2A9D8F',
          data: data.enrolmentsByLevel.map(d => ({
            date: yearToDate(d.year),
            value: d.level3,
          })),
        },
        {
          id: 'level4plus',
          label: 'Level 4+',
          colour: '#264653',
          data: data.enrolmentsByLevel.map(d => ({
            date: yearToDate(d.year),
            value: d.level4Plus,
          })),
        },
      ]
    : [];

  const latestParticipation = data?.participation[data.participation.length - 1];
  const peakParticipation = data?.participation[0];

  const latestEnrolments = data?.enrolmentsByLevel[data.enrolmentsByLevel.length - 1];
  const totalEnrolments = latestEnrolments
    ? latestEnrolments.entryAndLevel1 + latestEnrolments.level2 + latestEnrolments.level3 + latestEnrolments.level4Plus
    : 2275000;
  const firstEnrolments = data?.enrolmentsByLevel[0];
  const firstTotal = firstEnrolments
    ? firstEnrolments.entryAndLevel1 + firstEnrolments.level2 + firstEnrolments.level3 + firstEnrolments.level4Plus
    : 3110000;

  const latestFunding = data?.aebFunding[data.aebFunding.length - 1];
  const peakFunding = data?.aebFunding[0];
  const fundingCutPct = peakFunding && latestFunding
    ? Math.round(((peakFunding.realTermsBn - latestFunding.realTermsBn) / peakFunding.realTermsBn) * 100)
    : 51;

  return (
    <>
      <TopicNav topic="Education & Skills" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="Are adults actually learning?"
          finding="Adult learning participation has fallen from 20% to 15% since 2010. The Adult Education Budget has been cut by half in real terms. Nine million adults lack basic digital skills, and ESOL waiting lists stretch to two years in some areas."
          colour="#2A9D8F"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has a quiet crisis in adult education. Since 2010, the Adult Education Budget has been cut by around 50% in real terms, falling from approximately {'\u00A3'}4.3 billion to {'\u00A3'}2.1 billion. The consequences are visible in every measure that matters: participation in adult learning has dropped from one in five adults to fewer than one in six, further education enrolments have fallen by over a quarter, and hundreds of community learning centres have closed. The people most affected are those who can least afford it — adults without Level 2 qualifications, those in insecure work, and communities in post-industrial towns where the further education college was often the only route to retraining. Employer investment in training has declined in parallel: the proportion of employers providing training fell from 66% in 2011 to 60% in 2022, and total hours of training per employee dropped by nearly a quarter over the same period.</p>
            <p>The digital skills gap compounds the problem. An estimated nine million adults in England lack basic digital skills — the ability to send an email, fill in an online form, or use a search engine safely. As public services, banking, and job applications have moved online, this gap has become a barrier not just to employment but to participation in daily life. ESOL (English for Speakers of Other Languages) provision has been hit particularly hard; waiting lists in London and other major cities stretch to eighteen months or two years, leaving hundreds of thousands of residents unable to access the language skills that underpin everything from employment to healthcare access. The regional dimension is stark: adult participation rates in London are nearly double those in parts of the North East and East Midlands, reflecting both the concentration of providers and the legacy of deindustrialisation.</p>
            <p>There are signs of policy recognition, though they operate against a backdrop of deep structural cuts. The Lifetime Skills Guarantee, introduced in 2021, offers free Level 3 qualifications (equivalent to A-levels) to adults who do not already hold one, and Level 3 enrolments have shown modest growth since it took effect. Skills Bootcamps — intensive 12-to-16-week courses in software development, data analytics, HGV driving, and green construction — have enrolled over 70,000 learners since their launch, with employer co-investment designed to link training directly to job outcomes. Devolution of the Adult Education Budget to mayoral combined authorities has given some regions more flexibility over how funds are spent. But these targeted programmes cannot offset the scale of core funding loss. The green transition alone will require an estimated 480,000 workers in insulation, heat pump installation, and renewable energy — skills that barely exist at scale in the current workforce. The gap between what the economy demands and what the adult skills system can deliver continues to widen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-participation', label: 'Participation' },
          { id: 'sec-funding', label: 'AEB funding' },
          { id: 'sec-enrolments', label: 'Enrolments' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adult learning participation"
            value={latestParticipation ? `${latestParticipation.rate}%` : '15.4%'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestParticipation && peakParticipation
                ? `Down from ${peakParticipation.rate}% in ${peakParticipation.year} \u00B7 ${Math.round(((peakParticipation.rate - latestParticipation.rate) / peakParticipation.rate) * 100)}% decline`
                : 'Down from 20.1% in 2010 \u00B7 23% decline'
            }
            sparklineData={
              data ? sparkFrom(data.participation.map(d => d.rate)) : []
            }
            source="Learning and Work Institute \u00B7 Adult Participation in Learning Survey, 2024"
            href="#sec-participation"
          />
          <MetricCard
            label="FE enrolments (all levels)"
            value={`${(totalEnrolments / 1000000).toFixed(1)}M`}
            unit="2023/24"
            direction="down"
            polarity="up-is-good"
            changeText={`Down from ${(firstTotal / 1000000).toFixed(1)}M in 2015 \u00B7 ${Math.round(((firstTotal - totalEnrolments) / firstTotal) * 100)}% decline`}
            sparklineData={
              data ? sparkFrom(data.enrolmentsByLevel.map(d =>
                d.entryAndLevel1 + d.level2 + d.level3 + d.level4Plus
              )) : []
            }
            source="DfE \u00B7 Individualised Learner Record, 2023/24"
            href="#sec-enrolments"
          />
          <MetricCard
            label="AEB funding (real terms)"
            value={latestFunding ? `\u00A3${latestFunding.realTermsBn}bn` : '\u00A32.1bn'}
            unit="2024"
            direction="down"
            polarity="up-is-good"
            changeText={`Down ${fundingCutPct}% in real terms since 2010 \u00B7 from \u00A3${peakFunding?.realTermsBn ?? 4.3}bn`}
            sparklineData={
              data ? sparkFrom(data.aebFunding.map(d => d.realTermsBn)) : []
            }
            source="ESFA \u00B7 Adult Education Budget allocations, 2024 (real terms, 2024 prices)"
            href="#sec-funding"
          />
        </div>

        {/* Chart 1: Participation rate */}
        <ScrollReveal>
          <div id="sec-participation" className="mb-12">
            <LineChart
              series={participationSeries}
              title="Adult learning participation rate, England, 2010\u20132024"
              subtitle="Percentage of adults who have participated in learning in the last three years. Steady decline driven by funding cuts and provider closures."
              yLabel="Participation (%)"
              source={{
                name: 'Learning and Work Institute',
                dataset: 'Adult Participation in Learning Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: AEB funding in real terms */}
        <ScrollReveal>
          <div id="sec-funding" className="mb-12">
            <LineChart
              series={aebFundingSeries}
              title="Adult Education Budget in real terms, England, 2010\u20132024"
              subtitle="AEB funding adjusted for inflation (2024 prices). Halved in real terms since 2010, from \u00A34.3bn to \u00A32.1bn."
              yLabel="\u00A3 billion (real terms)"
              source={{
                name: 'ESFA',
                dataset: 'Adult Education Budget allocations',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Enrolments by level */}
        <ScrollReveal>
          <div id="sec-enrolments" className="mb-12">
            <LineChart
              series={enrolmentSeries}
              title="Further education enrolments by level, England, 2015\u20132024"
              subtitle="Entry & Level 1 and Level 2 enrolments have fallen sharply. Level 3 has seen modest growth since the Lifetime Skills Guarantee."
              yLabel="Enrolments"
              source={{
                name: 'DfE',
                dataset: 'Individualised Learner Record (ILR)',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Lifetime Skills Guarantee and Skills Bootcamps expanding access"
            value="70,000+ bootcamp learners"
            description="The Lifetime Skills Guarantee, introduced in April 2021, funds free Level 3 qualifications for any adult who does not already hold one — covering subjects from engineering to social care. Since its launch, Level 3 enrolments have shown modest growth, reversing years of decline at that level. Skills Bootcamps — intensive 12-to-16-week courses in software development, data analytics, HGV driving, green construction, and cybersecurity — have enrolled over 70,000 learners, with employers required to co-invest and offer interviews to completers. Completion-to-employment rates have averaged around 72%. While these programmes cannot offset the scale of core AEB funding cuts, they represent a targeted, outcomes-linked approach to closing specific skills gaps."
            source="Source: DfE \u2014 Lifetime Skills Guarantee statistics, 2024. ESFA \u2014 Skills Bootcamps outcomes data, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
