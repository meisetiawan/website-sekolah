import { Constellation } from "@/components/constellation/group"

import Ganesh from "@/components/icons/ganesh"

export function ConstellationThree(properties: any) {
	return <>
	<div className="flex items-center justify-center w-[500px] h-[500px]">
		<div className={`absolute w-[30rem] h-[30rem] bg-white rounded-full blur-[100rem] transition-opacity ease-in-out duration-1000 ${properties.visible ? "opacity-[0.2]" : "opacity-0"}`}></div>
		<Ganesh className={`absolute transition-opacity ease-in-out duration-1000 ${properties.visible ? "opacity-70" : "opacity-0"}`} fill="#9be3ffff" width={500} height={500} />
		<Constellation
			stars={[
				[250, 80],
				[200, 140],
				[300, 140],
				[250, 250],
				[150, 320],
				[350, 320],
				[120, 250],
				[380, 250],
				[250, 380],
				[150, 400],
				[350, 400],
			]}
			lines={[
				[0,1],
				[0,2],
				[1,3],
				[2,3],
				[3,4],
				[3,5],
				[4,6],
				[5,7],
				[4,8],
				[5,8],
				[8,9],
				[8,10],
			]}
			animations={[
				[-1,0],
				[-1,1],
				[0,2],
				[1,3],
				[2,4],
				[3,5],
				[4,6],
				[5,7],
				[4,8],
				[5,9],
				[8,10],
				[9,11],
			]}
			width={500}
			height={500}
		/>
	</div>
	</>
}