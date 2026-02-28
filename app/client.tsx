"use client"

import { useEffect, useState } from "react"
import { ConstellationDefinition } from "@/components/constellation/group"
import { ConstellationSection } from "@/app/_section/constellation"
import { AboutSection } from "@/app/_section/about"
import { HistorySection } from "@/app/_section/history"
import { FeatureSection } from "@/app/_section/feature"
import { CommentSection } from "@/app/_section/comment"
import { FaqSection } from "@/app/_section/faq"
import { CreditSection } from "@/app/_section/credit"

export function Client(properties: any) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
			<ConstellationSection visible={visible} />
			<AboutSection visible={visible} about={properties.supabase.about} trusteds={properties.supabase.trusteds} />
			<HistorySection visible={visible} histories={properties.supabase.histories} />
			<FeatureSection visible={visible} features={properties.supabase.features} section={properties.supabase.section} />
      <CommentSection visible={visible} comments={properties.supabase.comments} />
      <FaqSection visible={visible} faqs={properties.supabase.faqs} />
      {/*<CreditSection visible={visible} credit={properties.supabase.credit} />*/}
    </>
  )
}