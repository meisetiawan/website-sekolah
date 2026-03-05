import { Constellation } from "@/components/constellation/group"

export function ConstellationTwo(properties: any) {
	return <>
	<div className={`hidden xl:block w-[500px] h-[500px] transition-opacity duration-500 ${properties.visible ? "opacity-100" : "opacity-0"}`}>
		<div className="absolute w-[500px] h-[500px]">
			<Constellation width={500} height={500} stars={[[20, 300], [70, 200], [100, 190]]} lines={[[0,1], [1,2]]} animations={[[-1,0], [-1,1]]}/>
		</div>
		<div className="absolute w-[500px] h-[500px]">
			<Constellation width={500} height={500} stars={[[350, 100], [270, 160], [380, 190]]} lines={[[0,1], [1,2]]} animations={[[-1,0], [-1,1]]}/>
		</div>
		<div className="absolute w-[500px] h-[500px]">
			<Constellation width={500} height={500} stars={[[250, 420], [200, 350], [310, 400]]} lines={[[0,1], [1,2]]} animations={[[-1,0], [-1,1]]}/>
		</div>
	</div>
	</>
}