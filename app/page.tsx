import { useEffect, useState } from "react"
import { Suspense } from "react"
import { cache } from "react"
import { ConstellationDefinition } from "@/components/constellation/group"
import { MoonDefinition } from "@/components/moon/group"
import { createClient } from "@/lib/supabase/server"
import { Client } from "@/app/client"

const api = cache(async () => {
  const supabase = await createClient()

  const { data: about, error: aboutError } = await supabase
    .from("about")
    .select("title, description")
    .limit(1)
    .single()
  if (aboutError) throw new Error(aboutError.message)
  
  const { data: histories, error: historyError } = await supabase
    .from("history")
    .select("year, title, description, image")
  if (historyError) throw new Error(historyError.message)

  const { data: trusteds, error: trustedError } = await supabase
    .from("trusted")
    .select("name, image")
  if (trustedError) throw new Error(trustedError.message)

  const { data: features, error: featureError } = await supabase
    .from("feature")
    .select("title, description, icon")
  if (featureError) throw new Error(featureError.message)

  const { data: section, error: sectionError } = await supabase
    .from("info")
    .select("title, description")
    .limit(1)
    .single()
  if (sectionError) throw new Error(sectionError.message)

    const { data: comments, error: commentError } = await supabase
      .from("comment")
      .select("title, description, image")
    if (commentError) throw new Error(commentError.message)

      const { data: faqs, error: faqError } = await supabase
      .from("faq")
      .select("question, answer")
    if (faqError) throw new Error(faqError.message)

      const { data: credit, error: creditError } = await supabase
    .from("about")
    .select("title, description")
    .limit(1)
    .single()
    if (creditError) throw new Error(creditError.message)

  return { about, trusteds, histories, features, section, comments, faqs, credit }
})

async function AsyncSection(properties: any) {
  const { about, trusteds, histories, features, section, comments, faqs, credit } = await api()
  return <>
    <Client supabase={{ about, trusteds, histories, features, section, comments, faqs, credit }} />
  </>
}

export default function App() {
  return <>
    <ConstellationDefinition />
    <MoonDefinition />
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-[#020712] relative overflow-hidden">
      <Suspense fallback={<p> Just a moment </p>}>
        <AsyncSection />
      </Suspense>
    </div>
  </>
}