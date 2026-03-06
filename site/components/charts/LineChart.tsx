'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface Series {
  id: string;
  label: string;
  data: { date: Date; value: number }[];
  colour?: string;
}

export interface Annotation {
  date: Date;
  label: string;
}

export interface TargetLine {
  value: number;
  label: string;
}

interface LineChartProps {
  title: string;
  showTitle?: boolean;
  subtitle?: string;
  series: Series[];
  annotations?: Annotation[];
  targetLine?: TargetLine;
  yLabel?: string;
  source?: {
    name: string;
    dataset: string;
    url?: string;
    date?: string;
    frequency?: string;
  };
}

const MARGIN = { top: 24, right: 24, bottom: 40, left: 56 };
const COLOURS = ['#0D1117', '#E63946', '#2A9D8F', '#F4A261'];

export default function LineChart({
  title,
  showTitle = false,
  subtitle,
  series,
  annotations,
  targetLine,
  yLabel,
  source,
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Responsive resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setDimensions({ width, height: Math.min(400, width * 0.56) });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Draw chart
  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current || dimensions.width === 0) return;
    if (series.length === 0 || series.every(s => s.data.length === 0)) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const innerWidth = width - MARGIN.left - MARGIN.right;
    const innerHeight = height - MARGIN.top - MARGIN.bottom;

    // Scales
    const allDates = series.flatMap(s => s.data.map(d => d.date));
    const allValues = series.flatMap(s => s.data.map(d => d.value));
    if (targetLine) allValues.push(targetLine.value);

    const [yMin, yMax] = d3.extent(allValues) as [number, number];
    const yPadding = (yMax - yMin) * 0.1;

    const x = d3.scaleTime()
      .domain(d3.extent(allDates) as [Date, Date])
      .range([0, innerWidth]);

    const hasNegativeValues = allValues.some(v => v < 0);
    const lowerBound = hasNegativeValues ? yMin - yPadding : Math.max(0, yMin - yPadding);

    const y = d3.scaleLinear()
      .domain([lowerBound, yMax + yPadding])
      .range([innerHeight, 0])
      .nice();

    const g = svg.append('g')
      .attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

    // Horizontal grid lines
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(y)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', '#E5E7EB')
        .attr('stroke-width', 1)
      );

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(
        d3.axisBottom(x)
          .ticks(d3.timeYear.every(Math.ceil((d3.extent(allDates) as [Date, Date])[1].getFullYear() - (d3.extent(allDates) as [Date, Date])[0].getFullYear()) / 8) || 1)
          .tickFormat(d3.timeFormat('%Y') as (d: Date | d3.NumberValue, i: number) => string)
          .tickSizeOuter(0)
      )
      .call(g => g.select('.domain').attr('stroke', '#E5E7EB'))
      .call(g => g.selectAll('.tick text')
        .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
        .attr('font-size', '11px')
        .attr('fill', '#6B7280')
      )
      .call(g => g.selectAll('.tick line').attr('stroke', '#E5E7EB'));

    // Y axis
    g.append('g')
      .call(
        d3.axisLeft(y)
          .ticks(6)
          .tickSizeOuter(0)
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick text')
        .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
        .attr('font-size', '11px')
        .attr('fill', '#6B7280')
      )
      .call(g => g.selectAll('.tick line').remove());

    // Y axis label
    if (yLabel) {
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -MARGIN.left + 14)
        .attr('x', -innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
        .attr('font-size', '11px')
        .attr('fill', '#6B7280')
        .text(yLabel);
    }

    // Target line
    if (targetLine) {
      const ty = y(targetLine.value);
      g.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', ty)
        .attr('y2', ty)
        .attr('stroke', '#2A9D8F')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '6,4');

      g.append('text')
        .attr('x', innerWidth)
        .attr('y', ty - 6)
        .attr('text-anchor', 'end')
        .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
        .attr('font-size', '10px')
        .attr('fill', '#2A9D8F')
        .text(targetLine.label);
    }

    // Annotation lines
    if (annotations) {
      annotations.forEach((ann, annIdx) => {
        const ax = x(ann.date);
        const labelY = 12 + annIdx * 14; // stagger vertically to avoid overlap
        g.append('line')
          .attr('x1', ax)
          .attr('x2', ax)
          .attr('y1', 0)
          .attr('y2', innerHeight)
          .attr('stroke', '#6B7280')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '4,3');

        // Place label to right of line, or left if text would overflow
        const approxTextWidth = ann.label.length * 6;
        const nearRight = ax + 4 + approxTextWidth > innerWidth;
        g.append('text')
          .attr('x', nearRight ? ax - 4 : ax + 4)
          .attr('y', labelY)
          .attr('text-anchor', nearRight ? 'end' : 'start')
          .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
          .attr('font-size', '10px')
          .attr('fill', '#6B7280')
          .text(ann.label);
      });
    }

    // Line generator
    const line = d3.line<{ date: Date; value: number }>()
      .x(d => x(d.date))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    // Draw series
    series.forEach((s, i) => {
      const colour = s.colour || COLOURS[i % COLOURS.length];
      g.append('path')
        .datum(s.data)
        .attr('fill', 'none')
        .attr('stroke', colour)
        .attr('stroke-width', 2)
        .attr('d', line);
    });

    // Legend drawn in SVG removed — rendered as HTML below the chart instead

    // Tooltip overlay
    const bisect = d3.bisector<{ date: Date; value: number }, Date>(d => d.date).left;

    const overlay = g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'none')
      .attr('pointer-events', 'all');

    const hoverLine = g.append('line')
      .attr('stroke', '#0D1117')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '2,2')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .style('opacity', 0);

    const hoverDots = series.map((s, i) => {
      const colour = s.colour || COLOURS[i % COLOURS.length];
      return g.append('circle')
        .attr('r', 4)
        .attr('fill', colour)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('opacity', 0);
    });

    overlay
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event);
        const dateAtMouse = x.invert(mx);

        hoverLine.attr('x1', mx).attr('x2', mx).style('opacity', 1);

        let tooltipHTML = `<div style="font-family: SF Mono, Fira Code, Consolas, monospace; font-size: 11px; color: #E5E7EB;">`;
        tooltipHTML += `<div style="margin-bottom: 4px;">${d3.timeFormat('%b %Y')(dateAtMouse)}</div>`;

        series.forEach((s, i) => {
          const idx = bisect(s.data, dateAtMouse, 1);
          const d0 = s.data[idx - 1];
          const d1 = s.data[idx];
          if (!d0) return;
          const d = d1 && (dateAtMouse.getTime() - d0.date.getTime()) > (d1.date.getTime() - dateAtMouse.getTime()) ? d1 : d0;
          const colour = s.colour || COLOURS[i % COLOURS.length];

          hoverDots[i]
            .attr('cx', x(d.date))
            .attr('cy', y(d.value))
            .style('opacity', 1);

          tooltipHTML += `<div style="color: ${colour};">${s.label}: ${d.value.toLocaleString('en-GB', { maximumFractionDigits: 1 })}</div>`;
        });

        tooltipHTML += '</div>';

        const svgRect = svgRef.current!.getBoundingClientRect();
        const tooltipX = mx + MARGIN.left + 12;
        const flipX = tooltipX + 160 > svgRect.width;

        tooltip
          .html(tooltipHTML)
          .style('opacity', 1)
          .style('left', `${flipX ? mx + MARGIN.left - 170 : tooltipX}px`)
          .style('top', `${MARGIN.top + 20}px`);
      })
      .on('mouseleave', () => {
        hoverLine.style('opacity', 0);
        hoverDots.forEach(d => d.style('opacity', 0));
        tooltip.style('opacity', 0);
      });
  }, [series, annotations, targetLine, yLabel, dimensions]);

  const sourceText = source
    ? [
        `Source: ${source.name}`,
        source.dataset,
        source.date,
        source.frequency ? `Updated ${source.frequency}` : null,
      ].filter(Boolean).join(', ')
    : null;

  return (
    <div className="mb-12">
      {showTitle && <h3 className="text-lg font-bold text-wiah-black mb-1">{title}</h3>}
      {subtitle && (
        <p className="text-sm text-wiah-mid mb-4">{subtitle}</p>
      )}
      <div ref={containerRef} className="relative w-full">
        <svg ref={svgRef} width={dimensions.width} height={dimensions.height} />
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none bg-wiah-dark rounded px-3 py-2 shadow-lg"
          style={{ opacity: 0, transition: 'opacity 150ms' }}
        />
      </div>
      {series.length > 1 && (
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
          {series.map((s, i) => {
            const colour = s.colour || COLOURS[i % COLOURS.length];
            return (
              <div key={s.id} className="flex items-center gap-1.5">
                <svg width="16" height="8" aria-hidden="true">
                  <line x1="0" y1="4" x2="16" y2="4" stroke={colour} strokeWidth="2" />
                </svg>
                <span className="font-mono text-[10px] text-wiah-mid">{s.label}</span>
              </div>
            );
          })}
        </div>
      )}
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
