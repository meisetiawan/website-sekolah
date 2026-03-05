export function MoonDefinition() {
	return <>
	<svg className="w-0 h-0">
		<defs>
			<clipPath id="outer" clipPathUnits="objectBoundingBox">
				<path d="M0,1C0.3,-0.1 0.7,-0.1 1,1C0.7,0.1 0.3,0.1 0,1Z"/>
			</clipPath>
			<clipPath id="inner" clipPathUnits="objectBoundingBox">
				<path d="M0,1C0.3,-0.05 0.7,-0.05 1,1C0.7,0.05 0.3,0.05 0,1Z"/>
			</clipPath>
			<clipPath id="moon" clipPathUnits="objectBoundingBox">
				<path d="M0,1C0.3,0 0.7,0 1,1C0.7,0.02 0.3,0.02 0,1Z"/>
			</clipPath>
		</defs>
	</svg>
	</>
}
export function Moon(properties: any) {
  return <>
	<div className={`w-[100rem] h-[400px] duration-1000 ${properties.visible ? "opacity-100" : "opacity-0"} ${properties.className}`}>
		<svg className="absolute w-full h-full pointer-events-none blur-[100px]">
			<rect width="100%" height="100%" fill="#3f00ff" clipPath="url(#outer)"/>
		</svg>
		<svg className="absolute w-full h-full pointer-events-none blur-[50px]">
			<rect width="100%" height="100%" fill="white" clipPath="url(#inner)"/>
		</svg>
		<svg className="absolute w-full h-full pointer-events-none opacity-50">
			<rect width="100%" height="100%" fill="white" clipPath="url(#moon)"/>
		</svg>
	</div>
	</>
}