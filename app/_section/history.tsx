"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface History {
  year: string
  title: string
  description: string
  image: string
}

interface HistorySectionProps {
  histories: History[]
}

export function HistorySection({ histories }: HistorySectionProps) {
  const [carousel, setCarousel] = useState(0)

  useEffect(() => {
    if (histories.length === 0) return

    const interval = setInterval(() => {
      setCarousel(prev => (prev + 1) % histories.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [carousel, histories.length])

  return (
    <div className="relative w-full h-screen">
      <div className="top-1/2 absolute w-[10rem] h-[10rem] bg-[#3f00ff] rounded-full blur-[10rem] opacity-50"></div>

      <div className="flex flex-col xl:flex-row gap-y-10 md:gap-y-20 xl:gap-x-40 w-full h-full p-12 sm:p-20 xl:p-40 bg-gray-900/70">

        <div className="flex flex-col gap-y-10 w-full xl:w-1/2 h-1/2 xl:h-full">
          <div className="flex w-2/3 md:w-1/2">
            <p className="un text-xl md:text-2xl font-medium">
              Sejarah SMA N 1 Purbalingga
            </p>
          </div>
          <div className="flex flex-row gap-x-10 grow">
            <div className="flex flex-col gap-y-5 w-1/3 md:w-1/2">
              {histories.map((item, index) => (
                <div key={index} onClick={() => setCarousel(index)} className="hover:cursor-pointer">
                  <p className={`un text-sm md:text-base ${carousel === index ? "!text-white font-medium" : ""}`}>
                    {item.year}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-5 justify-end items-end w-2/3 md:w-1/2">
              <AnimatePresence mode="wait">
                {histories[carousel] && (
                  <motion.div key={carousel}>

                    <motion.p
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
                      className="un text-base md:text-xl text-end font-medium"
                    >
                      {histories[carousel].title}
                    </motion.p>

                    <motion.p
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ type: "tween", ease: "easeOut", duration: 0.5, delay: 0.2 }}
                      className="un text-end text-sm md:text-base"
                    >
                      {histories[carousel].description}
                    </motion.p>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="relative w-full xl:w-1/2 h-1/2 xl:h-full">
          {histories.map((history, index) => (
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