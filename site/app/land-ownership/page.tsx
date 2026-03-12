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

// ── Types ────────────────────────────────────────────────────────────────────

interface RegistrationPoint {
  year: number;
  registeredPct: number;
}

interface OverseasPoint {
  date: string;
  registeredEntities: number;
  propertiesHeld: number;
}

interface AgLandPoint {
  year: number;
  avgPricePerAcre: number;
}

interface LandOwnershipData {
  national: {
    landRegistryRegistrations: {
      timeSeries: RegistrationPoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    overseasEntities: {
      timeSeries: OverseasPoint[];
      latestDate: string;
      latestEntities: number;
      latestProperties: number;
      note: string;
    };
    agriculturalLandPrices: {
      timeSeries: AgLandPoint[];
      latestYear: number;
      latestPrice: number;
      note: string;
    };
  };
  summary: {
    unregisteredLandPct: number;
    landBankPlots: number;
    publicAccessPct: number;
    overseasProperties: number;
    latestAgLandPrice: number;
    aristocracyOwnershipPct: number;
    corporateOwnedProperties: number;
    churchAcres: number;
    scotlandAccessPct: number;
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function parseMonthDate(d: string): Date {
  const [year, month] = d.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LandOwnershipPage() {
  const [data, setData] = useState<LandOwnershipData | null>(null);

  useEffect(() => {
    fetch('/data/land-ownership/land_ownership.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const registrationSeries: Series[] = data
    ? [{
        id: 'registered',
        label: 'Land with registered title (%)',
        colour: '#264653',
        data: data.national.landRegistryRegistrations.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.registeredPct,
        })),
      }]
    : [];

  const overseasEntitiesSeries: Series[] = data
    ? [{
        id: 'properties',
        label: 'Properties held by overseas entities',
        colour: '#E63946',
        data: data.national.overseasEntities.timeSeries.map(d => ({
          date: parseMonthDate(d.date),
          value: d.propertiesHeld,
        })),
      },
      {
        id: 'entities',
        label: 'Registered overseas entities',
        colour: '#264653',
        data: data.national.overseasEntities.timeSeries.map(d => ({
          date: parseMonthDate(d.date),
          value: d.registeredEntities,
        })),
      }]
    : [];

  const agLandSeries: Series[] = data
    ? [{
        id: 'agland',
        label: 'Average price per acre (£)',
        colour: '#F4A261',
        data: data.national.agriculturalLandPrices.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.avgPricePerAcre,
        })),
      }]
    : [];

  const registrationAnnotations: Annotation[] = [
    { date: new Date(1990, 5, 1), label: '1990: Compulsory registration introduced' },
    { date: new Date(2014, 5, 1), label: '2014: Land Registry digital transformation begins' },
  ];

  const overseasAnnotations: Annotation[] = [
    { date: new Date(2022, 7, 1), label: '2022: Register of Overseas Entities launched' },
  ];

  const agLandAnnotations: Annotation[] = [
    { date: new Date(2007, 5, 1), label: '2007: Food price crisis — institutional investor interest surges' },
    { date: new Date(2016, 5, 1), label: '2016: Brexit vote — market uncertainty' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Land Ownership" parentTopic="Housing" parentHref="/housing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Land Ownership"
          question="Who Actually Owns England?"
          finding="Approximately half of England is owned by less than 1% of the population, 17% of land has no publicly registered owner, and corporate and offshore ownership has surged — yet the full picture of who holds the nation's land remains deliberately opaque."
          colour="#264653"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England's land ownership structure is among the most concentrated in the developed world. Roughly 50% of the country is owned by fewer than 1% of the population — a pattern with roots stretching back to the Norman Conquest and reinforced by centuries of enclosure, inheritance law and agricultural subsidy. The aristocracy still holds an estimated 30% of land. The Crown Estate, Forestry Commission and Ministry of Defence are the largest institutional landowners, while the Church of England controls 105,000 acres. Agricultural land accounts for 70% of England's surface, much of it held in large estates that have remained in the same families for generations. Despite compulsory registration being introduced in 1990, approximately 17% of land in England and Wales has no registered owner at HM Land Registry — a gap largely explained by exemptions for land that has not changed hands since registration became mandatory, benefiting historic estates that have held their land longest.
            </p>
            <p>
              Corporate and offshore ownership has added a new dimension to the opacity. Before the Register of Overseas Entities was introduced in 2022, an estimated 100,000 properties in England and Wales were held by companies registered in secrecy jurisdictions — from the British Virgin Islands to Jersey — with no requirement to disclose beneficial owners. The housing market consequences of concentrated ownership are direct and measurable: major housebuilders hold land banks of over one million plots with planning permission, a practice critics call strategic land-banking that inflates prices by restricting supply. When agricultural land receives planning permission its value can increase 100-fold or more, yet the UK captures only around 25% of this land value uplift for public benefit, compared with 90% in the Netherlands. Meanwhile, public access to land remains strikingly limited — the Countryside and Rights of Way Act 2000 opened just 8% of England to the right to roam, compared with 97% of land in Scotland following the Land Reform Act 2003. The question of who owns the land, and who benefits from it, sits beneath almost every other policy debate — from housing affordability to food security to biodiversity.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-registration', label: 'Registration' },
          { id: 'sec-overseas', label: 'Overseas Ownership' },
          { id: 'sec-agland', label: 'Agricultural Land' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Land with no registered owner"
              value="17%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Of England & Wales · Despite compulsory registration since 1990"
              sparklineData={[42, 39, 35, 31, 28, 24, 21, 19, 17]}
              href="#sec-registration"
            />
            <MetricCard
              label="Plots held in developer land banks"
              value="1.1M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="With planning permission · Top 10 housebuilders hold 400,000+"
              sparklineData={[680, 720, 790, 850, 920, 980, 1040, 1080, 1100]}
              href="#sec-agland"
            />
            <MetricCard
              label="England open to public access"
              value="8%"
              unit=""
              direction="neutral"
              polarity="down-is-bad"
              changeText="CRoW Act 2000 · Scotland: 97% · No expansion since 2000"
              sparklineData={[8, 8, 8, 8, 8, 8, 8, 8, 8]}
              href="#sec-agland"
            />
          </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-registration" className="mb-12">
            <LineChart
              title="Land Registry registrations, England & Wales, 2000–2024"
              subtitle="Percentage of land area with registered title at HM Land Registry. Despite compulsory registration since 1990, progress is slow — land that has not changed hands remains unregistered."
              series={registrationSeries}
              annotations={registrationAnnotations}
              yLabel="% registered"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-overseas" className="mb-12">
            <LineChart
              title="Overseas entity property ownership, 2022–2025"
              subtitle="Properties held by overseas companies registered under the Register of Overseas Entities (Economic Crime Act 2022). Both registered entities and total properties disclosed have grown rapidly since launch."
              series={overseasEntitiesSeries}
              annotations={overseasAnnotations}
              yLabel="Count"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-agland" className="mb-12">
            <LineChart
              title="Agricultural land prices per acre, England, 2000–2024"
              subtitle="Average price per acre of agricultural land (arable and pasture combined). Prices have quadrupled since 2000, driven by institutional investment, food security concerns and development hope value."
              series={agLandSeries}
              annotations={agLandAnnotations}
              yLabel="£ per acre"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Register of Overseas Entities"
            unit=""
            description="The Register of Overseas Entities, introduced in 2022, has brought transparency to 32,000+ properties held by offshore companies. Land Registry digital services now process 95% of applications online, reducing average completion from 6 weeks to 8 days."
            source="Source: Companies House — Register of Overseas Entities statistics 2025; HM Land Registry annual report 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
