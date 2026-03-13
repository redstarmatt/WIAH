'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Missing from electoral roll (millions), 2015–2023 — Electoral Commission
const missingValues = [7.5, 7.6, 7.7, 7.8, 8.0, 8.1, 8.0, 8.1, 8.0];

// Under-25 unregistered (%), 2015–2023 — Electoral Commission
const under25Values = [34, 34, 34, 35, 35, 35, 34, 35, 34];

const registrationSeries: Series[] = [
  {
    id: 'missing',
    label: 'Missing from electoral roll (millions)',
    colour: '#E63946',
    data: missingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
  {
    id: 'under-25',
    label: 'Under-25s unregistered (%)',
    colour: '#6B7280',
    data: under25Values.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const missingOnlySeries: Series[] = [
  {
    id: 'missing',
    label: 'Missing from electoral roll (millions)',
    colour: '#E63946',
    data: missingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: Individual Voter Registration introduced' },
  { date: new Date(2023, 0, 1), label: '2023: Voter ID requirements begin' },
];

export default function ElectoralRegistrationGapPage() {
  return (
    <>
      <TopicNav topic="Electoral Registration Gap" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Electoral Registration Gap"
          question="How Many People Can't Vote?"
          finding="An estimated 8 million people are missing from the electoral roll — disproportionately young people, private renters, and those from ethnic minority backgrounds. The gap has barely narrowed in a decade."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 8 million people in the UK are eligible to vote but are not registered — a figure that has remained stubbornly high for over a decade despite the Individual Voter Registration system introduced in 2014. Voter ID requirements brought in for the 2023 local elections and 2024 general election added a further barrier: an estimated 2 million registered voters lack the required photographic ID. Scotland and Wales have moved toward more proactive registration models; England has not, and the Electoral Commission has repeatedly called for reform and more resources for Electoral Registration Officers.</p>
            <p>The gap falls hardest on already-marginalised groups. Young people aged 18–24 are most likely to be unregistered (around 34%), private renters underregister because each move requires a new application, and people from ethnic minority backgrounds are around 11 percentage points less likely to be on the roll than white British voters. Unregistered citizens are also excluded from jury service and some credit checks; campaign resources follow registered voter data, meaning unregistered communities receive less political attention, compounding their disengagement from democratic life.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Registration gap' },
          { id: 'sec-chart2', label: 'Missing voters' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Missing from electoral roll"
              value="8M"
              unit="people"
              direction="flat"
              polarity="up-is-bad"
              changeText="Unchanged for a decade · IVR system not working"
              sparklineData={[7.5, 7.6, 7.7, 7.8, 8.0, 8.1, 8.0, 8.0]}
              source="Electoral Commission · Annual Report 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Under-25 unregistered"
              value="34%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="1 in 3 young people not on the register"
              sparklineData={[34, 34, 34, 35, 35, 34, 35, 34]}
              source="Electoral Commission · 2023"
              href="#sec-chart1"
            />
            <MetricCard
              label="Ethnic minority registration gap"
              value="11pp"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Lower registration among ethnic minority communities"
              sparklineData={[11, 11, 11, 11, 11, 11, 11, 11]}
              source="Electoral Commission · Diversity Report 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Electoral registration gap, UK, 2015–2023"
              subtitle="Estimated millions missing from the electoral roll and percentage of under-25s unregistered. Both have been broadly flat for a decade."
              series={registrationSeries}
              annotations={annotations}
              yLabel="Value"
              source={{ name: 'Electoral Commission', dataset: 'UK Electoral Registers', url: 'https://www.electoralcommission.org.uk/research-reports-and-data/our-reports-and-data-our-research/electoral-data-and-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Estimated voters missing from electoral roll, UK, 2015–2023"
              subtitle="Millions of eligible citizens not registered to vote. Stubbornly high despite Individual Voter Registration reforms."
              series={missingOnlySeries}
              annotations={[{ date: new Date(2023, 0, 1), label: '2023: Voter ID requirements begin' }]}
              yLabel="Missing from roll (millions)"
              source={{ name: 'Electoral Commission', dataset: 'UK Electoral Registers', url: 'https://www.electoralcommission.org.uk/research-reports-and-data/our-reports-and-data-our-research/electoral-data-and-statistics', frequency: 'annual', date: '2023' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Automatic voter registration could close the gap"
            value="8 million"
            description="Scotland and Wales have both introduced or piloted more proactive voter registration models, with higher registration rates as a result. Evidence from countries with automatic voter registration — including Canada, Australia, and several US states — shows it can close the registration gap by 40–50% among young and mobile populations. The Electoral Commission has recommended automatic registration in England on multiple occasions. If implemented, it could register the majority of the estimated 8 million missing voters within a single electoral cycle."
            source="Source: Electoral Commission — Maintaining the integrity of the electoral register, 2023. IPPR — Democracy Unlocked, 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.electoralcommission.org.uk/research-reports-and-data/our-reports-and-data-our-research/electoral-data-and-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Electoral Commission — UK Electoral Registers</a> — annual publication of registration statistics.</p>
            <p><a href="https://www.electoralcommission.org.uk/research-reports-and-data/our-reports-and-data-our-research/barriers-to-registration" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Electoral Commission — Diversity and barriers to registration</a> — research into barriers by demographic group.</p>
            <p>Missing from roll estimates compare registered voters against ONS population estimates for eligible citizens. Methodology is subject to revision as census data updates. Under-25 unregistered figure is from Electoral Commission survey research.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
