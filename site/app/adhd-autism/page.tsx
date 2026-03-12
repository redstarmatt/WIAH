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

interface AutismWaitingPoint {
  year: number;
  waiting: number;
}

interface AdhdReferralPoint {
  year: number;
  referrals: number;
  note?: string;
}

interface RegionalWaitPoint {
  year: number;
  region: string;
  months: number;
}

interface AdhdAutismData {
  autismWaitingList: AutismWaitingPoint[];
  adhdReferrals: AdhdReferralPoint[];
  averageWaitByRegion: RegionalWaitPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdhdAutismPage() {
  const [data, setData] = useState<AdhdAutismData | null>(null);

  useEffect(() => {
    fetch('/data/adhd-autism/adhd_autism.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const autismWaitingSeries: Series[] = data
    ? [{
        id: 'autism-waiting',
        label: 'People waiting for autism assessment',
        colour: '#E63946',
        data: data.autismWaitingList.map(d => ({
          date: yearToDate(d.year),
          value: d.waiting,
        })),
      }]
    : [];

  const adhdReferralSeries: Series[] = data
    ? [{
        id: 'adhd-referrals',
        label: 'ADHD referrals per year',
        colour: '#264653',
        data: data.adhdReferrals.map(d => ({
          date: yearToDate(d.year),
          value: d.referrals,
        })),
      }]
    : [];

  const regions = ['National average', 'London', 'South East', 'North West', 'West Midlands', 'North East'];
  const regionColours: Record<string, string> = {
    'National average': '#1A1A1A',
    'London': '#264653',
    'South East': '#2A9D8F',
    'North West': '#E63946',
    'West Midlands': '#F4A261',
    'North East': '#6B7280',
  };

  const regionalWaitSeries: Series[] = data
    ? regions.map(region => ({
        id: `wait-${region}`,
        label: region,
        colour: regionColours[region] || '#6B7280',
        data: data.averageWaitByRegion
          .filter(d => d.region === region)
          .map(d => ({
            date: yearToDate(d.year),
            value: d.months,
          })),
      }))
    : [];

  const latestWaiting = data?.autismWaitingList[data.autismWaitingList.length - 1];
  const firstWaiting = data?.autismWaitingList[0];
  const latestReferrals = data?.adhdReferrals[data.adhdReferrals.length - 1];
  const firstReferrals = data?.adhdReferrals[0];
  const latestNationalWait = data?.averageWaitByRegion.find(
    d => d.region === 'National average' && d.year === 2024
  );
  const firstNationalWait = data?.averageWaitByRegion.find(
    d => d.region === 'National average' && d.year === 2018
  );

  const waitingChange = latestWaiting && firstWaiting
    ? Math.round(((latestWaiting.waiting - firstWaiting.waiting) / firstWaiting.waiting) * 100)
    : 246;

  const referralChange = latestReferrals && firstReferrals
    ? Math.round(((latestReferrals.referrals - firstReferrals.referrals) / firstReferrals.referrals) * 100)
    : 150;

  return (
    <>
      <TopicNav topic="Mental Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health"
          question="Why is it so hard to get an ADHD or autism diagnosis?"
          finding="The autism assessment waiting list has tripled since 2016 to 187,000 people. ADHD referrals have surged 150% in six years, overwhelming services that were never resourced for this level of demand. Average waits now exceed three years in some regions."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England is in the middle of a diagnostic waiting crisis for ADHD and autism that shows no sign of resolving. As of 2024, approximately 187,000 people are waiting for an autism assessment through the NHS — a figure that has more than tripled since 2016 — while ADHD referral volumes have risen from around 80,000 per year in 2018 to over 200,000 in 2024. These are not small percentage shifts in a stable system. They represent a fundamental mismatch between the number of people seeking diagnosis and the capacity of services to provide one. NICE guidelines state that autism assessments should begin within three months of referral. In practice, the national average wait is now 37 months, and in some areas of the North East and North West it exceeds three and a half years.
            </p>
            <p>
              Several forces are driving this surge simultaneously. Greater public awareness — accelerated by social media during the pandemic — has led more adults to recognise neurodivergent traits in themselves and seek formal assessment. The Right to Choose policy, which allows patients to request referral to any qualified provider including private clinics, has opened a parallel pathway that is faster but unevenly accessed: those who can afford to pay or navigate the system get diagnosed in weeks; those who cannot wait years. Women and girls remain systematically underdiagnosed. Research consistently shows that autism in women is masked by social camouflaging, and ADHD in girls presents more often as inattention than hyperactivity, meaning both conditions are missed by screening tools calibrated on male presentations. The average age of ADHD diagnosis for women is 36 — typically decades after symptoms first caused difficulties at school and work. Among adults who do eventually receive a diagnosis, the most common reaction is not relief but grief: grief for the years of struggle that could have been understood and supported, for the jobs lost, relationships damaged, and educational opportunities missed.
            </p>
            <p>
              The consequences of these waits are not abstract. Adults waiting years for an ADHD assessment report deteriorating mental health, job loss, and relationship breakdown. Children waiting for autism diagnosis miss the window for early intervention that evidence shows is most effective. Schools are legally required to support children with special educational needs regardless of diagnosis, but in practice many refuse to make adjustments without a formal assessment — creating a circular trap where the child cannot get support without a diagnosis they cannot access. NICE guidelines on ADHD management, updated in 2023 for the first time since 2008, recommend a whole-life-course approach, yet most adult services were commissioned for a fraction of current demand. Shared care prescribing arrangements — where GPs continue medication initiated by specialists — remain inconsistent, with roughly a third of Integrated Care Boards refusing or delaying them. Until diagnostic services are funded to match actual demand, the waiting list will continue to grow, and hundreds of thousands of people will remain stuck in a system that recognises their need but cannot meet it.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-autism-waiting', label: 'Autism waiting list' },
          { id: 'sec-adhd-referrals', label: 'ADHD referrals' },
          { id: 'sec-regional-waits', label: 'Regional waits' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Waiting for autism assessment"
            value={latestWaiting ? latestWaiting.waiting.toLocaleString() : '187,000'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${waitingChange}% since 2016 · tripled in eight years`}
            sparklineData={
              data ? sparkFrom(data.autismWaitingList.map(d => d.waiting)) : []
            }
            source="NHS Digital · Mental Health Services Dataset, 2024"
            href="#sec-autism-waiting"
          />
          <MetricCard
            label="ADHD referrals per year"
            value={latestReferrals ? latestReferrals.referrals.toLocaleString() : '200,000'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`+${referralChange}% since 2018 · demand far exceeds capacity`}
            sparklineData={
              data ? sparkFrom(data.adhdReferrals.map(d => d.referrals)) : []
            }
            source="NHS Digital · Mental Health Services Dataset, 2024"
            href="#sec-adhd-referrals"
          />
          <MetricCard
            label="Average wait for assessment"
            value={latestNationalWait ? `${latestNationalWait.months}` : '37'}
            unit="months (2024)"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestNationalWait && firstNationalWait
                ? `Up from ${firstNationalWait.months} months in 2018 · NICE target: 3 months`
                : 'Up from 16 months in 2018 · NICE target: 3 months'
            }
            sparklineData={
              data
                ? data.averageWaitByRegion
                    .filter(d => d.region === 'National average')
                    .map(d => d.months)
                : []
            }
            source="NHS Digital · MHSDS referral-to-treatment, 2024"
            href="#sec-regional-waits"
          />
        </div>

        {/* Chart 1: Autism waiting list */}
        <ScrollReveal>
          <div id="sec-autism-waiting" className="mb-12">
            <LineChart
              series={autismWaitingSeries}
              title="People waiting for autism assessment, England, 2016–2024"
              subtitle="Total number on NHS autism diagnostic pathway waiting list. Tripled since 2016."
              yLabel="People waiting"
              source={{
                name: 'NHS Digital',
                dataset: 'Mental Health Services Dataset (MHSDS)',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: ADHD referrals */}
        <ScrollReveal>
          <div id="sec-adhd-referrals" className="mb-12">
            <LineChart
              series={adhdReferralSeries}
              title="ADHD referrals per year, England, 2018–2024"
              subtitle="New referrals with suspected ADHD. Dipped during COVID-19 then surged past pre-pandemic levels."
              yLabel="Referrals"
              source={{
                name: 'NHS Digital',
                dataset: 'Mental Health Services Dataset (MHSDS)',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Regional wait times */}
        <ScrollReveal>
          <div id="sec-regional-waits" className="mb-12">
            <LineChart
              series={regionalWaitSeries}
              title="Average wait for neurodevelopmental assessment by region, 2018–2024"
              subtitle="Median months from referral to first diagnostic appointment. NICE guideline target is 3 months."
              yLabel="Months"
              source={{
                name: 'NHS Digital',
                dataset: 'MHSDS referral-to-treatment waiting times',
                frequency: 'monthly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Right to Choose and Oliver McGowan Training"
            value="1.4M staff trained"
            description="Two structural changes offer genuine progress. The Right to Choose policy allows patients to request referral to any qualified provider — including private services funded by the NHS — bypassing local waiting lists. While access remains uneven, it has expanded diagnostic capacity and forced recognition that NHS provision alone is insufficient. Separately, the Oliver McGowan Mandatory Training on Learning Disability and Autism is now the required standard for all health and social care staff in England. Named after Oliver McGowan, whose death in 2016 was caused by failures in understanding his autism and learning disability, the programme ensures that every NHS and care worker receives training co-delivered by autistic people and people with learning disabilities. By early 2026, over 1.4 million staff had completed the training — the largest autism-specific workforce programme in NHS history."
            source="Source: NHS England — Right to Choose guidance, 2023. Health Education England — Oliver McGowan Mandatory Training, 2026. NAO — Services for people with autism, 2024."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
