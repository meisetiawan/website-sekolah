import { cache } from "react"
import { createClient } from "@/lib/supabase/server"

import { ConstellationSection } from "@/app/_section/constellation"
import { AboutSection } from "@/app/_section/about"
import { HistorySection } from "@/app/_section/history"

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
    .select("name")

  const { data: features } = await supabase
    .from("feature")
    .select("title, description, icon")

  const { data: section } = await supabase
    .from("info")
    .select("title, description")
    .limit(1)
    .single()

  return { about, histories, trusteds, features, section }
})

export default async function Server() {
  const { about, histories, trusteds } = await getData()

  return (
    <>
      <ConstellationSection />
      <AboutSection about={about} trusteds={trusteds} />
      <HistorySection histories={histories} />
    </>
  )
}