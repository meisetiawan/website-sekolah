"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function HistorySection(properties: any) {
	const [carousel, setCarousel] = useState(0)
	useEffect(() => {
		if (properties.histories.length === 0) return

		const interval = setInterval(() => {
			setCarousel(prev => (prev + 1) % properties.histories.length)
		}, 10000)

		return () => clearInterval(interval)
	}, [carousel])
	return (
		<div className="relative w-full h-screen">
			<div className="top-1/2 absolute w-[10rem] h-[10rem] bg-[#3f00ff] rounded-full blur-[10rem] opacity-50"></div>
			<div className="flex flex-col xl:flex-row gap-y-20 xl:gap-x-40 w-full h-full p-20 xl:p-40 bg-gray-900/70">
				<div className="flex flex-row w-full xl:w-1/2 h-1/2 xl:h-full">
					<div className="flex flex-col w-1/2">
						<div className="flex h-1/2">
							<p className="un text-3xl">
								Sejarah SMA N 1 Purbalingga
							</p>
						</div>
						<div className="flex flex-col gap-y-5">
							{properties.histories.map((item: any, index: any) => (
								<div key={index} onClick={() => setCarousel(index)}>
									<p className={`un ${carousel === index ? "!text-white font-medium" : ""}`}>
										{item.year}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="flex flex-col gap-y-5 justify-end items-end w-1/2">
						<AnimatePresence mode="wait">
							{properties.histories[carousel] && (
								<motion.div key={carousel}>
									<motion.p
										initial={{ y: 40, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -40, opacity: 0 }}
										transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
										className="un text-xl text-end font-medium"
									>
										{properties.histories[carousel].title}
									</motion.p>

									<motion.p
										initial={{ y: 40, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: -40, opacity: 0 }}
										transition={{ type: "tween", ease: "easeOut", duration: 0.5, delay: 0.2 }}
										className="un text-end"
									>
										{properties.histories[carousel].description}
									</motion.p>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
				<div className="relative w-full xl:w-1/2 h-1/2 xl:h-full">
					{properties.histories.map((history: any, index: any) => (
						<img
							key={index}
							src={history.image}
							className={`absolute w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${
								carousel === index ? "opacity-100" : "opacity-0"
							}`}
						/>
					))}
				</div>

			</div>
		</div>
	)
}