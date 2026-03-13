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

interface InternetAccessPoint {
  year: number;
  lowestQuintile: number;
  secondQuintile: number;
  thirdQuintile: number;
  fourthQuintile: number;
  highestQuintile: number;
}

interface DigitalSkillsPoint {
  year: number;
  lackingBasicSkills: number;
  zeroDigitalSkills: number;
}

interface SocialTariffPoint {
  year: number;
  eligibleMillions: number;
  takeUpPercent: number;
  takeUpMillions: number;
}

interface HouseholdsOfflinePoint {
  year: number;
  millions: number;
}

interface BroadbandAffordabilityPoint {
  year: number;
  strugglingMillions: number;
}

interface DigitalDivideData {
  internetAccessByIncome: InternetAccessPoint[];
  digitalSkillsGap: DigitalSkillsPoint[];
  socialTariffTakeUp: SocialTariffPoint[];
  householdsWithoutInternet: HouseholdsOfflinePoint[];
  broadbandAffordability: BroadbandAffordabilityPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DigitalDivideInequalityPage() {
  const [data, setData] = useState<DigitalDivideData | null>(null);

  useEffect(() => {
    fetch('/data/digital-divide-inequality/digital_divide_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const internetAccessSeries: Series[] = data
    ? [
        {
          id: 'lowest-quintile',
          label: 'Lowest income quintile',
          colour: '#E63946',
          data: data.internetAccessByIncome.map(d => ({
            date: yearToDate(d.year),
            value: d.lowestQuintile,
          })),
        },
        {
          id: 'middle-quintile',
          label: 'Middle income quintile',
          colour: '#F4A261',
          data: data.internetAccessByIncome.map(d => ({
            date: yearToDate(d.year),
            value: d.thirdQuintile,
          })),
        },
        {
          id: 'highest-quintile',
          label: 'Highest income quintile',
          colour: '#2A9D8F',
          data: data.internetAccessByIncome.map(d => ({
            date: yearToDate(d.year),
            value: d.highestQuintile,
          })),
        },
      ]
    : [];

  const digitalSkillsSeries: Series[] = data
    ? [
        {
          id: 'lacking-basic',
          label: 'Lacking basic digital skills (millions)',
          colour: '#E63946',
          data: data.digitalSkillsGap.map(d => ({
            date: yearToDate(d.year),
            value: d.lackingBasicSkills,
          })),
        },
        {
          id: 'zero-skills',
          label: 'Zero digital skills (millions)',
          colour: '#6B7280',
          data: data.digitalSkillsGap.map(d => ({
            date: yearToDate(d.year),
            value: d.zeroDigitalSkills,
          })),
        },
      ]
    : [];

  const socialTariffSeries: Series[] = data
    ? [
        {
          id: 'eligible',
          label: 'Eligible households (millions)',
          colour: '#6B7280',
          data: data.socialTariffTakeUp.map(d => ({
            date: yearToDate(d.year),
            value: d.eligibleMillions,
          })),
        },
        {
          id: 'take-up',
          label: 'Take-up rate (%)',
          colour: '#2A9D8F',
          data: data.socialTariffTakeUp.map(d => ({
            date: yearToDate(d.year),
            value: d.takeUpPercent,
          })),
        },
      ]
    : [];

  const latestOffline = data?.householdsWithoutInternet[data.householdsWithoutInternet.length - 1];
  const latestSkills = data?.digitalSkillsGap[data.digitalSkillsGap.length - 1];
  const prevSkills = data?.digitalSkillsGap[data.digitalSkillsGap.length - 2];
  const latestAffordability = data?.broadbandAffordability[data.broadbandAffordability.length - 1];
  const prevAffordability = data?.broadbandAffordability[data.broadbandAffordability.length - 2];

  const skillsChange = latestSkills && prevSkills
    ? ((latestSkills.lackingBasicSkills - prevSkills.lackingBasicSkills) / prevSkills.lackingBasicSkills * 100).toFixed(1)
    : '-3.7';

  const affordabilityChange = latestAffordability && prevAffordability
    ? ((latestAffordability.strugglingMillions - prevAffordability.strugglingMillions) / prevAffordability.strugglingMillions * 100).toFixed(0)
    : '+6';

  return (
    <>
      <TopicNav topic="Infrastructure & Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Who's being left behind by the internet?"
          finding="Over 3 million UK households still have no internet access, 7.9 million adults lack basic digital skills, and only 5% of eligible households take up discounted social tariffs — even as government services go digital-first and assume universal connectivity."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK government has spent the last decade moving public services online. Universal Credit, tax self-assessment, GP appointment booking, school admissions, parking permits, voter registration — the list of services that now assume internet access is long and growing. The efficiency gains are real. But the assumption underpinning this shift — that everyone can get online — is wrong. Around 3.1 million households remain entirely offline, concentrated among older people, those on low incomes, people with disabilities, and rural communities where broadband infrastructure remains poor. The digital divide is not a technology problem. It is a poverty and inequality problem wearing a technology label.
            </p>
            <p>
              The correlation between income and internet access is stark and persistent. In 2024, virtually all households in the highest income quintile had internet access. In the lowest quintile, the figure was 87% — a gap that has narrowed but never closed. Among adults aged 75 and over, around 40% are still offline. COVID-19 accelerated digital adoption out of necessity — millions had no choice but to learn video calling, online shopping, and remote health services. But it also exposed who was being left behind. Children without devices or reliable broadband fell behind at school. Older people unable to book vaccine appointments online were dependent on family or neighbours. The pandemic did not create the digital divide; it made it dangerous. Meanwhile, 7.9 million adults still lack what Ofcom defines as basic digital skills — the ability to send an email, fill in an online form, or assess whether a website is trustworthy. These are not niche capabilities; they are prerequisites for participation in modern Britain.
            </p>
            <p>
              One policy lever already exists but remains almost entirely unused. Social tariffs — discounted broadband packages for people on Universal Credit or Pension Credit — are offered by most major providers at around ten to fifteen pounds per month. Yet take-up sits at roughly 5%, with only 240,000 of the 4.8 million eligible households signed up. Awareness is low, the application process is often cumbersome, and some providers do not actively promote their social tariffs. There is also a growing cohort of smartphone-only internet users — people who access the web exclusively through a phone, without a laptop or home broadband. Smartphone-only access makes it significantly harder to complete complex tasks like benefit applications, job searches with CV uploads, or online learning. Digital inclusion hubs run by libraries and organisations like Good Things Foundation provide free access and skills training, and evidence suggests they work — but funding is inconsistent and demand far outstrips supply. Until connectivity and capability are treated as utilities rather than luxuries, millions of people will remain locked out of services designed for everyone.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-access', label: 'Internet access' },
          { id: 'sec-skills', label: 'Digital skills' },
          { id: 'sec-tariffs', label: 'Social tariffs' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Households without internet"
            value={latestOffline ? `${latestOffline.millions}M` : '3.1M'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 7.1M in 2012 · still 3.1M offline · concentrated among over-75s and low incomes"
            sparklineData={
              data ? sparkFrom(data.householdsWithoutInternet.map(d => d.millions)) : []
            }
            source="Ofcom · Adults' Media Literacy Tracker, 2024"
            href="#sec-access"
          />
          <MetricCard
            label="Adults lacking basic digital skills"
            value={latestSkills ? `${latestSkills.lackingBasicSkills}M` : '7.9M'}
            unit="2024"
            direction="down"
            polarity="up-is-bad"
            changeText={`${skillsChange}% year-on-year · down from 12.6M in 2015 · still 2.4M with zero digital skills`}
            sparklineData={
              data ? sparkFrom(data.digitalSkillsGap.map(d => d.lackingBasicSkills)) : []
            }
            source="Lloyds Bank · Consumer Digital Index, 2024"
            href="#sec-skills"
          />
          <MetricCard
            label="Struggling with broadband costs"
            value={latestAffordability ? `${latestAffordability.strugglingMillions}M` : '1.9M'}
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={`Up ${affordabilityChange}% · social tariff take-up only 5% · 4.8M eligible`}
            sparklineData={
              data ? sparkFrom(data.broadbandAffordability.map(d => d.strugglingMillions)) : []
            }
            source="Ofcom · Affordability of Communications Services, 2024"
            href="#sec-tariffs"
          />
        </div>

        {/* Chart 1: Internet access by income quintile */}
        <ScrollReveal>
          <div id="sec-access" className="mb-12">
            <LineChart
              series={internetAccessSeries}
              title="Household internet access by income quintile, UK, 2012–2024"
              subtitle="Percentage of households with internet access. The gap has narrowed but never closed."
              yLabel="% of households"
              source={{
                name: 'ONS',
                dataset: 'Internet Access — Households and Individuals',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Digital skills gap */}
        <ScrollReveal>
          <div id="sec-skills" className="mb-12">
            <LineChart
              series={digitalSkillsSeries}
              title="Adults lacking digital skills, UK, 2015–2024"
              subtitle="Millions of adults lacking basic digital skills or with no digital skills at all."
              yLabel="Millions of adults"
              source={{
                name: 'Lloyds Bank',
                dataset: 'Consumer Digital Index',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Social tariff take-up */}
        <ScrollReveal>
          <div id="sec-tariffs" className="mb-12">
            <LineChart
              series={socialTariffSeries}
              title="Broadband social tariff eligibility and take-up, UK, 2021–2024"
              subtitle="Millions eligible vs actual take-up rate. Only 5% of eligible households are signed up."
              yLabel="Millions / %"
              source={{
                name: 'Ofcom',
                dataset: 'Affordability of Communications Services',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Social tariffs and digital inclusion hubs offer a path forward"
            value="5% take-up"
            description="Broadband social tariffs are available from most major providers at around ten to fifteen pounds per month, offering a lifeline for low-income households. Take-up has grown from 1.2% in 2021 to 5.1% in 2024, but 4.6 million eligible households are still missing out. Meanwhile, over 3,000 digital inclusion hubs — run through libraries and organisations like Good Things Foundation — provide free internet access, devices, and skills training. Evaluations show participants gain confidence with essential online tasks within six to eight sessions. Scaling these programmes and simplifying social tariff sign-up could close the gap faster than any infrastructure rollout."
            source="Source: Ofcom — Affordability of Communications Services, 2024. Good Things Foundation — Digital Inclusion Impact Report, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
