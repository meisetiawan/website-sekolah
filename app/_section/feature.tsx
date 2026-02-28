"use client"

import { useEffect, useState } from "react"
import { GraduationCap, IdCard, BookOpen, Monitor } from "lucide-react"

const iconMap: any = {
	"graduation-cap": GraduationCap,
	"id-card": IdCard,
	"book-open": BookOpen,
	"monitor": Monitor
}

export function FeatureSection(properties: any) {
	
	const { section, features } = properties
	console.log(section)

	return (
		<div className="w-full h-screen">
			<div className="relative flex flex-col justify-center gap-y-12 w-full h-full px-20 xl:px-40 py-20 xl:py-32">
				<div className="absolute w-[10rem] h-[10rem] bg-[#3f00ff] rounded-full blur-[10rem] opacity-50"></div>
				<div className="absolute bottom-0 right-0 w-[10rem] h-[10rem] bg-[#3f00ff] rounded-full blur-[10rem] opacity-50"></div>

				{/* Header */}
				<div className="hidden md:flex flex-row w-full">
					<div className="w-1/2 flex justify-start">
						<p className="text-2xl">
							Fitur-fitur terbaharukan di SMA N 1 Purbalingga
						</p>
					</div>
					<div className="w-1/2 hidden xl:flex justify-end">
						<div className="w-1/2">
							<p className="text-sm">
								SMA 1 Purbalingga terus berinovasi dan berorientasi pada perkembangan teknologi dengan pengembangan dan perawatan yang baik.
							</p>
						</div>
					</div>
				</div>

				{/* Main Card */}
				<div className="rounded-3xl flex flex-col gap-y-10 xl:flex-row w-full h-full p-14 xl:p-20 bg-gray-900/70 border border-gray-800">

					{/* Highlight */}
					<div className="flex items-center w-full xl:w-1/2 h-auto xl:h-full">
						<div className="flex flex-col gap-y-10 w-[70%]">
							<p className="text-2xl un">
								{section.title}
							</p>
							<p className="un">
								{section.description}
							</p>
						</div>
					</div>

					{/* Feature List */}
					<div className="flex flex-col gap-y-5 w-full xl:w-1/2 grow xl:h-full overflow-y-auto">
						{features.map((item: any, index: any) => {
							const IconComponent = iconMap[item.icon] || Monitor

							return (
								<div
									key={index}
									className="rounded-2xl flex flex-row items-center gap-x-10 h-1/3 p-8 bg-gray-900/70 border border-gray-800"
								>
									<IconComponent
										className="text-gray-400 h-full aspect-square"
										size={50}
									/>

									<div className="flex flex-col gap-y-1">
										<p className="text-lg un">
											{item.title}
										</p>
										<p className="text-sm un">
											{item.description}
										</p>
									</div>
								</div>
							)
						})}
					</div>

				</div>
			</div>
		</div>
	)
}