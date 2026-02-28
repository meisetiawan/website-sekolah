export function Topbar(properties: any) {
	return <>
	<div className={`w-full h-16 absolute flex flex-row px-20 transition-opacity duration-500 ${properties.visible ? "opacity-80" : "opacity-0"}`}>
		<div className="w-1/3 h-full flex items-center justify-start">
			<p className="text-white font-medium"> SMANSA </p>
		</div>
		<div className="w-1/3 h-full flex flex-row gap-x-10 items-center justify-center">
			<a className="text-sm text-white" href=""> Tentang </a>
			<a className="text-sm text-white" href=""> Inovasi </a>
			<a className="text-sm text-white" href=""> Prestasi </a>
			<a className="text-sm text-white" href=""> Organisasi </a>
		</div>
		<div className="w-1/3 h-full flex items-center justify-end">
			<a className="text-sm text-white" href=""> ElSmansa </a>
		</div>
	</div>
	</>
}