import { Fragment } from "react/jsx-runtime"

export function Line(properties: any) {
  return <>
	<div style={{ width: properties.width, height: properties.height }} className="absolute">
		<svg className="absolute w-full h-full">
			{properties.lines.map(([from, to]: [number, number], i: number) => {
				const x1 = properties.stars[from][0]
				const y1 = properties.stars[from][1]
				const x2 = properties.stars[to][0]
				const y2 = properties.stars[to][1]
				const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
				return <g key={i} strokeDasharray={length} strokeDashoffset={length}>
					<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="5" opacity="0.3" filter="url(#glow)">
						<animate attributeName="stroke-dashoffset" from={length} to="0" dur="2.2s" fill="freeze" />
					</line>
					<line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" opacity="0.6">
						<animate attributeName="stroke-dashoffset" from={length} to="0" dur="2.2s" fill="freeze" />
					</line>
				</g>
			})}
		</svg>
	</div>
	</>
}