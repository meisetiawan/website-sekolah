export function Star(properties: any) {
  return <>
	<div style={properties.style} className={`flex items-center justify-center w-0 h-0 opacity-60 ${properties.className}`}>
		<div className="absolute w-[15px] h-[15px] peer"></div>
		<div className="absolute bottom-[2rem] w-[20rem] hidden peer-hover:flex bg-blue-500">
			<p className="text-white"> Terwujudnya Warga Indonesia Sejati, Kuat Bereligi, Pembelajar, Berbudaya, Berkarakter, Berwawasan Lingkungan dan Global </p>
		</div>
		<div className="absolute w-[2rem] h-[2rem] rounded-full bg-white blur-[1rem] opacity-50 pointer-events-none"></div>
		<svg className="absolute w-[15px] h-[15px] pointer-events-none">
			<rect
				width="100%"
				height="100%"
				fill="white"
				clipPath="url(#star)"
				/>
		</svg>
	</div>
	</>
}