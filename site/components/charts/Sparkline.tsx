'use client';

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  colour: string;
}

export default function Sparkline({ data, width = 80, height = 20, colour }: SparklineProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length < 2) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data) as [number, number])
      .range([height - 2, 2]);

    const line = d3.line<number>()
      .x((_, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', colour)
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [data, width, height, colour]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="inline-block"
      aria-hidden="true"
    />
  );
}
