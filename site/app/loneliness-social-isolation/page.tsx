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

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'Holt-Lunstad et al.', dataset: 'Meta-analysis — loneliness equivalent to smoking 15 cigarettes/day', url: 'https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000316', date: '2015' },
  { num: 2, name: 'Jo Cox Commission on Loneliness', dataset: 'Combatting loneliness one conversation at a time', url: 'https://www.jocoxfoundation.org/', date: '2017' },
  { num: 3, name: 'DCMS', dataset: 'A Connected Society — government loneliness strategy', date: '2018' },
  { num: 4, name: 'ONS', dataset: 'Opinions and Lifestyle Survey — loneliness by age group', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing', date: '2024' },
  { num: 5, name: 'CIPFA / BBPA / YMCA', dataset: 'Public library statistics, pub closure data, youth service audits', date: '2024' },
  { num: 6, name: 'NHS England', dataset: 'Social prescribing referrals 2023/24', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', date: '2024' },
  { num: 7, name: 'UK Men\'s Sheds Association', dataset: 'Sheds network data', url: 'https://menssheds.org.uk/', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface PrevalencePoint {
  year: number;
  oftenAlwaysPct: number;
  sometimesPct: number;
}

interface AgeGroupPoint {
  year: number;
  age16to24: number;
  age25to34: number;
  age35to54: number;
  age55to69: number;
  age70plus: number;
}

interface InfrastructurePoint {
  year: number;
  pubs: number;
  libraries: number;
  youthCentres: number;
  communityCentres: number;
}

interface LonelinessData {
  prevalence: PrevalencePoint[];
  byAgeGroup: AgeGroupPoint[];
  socialInfrastructure: InfrastructurePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LonelinessSocialIsolationPage() {
  const [data, setData] = useState<LonelinessData | null>(null);

  useEffect(() => {
    fetch('/data/loneliness-social-isolation/loneliness_social_isolation.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const prevalenceSeries: Series[] = data
    ? [
        {
          id: 'often-always',
          label: 'Often / always lonely',
          colour: '#E63946',
          data: data.prevalence.map(d => ({
            date: yearToDate(d.year),
            value: d.oftenAlwaysPct,
          })),
        },
        {
          id: 'sometimes',
          label: 'Sometimes lonely',
          colour: '#F4A261',
          data: data.prevalence.map(d => ({
            date: yearToDate(d.year),
            value: d.sometimesPct,
          })),
        },
      ]
    : [];

  const ageGroupSeries: Series[] = data
    ? [
        {
          id: 'age-16-24',
          label: '16–24',
          colour: '#E63946',
          data: data.byAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age16to24,
          })),
        },
        {
          id: 'age-25-34',
          label: '25–34',
          colour: '#F4A261',
          data: data.byAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age25to34,
          })),
        },
        {
          id: 'age-55-69',
          label: '55–69',
          colour: '#2A9D8F',
          data: data.byAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age55to69,
          })),
        },
        {
          id: 'age-70-plus',
          label: '70+',
          colour: '#264653',
          data: data.byAgeGroup.map(d => ({
            date: yearToDate(d.year),
            value: d.age70plus,
          })),
        },
      ]
    : [];

  const infrastructureSeries: Series[] = data
    ? [
        {
          id: 'pubs',
          label: 'Pubs',
          colour: '#6B7280',
          data: data.socialInfrastructure.map(d => ({
            date: yearToDate(d.year),
            value: d.pubs,
          })),
        },
        {
          id: 'libraries',
          label: 'Libraries',
          colour: '#E63946',
          data: data.socialInfrastructure.map(d => ({
            date: yearToDate(d.year),
            value: d.libraries,
          })),
        },
        {
          id: 'youth-centres',
          label: 'Youth centres',
          colour: '#F4A261',
          data: data.socialInfrastructure.map(d => ({
            date: yearToDate(d.year),
            value: d.youthCentres,
          })),
        },
      ]
    : [];

  const latestPrevalence = data?.prevalence[data.prevalence.length - 1];
  const latestAge = data?.byAgeGroup[data.byAgeGroup.length - 1];
  const latestInfra = data?.socialInfrastructure[data.socialInfrastructure.length - 1];
  const firstInfra = data?.socialInfrastructure[0];

  const pubsLost = firstInfra && latestInfra
    ? (firstInfra.pubs - latestInfra.pubs).toLocaleString()
    : '13,500';
  const librariesLost = firstInfra && latestInfra
    ? (firstInfra.libraries - latestInfra.libraries).toLocaleString()
    : '1,330';

  return (
    <>
      <TopicNav topic="Mental Health & Wellbeing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health & Wellbeing"
          question="How many Britons feel lonely every day?"
          finding="Around 3.1 million adults in England report feeling lonely often or always — 7% of the population. Young people aged 16–24 are the loneliest age group at 10%, challenging the assumption that loneliness is primarily a problem of old age. The places where people once met — pubs, libraries, youth centres — are disappearing at an accelerating rate."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Loneliness is now recognised as a public health crisis on a scale comparable to smoking or obesity. Research consistently finds that chronic loneliness carries health risks equivalent to smoking 15 cigarettes a day, increasing the likelihood of heart disease by 29%, stroke by 32%, and dementia by 50%.<Cite nums={1} /> The UK became the first country in the world to appoint a Minister for Loneliness in 2018, following the work of the Jo Cox Commission on Loneliness — itself a legacy of the murdered MP who argued that loneliness was "the sad reality of modern life" and that "young or old, loneliness doesn't discriminate." The Commission's 2017 report revealed that over nine million people in the UK often or always feel lonely, and its recommendations led directly to the government's first loneliness strategy, <em>A Connected Society</em>, published in October 2018.<Cite nums={[2, 3]} />
            </p>
            <p>
              The age profile of loneliness confounds expectations. While public concern tends to focus on isolated elderly people — and their experience is real and serious — ONS data consistently shows that young adults aged 16–24 report the highest rates of chronic loneliness. In 2024, 10% of this age group said they felt lonely "often" or "always," nearly double the rate among those aged 55–69.<Cite nums={4} /> The COVID-19 pandemic supercharged these trends. Lockdowns severed the weak social ties — the casual pub conversation, the library reading group, the neighbour met at the school gate — that form the connective tissue of community life. For many young people, the pandemic hit during critical years for building social confidence and forming adult friendships. ONS data shows that loneliness rates among 16–24-year-olds nearly doubled from 7.4% in 2019 to 12.6% in 2021, and while they have since fallen, they remain well above pre-pandemic levels.<Cite nums={4} />
            </p>
            <p>
              Beneath the individual experience lies a structural story. The UK has lost over 13,500 pubs since 2010, more than 1,300 public libraries, and over 60% of its youth centres. Community centres have declined by more than a quarter.<Cite nums={5} /> These are not just buildings — they are the infrastructure of social connection, the places where people who would otherwise never meet form the loose bonds that protect against isolation. The closure of these spaces disproportionately affects deprived areas, where commercial alternatives are fewer and public transport makes travelling to remaining facilities harder. Social prescribing — GPs directing patients to community groups, walking clubs, and volunteering — has expanded rapidly, with over a million referrals in 2023/24, but prescribing connection is harder when the places to connect are themselves disappearing.<Cite nums={6} /> The Jo Cox Foundation continues to drive the agenda through its Great Get Together events, which have brought together over 15 million people since 2017, and initiatives such as the Men's Sheds movement — now with over 1,000 sheds across the UK — demonstrate that when community infrastructure is rebuilt, people come.<Cite nums={7} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-prevalence', label: 'Prevalence' },
          { id: 'sec-age', label: 'By age group' },
          { id: 'sec-infrastructure', label: 'Social infrastructure' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Adults lonely often / always"
            value={latestPrevalence ? `${latestPrevalence.oftenAlwaysPct}%` : '7%'}
            unit="~3.1 million"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 5.0% in 2016 · equivalent to 3.1 million adults"
            sparklineData={
              data ? sparkFrom(data.prevalence.map(d => d.oftenAlwaysPct)) : []
            }
            source="ONS · Opinions and Lifestyle Survey, 2024"
            href="#sec-prevalence"
          />
          <MetricCard
            label="Young people 16–24 lonely"
            value={latestAge ? `${latestAge.age16to24}%` : '10%'}
            unit="often / always"
            direction="up"
            polarity="up-is-bad"
            changeText="Highest of any age group · up from 6.1% in 2016"
            sparklineData={
              data ? sparkFrom(data.byAgeGroup.map(d => d.age16to24)) : []
            }
            source="ONS · Opinions and Lifestyle Survey, 2024"
            href="#sec-age"
          />
          <MetricCard
            label="Health impact"
            value="15 cigs/day"
            unit="equivalent risk"
            direction="up"
            polarity="up-is-bad"
            changeText="+29% heart disease risk · +32% stroke risk · +50% dementia risk"
            sparklineData={[]}
            source="Holt-Lunstad et al. · meta-analysis, 2015"
            href="#sec-prevalence"
          />
        </div>

        {/* Chart 1: Loneliness prevalence */}
        <ScrollReveal>
          <div id="sec-prevalence" className="mb-12">
            <LineChart
              series={prevalenceSeries}
              title="Loneliness prevalence, England, 2016–2024"
              subtitle="Percentage of adults reporting feeling lonely 'often/always' or 'sometimes'. COVID-19 drove a sharp increase; rates have not returned to pre-pandemic levels."
              yLabel="% of adults"
              source={{
                name: 'ONS',
                dataset: 'Opinions and Lifestyle Survey — Loneliness',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Loneliness by age group */}
        <ScrollReveal>
          <div id="sec-age" className="mb-12">
            <LineChart
              series={ageGroupSeries}
              title="Chronic loneliness by age group, England, 2016–2024"
              subtitle="Percentage reporting feeling lonely 'often' or 'always'. Young adults 16–24 are consistently the loneliest group."
              yLabel="% often/always lonely"
              source={{
                name: 'ONS',
                dataset: 'Opinions and Lifestyle Survey — Loneliness by Age',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Social infrastructure closures */}
        <ScrollReveal>
          <div id="sec-infrastructure" className="mb-12">
            <LineChart
              series={infrastructureSeries}
              title="Social infrastructure closures, UK, 2010–2024"
              subtitle={`Pubs, libraries, and youth centres — the places where people meet — are disappearing. ${pubsLost} pubs and ${librariesLost} libraries lost since 2010.`}
              yLabel="Number of venues"
              source={{
                name: 'CIPFA / BBPA / YMCA',
                dataset: 'Public library statistics, pub closure data, youth service audits',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Social prescribing and Men's Sheds rebuilding connection"
            value="1,000+ sheds"
            description="Social prescribing — where GPs refer patients to community activities rather than medication — has scaled rapidly across the NHS, with over one million referrals made in 2023/24 through link workers embedded in primary care networks. The Men's Sheds movement, which provides communal workshop spaces for men to build things and build friendships, has grown from a handful of locations in 2010 to over 1,000 across the UK, with evidence showing participants report significantly reduced loneliness and improved wellbeing. The Jo Cox Foundation's Great Get Together events have brought together more than 15 million people since 2017. These initiatives demonstrate that loneliness is not inevitable — when community infrastructure is intentionally rebuilt, people come."
            source="Source: NHS England — Social Prescribing referrals, 2023/24. UK Men's Sheds Association, 2024. Jo Cox Foundation, 2024."
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
