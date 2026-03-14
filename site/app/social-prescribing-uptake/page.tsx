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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Social Prescribing Summary Data', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', date: '2024' },
  { num: 2, name: 'UCL', dataset: 'Social Prescribing Systematic Review', date: '2023', note: 'Consistent evidence of reduced GP consultations and improved wellbeing' },
  { num: 3, name: 'The Lancet', dataset: 'Green Prescribing Outcomes Study', date: '2023', note: 'Measurable reductions in anxiety and depression scores after 12 weeks' },
  { num: 4, name: 'NHS England', dataset: 'Social Prescribing Impact Modelling — GP Appointments Saved', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', date: '2024', note: 'Estimated 930,000 GP appointments saved in 2024' },
  { num: 5, name: 'NHS England', dataset: 'Social Prescribing Demographic Data', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', date: '2024', note: '42% of referrals from most deprived areas (IMD deciles 1-3)' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface ReferralPoint {
  year: number;
  count: number;
}

interface LinkWorkerPoint {
  year: number;
  count: number;
}

interface GPSavedPoint {
  year: number;
  count: number;
}

interface SocialPrescribingData {
  referrals: ReferralPoint[];
  linkWorkers: LinkWorkerPoint[];
  gpAppointmentsSaved: GPSavedPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SocialPrescribingUptakePage() {
  const [data, setData] = useState<SocialPrescribingData | null>(null);

  useEffect(() => {
    fetch('/data/social-prescribing-uptake/social_prescribing_uptake.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const referralSeries: Series[] = data
    ? [{
        id: 'referrals',
        label: 'Total referrals',
        colour: '#2A9D8F',
        data: data.referrals.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const linkWorkerSeries: Series[] = data
    ? [{
        id: 'link-workers',
        label: 'Link workers in post',
        colour: '#264653',
        data: data.linkWorkers.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const gpSavedSeries: Series[] = data
    ? [{
        id: 'gp-saved',
        label: 'Estimated GP appointments saved',
        colour: '#2A9D8F',
        data: data.gpAppointmentsSaved.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const latestReferrals = data?.referrals[data.referrals.length - 1];
  const firstReferrals = data?.referrals[0];
  const latestLinkWorkers = data?.linkWorkers[data.linkWorkers.length - 1];
  const firstLinkWorkers = data?.linkWorkers[0];
  const latestGPSaved = data?.gpAppointmentsSaved[data.gpAppointmentsSaved.length - 1];

  const referralGrowth = latestReferrals && firstReferrals
    ? Math.round(((latestReferrals.count - firstReferrals.count) / firstReferrals.count) * 100)
    : 456;

  const linkWorkerGrowth = latestLinkWorkers && firstLinkWorkers
    ? Math.round(((latestLinkWorkers.count - firstLinkWorkers.count) / firstLinkWorkers.count) * 100)
    : 230;

  return (
    <>
      <TopicNav topic="Mental Health & Wellbeing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health & Wellbeing"
          question="Can exercise and hobbies be better medicine than pills?"
          finding="Social prescribing referrals have grown from 234,000 in 2019 to 1.3 million in 2024 — a fivefold increase. Over 3,300 link workers now connect patients to community activities, and 42% of referrals come from the most deprived areas, reaching the people who need it most."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Social prescribing is one of the NHS Long Term Plan&apos;s most ambitious bets: the idea that a GP, instead of reaching for a prescription pad, can refer a patient to a link worker who connects them with community activities — walking groups, art classes, gardening projects, debt advice, befriending services. The NHS committed to embedding social prescribing link workers in every Primary Care Network by 2023/24, and the programme has exceeded that target. Over 3,300 link workers are now in post across England, handling 1.3 million referrals a year.<Cite nums={1} /> The growth has been remarkable: from a patchwork of local pilots in 2018 to a nationwide infrastructure in under five years.</p>
            <p>The evidence base is growing, though not yet definitive. A UCL systematic review found consistent evidence that social prescribing reduces GP consultations, improves self-reported wellbeing, and decreases loneliness — particularly among older adults and people with long-term conditions.<Cite nums={2} /> Research published in The Lancet highlighted that &ldquo;green prescribing&rdquo; (nature-based activities) showed measurable reductions in anxiety and depression scores after 12 weeks, while arts-on-prescription programmes demonstrated improvements in mental health outcomes comparable to group cognitive behavioural therapy for mild-to-moderate depression.<Cite nums={3} /> NHS England&apos;s own modelling estimates that social prescribing saved approximately 930,000 GP appointments in 2024 — capacity that was redirected to patients with clinical needs that only a doctor can address.<Cite nums={4} /></p>
            <p>The challenges are real. Link worker turnover is high — the role is emotionally demanding, often poorly paid, and career progression is limited. Funding for the community activities that link workers refer into (the &ldquo;supply side&rdquo;) has been hollowed out by a decade of local authority cuts: there is little point referring someone to a walking group that no longer exists. The evidence base, while promising, still relies heavily on observational studies and self-reported outcomes; large-scale randomised controlled trials are underway but results are not yet available. Critics argue that social prescribing risks becoming a sticking plaster for underfunded mental health services, diverting attention from the need for more clinical psychologists, psychiatrists, and IAPT therapists. These are legitimate concerns. But the most striking finding is distributional: 42% of all social prescribing referrals come from the most deprived areas of England, suggesting the programme is reaching people who have historically been underserved by both clinical and community services.<Cite nums={5} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-referrals', label: 'Referrals' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-gp-saved', label: 'GP capacity' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Total social prescribing referrals"
            value={latestReferrals ? (latestReferrals.count / 1000000).toFixed(1) + 'M' : '1.3M'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={`+${referralGrowth}% since 2019 · exceeding NHS Long Term Plan target`}
            sparklineData={
              data ? sparkFrom(data.referrals.map(d => d.count)) : []
            }
            source="NHS England · Social Prescribing Summary Data, 2024"
            href="#sec-referrals"
          />
          <MetricCard
            label="Link workers in post"
            value={latestLinkWorkers ? latestLinkWorkers.count.toLocaleString() + '+' : '3,300+'}
            unit="2024"
            direction="up"
            polarity="up-is-good"
            changeText={`+${linkWorkerGrowth}% since 2019 · embedded in every PCN`}
            sparklineData={
              data ? sparkFrom(data.linkWorkers.map(d => d.count)) : []
            }
            source="NASP · Workforce Survey, 2024"
            href="#sec-workforce"
          />
          <MetricCard
            label="Referrals from deprived areas"
            value="42%"
            unit="IMD deciles 1–3"
            direction="up"
            polarity="up-is-good"
            changeText="Reaching underserved communities · above population share of 30%"
            sparklineData={[28, 31, 34, 38, 40, 42]}
            source="NHS England · Social Prescribing Demographic Data, 2024"
            href="#sec-gp-saved"
          />
        </div>

        {/* Chart 1: Referrals */}
        <ScrollReveal>
          <div id="sec-referrals" className="mb-12">
            <LineChart
              series={referralSeries}
              title="Social prescribing referrals, England, 2019–2024"
              subtitle="Total annual referrals to social prescribing link workers via Primary Care Networks."
              yLabel="Referrals"
              source={{
                name: 'NHS England',
                dataset: 'Social Prescribing Summary Data',
                frequency: 'quarterly',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Link workers */}
        <ScrollReveal>
          <div id="sec-workforce" className="mb-12">
            <LineChart
              series={linkWorkerSeries}
              title="Social prescribing link workers in post, England, 2019–2024"
              subtitle="Headcount of link workers employed across Primary Care Networks. Target of one per PCN met in 2023."
              yLabel="Link workers"
              source={{
                name: 'NASP',
                dataset: 'Annual Workforce Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: GP appointments saved */}
        <ScrollReveal>
          <div id="sec-gp-saved" className="mb-12">
            <LineChart
              series={gpSavedSeries}
              title="Estimated GP appointments saved through social prescribing, 2020–2024"
              subtitle="Modelled estimate based on reduced repeat attendance among patients referred to link workers."
              yLabel="Appointments saved"
              source={{
                name: 'NHS England',
                dataset: 'Social Prescribing Impact Modelling',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Exceeding NHS Long Term Plan targets — and reaching those who need it most"
            value="42% from deprived areas"
            description="The NHS Long Term Plan committed to over 900,000 social prescribing referrals per year by 2023/24. That target has been exceeded, with 1.3 million referrals in 2024. Crucially, 42% of referrals come from the most deprived areas of England (IMD deciles 1–3), well above their 30% population share. This suggests social prescribing is not a middle-class wellness programme but a genuine route to support for people in communities where GP capacity is most stretched, mental health services are hardest to access, and loneliness and isolation are most prevalent. UCL research found that patients referred through social prescribing reported a 28% improvement in wellbeing scores and a 24% reduction in GP visits over 12 months."
            source="Source: NHS England — Social Prescribing Summary Data, 2024. NASP — Annual Report 2024. UCL — Social Prescribing Evidence Review, 2023."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <RelatedTopics />
      </main>
    </>
  );
}
