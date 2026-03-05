import { Star } from "@/components/constellation/star"
import { Line } from "@/components/constellation/line"

export function ConstellationDefinition() {
	return <>
	<svg className="w-0 h-0">
		<defs>
			<clipPath id="star" clipPathUnits="objectBoundingBox">
				<path d="M1 0.5C0.867392 0.5 0.740215 0.447322 0.646447 0.353553C0.552678 0.259785 0.5 0.132608 0.5 0C0.5 0.132608 0.447322 0.259785 0.353553 0.353553C0.259785 0.447322 0.132608 0.5 0 0.5C0.132608 0.5 0.259785 0.552678 0.353553 0.646447C0.447322 0.740215 0.5 0.867392 0.5 1C0.5 0.867392 0.552678 0.740215 0.646447 0.646447C0.740215 0.552678 0.867392 0.5 1 0.5Z" />
			</clipPath>
			<filter id="glow">
				<feGaussianBlur in="SourceGraphic" stdDeviation="5" />
			</filter>
		</defs>
	</svg>
	</>
}

export function Constellation(properties: any) {
	return <>
	<div style={{ width: properties.width, height: properties.height }} className={`relative ${properties.className}`}>
		<Line width={properties.width} height={properties.height} stars={properties.stars} lines={properties.lines} />
		{properties.stars.map(([x, y]: [number, number], i: number) => (
			<Star key={i} style={{ left: x, top: y }} className="absolute" />
		))}
	</div>
	</>
}