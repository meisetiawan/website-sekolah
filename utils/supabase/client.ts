import { supabase } from '../supabase'

export async function uploadFile(file: File, folder: string) {
  const fileName = `${folder}/${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from("assets")
    .upload(fileName, file, { upsert: true })

  if (error) {
    throw error
  }

  const { data } = supabase.storage
    .from("assets")
    .getPublicUrl(fileName)

  return data.publicUrl
}