'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Topbar } from "@/components/topbar"
import { ConstellationOne } from "@/components/constellation/one"
import { ConstellationTwo } from "@/components/constellation/two"
import { ConstellationThree } from "@/components/constellation/three"
import { Moon } from "@/components/moon/group"
import { ConstellationSlider } from '@/components/constellation/slider';

interface Slider {
  title: string;
  image: string;
}

interface ConstellationSectionProps {
  visible: boolean;
  sliders: Slider[];
}

export function ConstellationSection({ visible, sliders }: ConstellationSectionProps) {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="w-full h-screen">
        <div className="relative flex flex-col items-center w-full h-full">
          {showSlider && sliders && sliders.length > 0 && (
            <ConstellationSlider sliders={sliders} visible={showSlider} />
          )}
          <div className="absolute w-full h-1/3 bg-gradient-to-b from-[#020712] to-transparent"></div>
          <Topbar visible={visible} />
          <div className="flex justify-center relative w-full h-1/4" />
          <div className="flex flex-row items-center justify-center w-full h-1/2">
            <motion.div
              animate={{ opacity: showSlider ? 0.1 : 1 }}
              transition={{ duration: 1 }}
            >
              <ConstellationOne visible={visible} />
            </motion.div>
            <motion.div
              animate={{ opacity: showSlider ? 0.1 : 1 }}
              transition={{ duration: 1 }}
            >
              <ConstellationThree visible={visible} />
            </motion.div>
            <motion.div
              animate={{ opacity: showSlider ? 0.1 : 1 }}
              transition={{ duration: 1 }}
            >
              <ConstellationTwo visible={visible} />
            </motion.div>
          </div>
          <div className="flex justify-center relative w-full h-1/2">
            <Moon className="absolute -bottom-[15rem] md:-bottom-[15rem]" visible={visible} />
          </div>
          <div
            className={`absolute -bottom-[5rem] hidden md:flex flex-row gap-x-20 w-full justify-center items-center transition-opacity ease-in-out duration-1000 ${
              visible ? "opacity-70" : "opacity-0"
            }`}
          >
            <div className="flex flex-col h-full justify-center">
              <p> Dengan siswa </p>
              <p className="text-4xl"> 1200+ </p>
              <p> siswa </p>
            </div>
            <div className="flex flex-col h-full justify-center">
              <p> Dengan kelas </p>
              <p className="text-4xl"> 36 </p>
              <p> kelas </p>
            </div>
            <div className="flex flex-col h-full justify-center">
              <p> Dengan ekstrakurikuler </p>
              <p className="md:text-4xl"> 24 </p>
              <p> ekstrakurikuler </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}