'use client';

import { useEffect, useState } from 'react';
import { ConstellationSection } from '@/app/_section/constellation';
import { AboutSection } from '@/app/_section/about';
import { HistorySection } from '@/app/_section/history';
import { FeatureSection } from '@/app/_section/feature';
import { CommentSection } from '@/app/_section/comment';
import { FaqSection } from '@/app/_section/faq';
import { CreditSection } from '@/app/_section/credit';
import { FooterSection } from '@/app/_section/footer';

interface SupabaseData {
  about: {
    title: string;
    description: string;
  };
  trusteds: { name: string; image: string }[];
  histories: { year: string; title: string; description: string; image: string }[];
  features: { icon: string; title: string; description: string }[];
  section: { title: string; description: string };
  comments: { title: string; description: string; image: string }[];
  faqs: { question: string; answer: string }[];
  sliders: { title: string; image: string }[];
  credit?: { title: string; description: string };
}

interface ClientProps {
  supabase: SupabaseData;
}

export function Client({ supabase }: ClientProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ConstellationSection visible={visible} sliders={supabase.sliders} />
      <AboutSection visible={visible} about={supabase.about} trusteds={supabase.trusteds} />
      <HistorySection histories={supabase.histories} />
      <FeatureSection features={supabase.features} section={supabase.section} />
      <CommentSection comments={supabase.comments} />
      <FaqSection faqs={supabase.faqs} />
      {/* {supabase.credit && <CreditSection credit={supabase.credit} />} */}
      <FooterSection />
    </>
  );
}
