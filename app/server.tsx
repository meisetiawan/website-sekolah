import { cache } from "react"
import { createClient } from "@/lib/supabase/server"

import { ConstellationSection } from "@/app/_section/constellation"
import { AboutSection } from "@/app/_section/about"
import { HistorySection } from "@/app/_section/history"
import { FeatureSection } from "@/app/_section/feature"
import { CommentSection } from "@/app/_section/comment"
import { FaqSection } from "@/app/_section/faq"
import { CreditSection } from "@/app/_section/credit"

const getData = cache(async () => {
  const supabase = await createClient()

  const { data: about } = await supabase
    .from("about")
    .select("title, description")
    .limit(1)
    .single()

  const { data: histories } = await supabase
    .from("history")
    .select("year, title, description, image")

  const { data: trusteds } = await supabase
    .from("trusted")
    .select("name, image")

  const { data: features } = await supabase
    .from("feature")
    .select("title, description, icon")

  const { data: section } = await supabase
    .from("info")
    .select("title, description")
    .limit(1)
    .single()

  const { data: comments } = await supabase
    .from("comment")
    .select("title, description, image")

  const { data: faqs } = await supabase
    .from("faq")
    .select("question, answer")

  const { data: credit } = await supabase
    .from("about")
    .select("title, description")
    .limit(1)
    .single()

  return { about, histories, trusteds, features, section, comments, faqs, credit }
})

export default async function Server() {
  const data = await getData()

  return (
    <>
      <ConstellationSection visible={true} />
      {data.about && <AboutSection visible={true} about={data.about} trusteds={data.trusteds || []} />}
      {data.histories && <HistorySection histories={data.histories} />}
      {data.section && <FeatureSection section={data.section} features={data.features || []} />}
      {data.comments && <CommentSection comments={data.comments} />}
      {data.faqs && <FaqSection faqs={data.faqs} />}
      {data.credit && <CreditSection credit={data.credit} />}
    </>
  )
}