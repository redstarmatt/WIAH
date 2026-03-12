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

interface AIProjectPoint {
  year: number;
  count: number;
}

interface PublicTrustPoint {
  year: number;
  percent: number;
}

interface TransparencyPoint {
  year: number;
  entries: number;
}

interface AIPublicServicesData {
  aiProjects: AIProjectPoint[];
  publicTrust: PublicTrustPoint[];
  transparencyRegister: TransparencyPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AIInPublicServicesPage() {
  const [data, setData] = useState<AIPublicServicesData | null>(null);

  useEffect(() => {
    fetch('/data/ai-in-public-services/ai_in_public_services.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const projectsSeries: Series[] = data
    ? [{
        id: 'ai-projects',
        label: 'Government AI projects identified',
        colour: '#264653',
        data: data.aiProjects.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const trustSeries: Series[] = data
    ? [{
        id: 'public-trust',
        label: 'Public trust in government AI (%)',
        colour: '#E63946',
        data: data.publicTrust.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : [];

  const transparencySeries: Series[] = data
    ? [{
        id: 'transparency-register',
        label: 'Transparency register entries',
        colour: '#2A9D8F',
        data: data.transparencyRegister.map(d => ({
          date: yearToDate(d.year),
          value: d.entries,
        })),
      }]
    : [];

  const latestProjects = data?.aiProjects[data.aiProjects.length - 1];
  const latestTrust = data?.publicTrust[data.publicTrust.length - 1];
  const prevTrust = data?.publicTrust[data.publicTrust.length - 2];
  const latestTransparency = data?.transparencyRegister[data.transparencyRegister.length - 1];

  const trustChange = latestTrust && prevTrust
    ? latestTrust.percent - prevTrust.percent
    : -3;

  return (
    <>
      <TopicNav topic="Infrastructure & Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Infrastructure & Services"
          question="Do we know what the algorithms are actually deciding?"
          finding="The UK government is deploying AI across 215 identified public service projects, but only 31% are listed on any transparency register. Public trust in government use of AI has fallen to 31%, its lowest recorded level, even as promising applications in NHS diagnostics and fraud detection demonstrate real value."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The A-level algorithm scandal of August 2020 remains the defining cautionary tale for AI in UK public services. When Ofqual deployed a statistical model to replace cancelled exams, it systematically downgraded students from schools in disadvantaged areas while inflating grades at private schools. The outcry forced a U-turn within days, but the damage was lasting: it demonstrated that algorithmic systems can entrench precisely the inequalities they claim to eliminate, and that the government had deployed a high-stakes decision-making tool with no independent audit, no impact assessment, and no meaningful right of appeal. Five years on, the lessons have been only partially learned. The DWP's fraud and error detection system has faced sustained criticism from the Alan Turing Institute and the Ada Lovelace Institute for disproportionately targeting disabled claimants and people in low-income households, raising serious questions about whether bias in training data is being identified or addressed before systems go live.
            </p>
            <p>
              Predictive policing tools, trialled by at least fourteen forces between 2018 and 2024, present similar concerns. Research by the Centre for Data Ethics and Innovation found that crime prediction models trained on historical arrest data tend to reinforce existing patterns of over-policing in Black and minority ethnic communities. Several forces have quietly discontinued their tools, but there is no central register of which forces used what, for how long, or what decisions were influenced. The algorithmic transparency recording standard, introduced by CDDO in 2022, was meant to address this gap. It now contains 67 entries — but researchers at the Ada Lovelace Institute estimate this covers only around 31% of known government AI projects. Compliance is voluntary, and most entries lack the technical detail needed for meaningful external scrutiny. The gap between the number of AI systems being deployed and the number being publicly documented is not shrinking.
            </p>
            <p>
              There are genuine bright spots. The AI Safety Institute, established in November 2023, has positioned the UK as a serious player in frontier AI evaluation and safety research, conducting pre-deployment testing of advanced models from major laboratories. The NHS AI Lab has supported the approval of over 30 AI-driven diagnostic tools through NICE, including systems for detecting diabetic eye disease, stroke, and breast cancer that are now in clinical use and demonstrably improving patient outcomes. These successes share a common feature: rigorous evaluation frameworks, clinical trial evidence, and transparent reporting of performance metrics including failure rates. The challenge is extending this standard to the rest of government. Procurement remains a particular weakness — a National Audit Office review found that most government AI contracts lacked clauses requiring bias audits, performance monitoring, or public reporting. Until algorithmic impact assessments become mandatory rather than aspirational, the gap between government ambition and public accountability will continue to widen, and public trust will continue to erode.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-projects', label: 'AI projects' },
          { id: 'sec-trust', label: 'Public trust' },
          { id: 'sec-transparency', label: 'Transparency' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Government AI projects identified"
            value={latestProjects ? latestProjects.count.toLocaleString() : '215'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText="Up from 54 in 2019 · 298% increase in six years"
            sparklineData={
              data ? sparkFrom(data.aiProjects.map(d => d.count)) : []
            }
            source="CDDO · Algorithmic Transparency Recording Standard, 2025"
            href="#sec-projects"
          />
          <MetricCard
            label="Public trust in government AI"
            value={latestTrust ? `${latestTrust.percent}%` : '31%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={`${trustChange}pp change · lowest recorded level · down from 48% in 2020`}
            sparklineData={
              data ? sparkFrom(data.publicTrust.map(d => d.percent)) : []
            }
            source="CDEI / Ada Lovelace Institute · Public Attitudes Survey, 2025"
            href="#sec-trust"
          />
          <MetricCard
            label="Transparency register entries"
            value={latestTransparency ? latestTransparency.entries.toLocaleString() : '67'}
            unit="2025"
            direction="up"
            polarity="up-is-good"
            changeText="Only 31% of known projects listed · compliance is voluntary"
            sparklineData={
              data ? sparkFrom(data.transparencyRegister.map(d => d.entries)) : []
            }
            source="CDDO · Algorithmic Transparency Recording Standard, 2025"
            href="#sec-transparency"
          />
        </div>

        {/* Chart 1: AI projects identified */}
        <ScrollReveal>
          <div id="sec-projects" className="mb-12">
            <LineChart
              series={projectsSeries}
              title="Government AI projects identified, UK, 2019–2025"
              subtitle="Number of AI and algorithmic decision-making projects identified across central and local government."
              yLabel="Projects"
              source={{
                name: 'CDDO',
                dataset: 'Algorithmic Transparency Recording Standard & Cross-Government AI Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Public trust */}
        <ScrollReveal>
          <div id="sec-trust" className="mb-12">
            <LineChart
              series={trustSeries}
              title="Public trust in government use of AI, 2020–2025"
              subtitle="Percentage of UK adults who trust the government to use AI responsibly in public services. Declining since first measurement."
              yLabel="Trust (%)"
              source={{
                name: 'CDEI / Ada Lovelace Institute',
                dataset: 'Public Attitudes to Data and AI Survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Transparency register entries */}
        <ScrollReveal>
          <div id="sec-transparency" className="mb-12">
            <LineChart
              series={transparencySeries}
              title="Algorithmic transparency register entries, 2022–2025"
              subtitle="Number of government AI projects listed on the CDDO transparency register. Covers an estimated 31% of known projects."
              yLabel="Entries"
              source={{
                name: 'CDDO',
                dataset: 'Algorithmic Transparency Recording Standard',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="AI Safety Institute and NHS AI Lab delivering results"
            value="30+ approved tools"
            description="The UK AI Safety Institute, established in November 2023, has conducted pre-deployment safety evaluations of frontier AI models and positioned the UK as a global leader in AI safety research. Meanwhile, the NHS AI Lab has supported over 30 AI diagnostic tools through NICE approval and into clinical use — including systems for detecting diabetic retinopathy, stroke, and breast cancer that are demonstrably improving patient outcomes. These programmes share rigorous evaluation frameworks, transparent performance reporting, and clinical trial evidence, setting the standard that the rest of government AI deployment should meet."
            source="Source: DSIT — AI Safety Institute annual report, 2024. NHS England — AI Lab programme evaluations, 2024."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
