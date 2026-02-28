import { Topbar } from "@/components/topbar"
import { ConstellationOne } from "@/components/constellation/one"
import { ConstellationTwo } from "@/components/constellation/two"
import { ConstellationThree } from "@/components/constellation/three"
import { Moon } from "@/components/moon/group"

export function ConstellationSection(properties: any) {
	return <>
	<div className="w-full h-screen">
		<div className="relative flex flex-col items-center w-full h-full">
			<Moon className="absolute -bottom-[5rem]" visible={properties.visible} />
			<Topbar visible={properties.visible} />
			<div className="flex flex-row items-center justify-center w-full h-full">
				<ConstellationOne visible={properties.visible} />
				<ConstellationThree visible={properties.visible} />
				<ConstellationTwo visible={properties.visible} />
			</div>
			<div className={`absolute -bottom-[5rem] flex flex-row gap-x-20 w-full justify-center items-center transition-opacity ease-in-out duration-1000 ${properties.visible ? "opacity-70" : "opacity-0"}`}>
				<div className="flex flex-col h-full justify-center">
					<p> Dengan siswa </p>
					<p className="text-4xl"> 1200+ </p>
					<p>siswa</p>
				</div>
				<div className="flex flex-col h-full justify-center">
					<p> Dengan kelas </p>
					<p className="text-4xl"> 36 </p>
					<p>kelas</p>
				</div>
				<div className="flex flex-col h-full justify-center">
					<p> Dengan ekstrakurikuler </p>
					<p className="text-4xl"> 24 </p>
					<p>ekstrakurikuler</p>
				</div>
			</div>
		</div>
	</div>
	</>
}