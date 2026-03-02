'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface FunnelStage {
  label: string;
  value: number;
  per100: number;
}

interface FunnelChartProps {
  title: string;
  subtitle?: string;
  stages: FunnelStage[];
  source?: {
    name: string;
    dataset: string;
    url?: string;
    frequency?: string;
  };
}

const ROW_HEIGHT = 44;
const LABEL_WIDTH = 220;
const VALUE_WIDTH = 80;
const MARGIN = { top: 8, right: 8, bottom: 8, left: 0 };

function formatValue(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}m`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
  return v.toLocaleString('en-GB');
}

export default function FunnelChart({
  title,
  subtitle,
  stages,
  source,
}: FunnelChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || width === 0 || stages.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const isMobile = width < 500;
    const labelW = isMobile ? 0 : LABEL_WIDTH;
    const valueW = VALUE_WIDTH;
    const barMaxW = width - MARGIN.left - MARGIN.right - labelW - valueW - 16;
    const height = stages.length * ROW_HEIGHT + MARGIN.top + MARGIN.bottom;

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

    const x = d3.scaleLinear()
      .domain([0, 100])
      .range([0, Math.max(barMaxW, 60)]);

    // Colour scale: dark to red as values drop
    const colourScale = d3.scaleLinear<string>()
      .domain([0, 50, 100])
      .range(['#E63946', '#6B7280', '#264653']);

    stages.forEach((stage, i) => {
      const y = i * ROW_HEIGHT;
      const row = g.append('g').attr('transform', `translate(0,${y})`);

      // Label (desktop only — on mobile, label goes above bar)
      if (isMobile) {
        row.append('text')
          .attr('x', 0)
          .attr('y', 8)
          .attr('font-family', 'system-ui, -apple-system, sans-serif')
          .attr('font-size', '12px')
          .attr('fill', '#1A1A1A')
          .text(stage.label);

        // Bar
        row.append('rect')
          .attr('x', 0)
          .attr('y', 14)
          .attr('height', 18)
          .attr('rx', 3)
          .attr('fill', colourScale(stage.per100))
          .attr('width', 0)
          .transition()
          .duration(700)
          .delay(i * 100)
          .attr('width', x(stage.per100));

        // Value
        row.append('text')
          .attr('x', width - MARGIN.right - valueW)
          .attr('y', 28)
          .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
          .attr('font-size', '12px')
          .attr('font-weight', '700')
          .attr('fill', '#1A1A1A')
          .text(formatValue(stage.value));

        // Per100
        row.append('text')
          .attr('x', width - MARGIN.right - 8)
          .attr('y', 28)
          .attr('text-anchor', 'end')
          .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
          .attr('font-size', '11px')
          .attr('fill', '#6B7280')
          .text(`${stage.per100}`);
      } else {
        row.append('text')
          .attr('x', labelW - 12)
          .attr('y', ROW_HEIGHT / 2 + 4)
          .attr('text-anchor', 'end')
          .attr('font-family', 'system-ui, -apple-system, sans-serif')
          .attr('font-size', '13px')
          .attr('fill', '#1A1A1A')
          .text(stage.label);

        // Bar
        row.append('rect')
          .attr('x', labelW)
          .attr('y', (ROW_HEIGHT - 22) / 2)
          .attr('height', 22)
          .attr('rx', 3)
          .attr('fill', colourScale(stage.per100))
          .attr('width', 0)
          .transition()
          .duration(700)
          .delay(i * 100)
          .attr('width', x(stage.per100));

        // Value
        row.append('text')
          .attr('x', labelW + barMaxW + 12)
          .attr('y', ROW_HEIGHT / 2 + 4)
          .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
          .attr('font-size', '13px')
          .attr('font-weight', '700')
          .attr('fill', '#1A1A1A')
          .text(formatValue(stage.value));

        // Per100 label
        row.append('text')
          .attr('x', width - MARGIN.right - 8)
          .attr('y', ROW_HEIGHT / 2 + 4)
          .attr('text-anchor', 'end')
          .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
          .attr('font-size', '11px')
          .attr('fill', '#6B7280')
          .text(`${stage.per100}`);
      }
    });
  }, [stages, width]);

  const sourceText = source
    ? [
        `Source: ${source.name}`,
        source.dataset,
        source.frequency ? `Updated ${source.frequency}` : null,
      ].filter(Boolean).join(', ')
    : null;

  const svgHeight = stages.length * ROW_HEIGHT + MARGIN.top + MARGIN.bottom;

  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold text-wiah-black mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-wiah-mid mb-4">{subtitle}</p>
      )}
      <div ref={containerRef} className="relative w-full">
        <svg ref={svgRef} width={width} height={svgHeight} />
      </div>
      {sourceText && (
        <p className="font-mono text-[11px] text-wiah-mid mt-2">
          {source?.url ? (
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {sourceText}
            </a>
          ) : (
            sourceText
          )}
        </p>
      )}
    </div>
  );
}
