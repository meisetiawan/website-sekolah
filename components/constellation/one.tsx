import { Constellation } from "@/components/constellation/group"

export function ConstellationOne(properties: any) {
	return <>
	<div className={`hidden xl:block w-[500px] h-[500px] transition-opacity duration-500 ${properties.visible ? "opacity-100" : "opacity-0"}`}>
		<div className="absolute w-full h-full">
			<Constellation width={500} height={500} stars={[[300, 300], [330, 360], [420, 290]]} lines={[[0,1], [1,2]]} animations={[[-1,0], [-1,1]]}/>
		</div>
		<div className="absolute w-full h-full">
			<Constellation width={500} height={500} stars={[[100, 100], [170, 160], [180, 190]]} lines={[[0,1], [1,2]]} animations={[[-1,0], [-1,1]]}/>
		</div>
		<div className="absolute w-full h-full">
			<Constellation width={500} height={500} stars={[[200, 420], [140, 350], [100, 400]]} lines={[[0,1], [1,2]]} animations={[[-1,0], [-1,1]]}/>
		</div>
	</div>
	</>
}