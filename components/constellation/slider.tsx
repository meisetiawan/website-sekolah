'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SliderItem {
  title: string;
  image: string;
}

interface ConstellationSliderProps {
  sliders: SliderItem[];
  visible: boolean;
}

export function ConstellationSlider({ sliders, visible }: ConstellationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!sliders || sliders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [sliders]);

  if (!sliders || sliders.length === 0) return null;

  const currentSlider = sliders[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ delay: 5, duration: 1 }}
      className="absolute w-full h-screen top-0 left-0 overflow-hidden"
    >
      <motion.img
        key={currentIndex}
        src={currentSlider.image}
        alt={currentSlider.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
