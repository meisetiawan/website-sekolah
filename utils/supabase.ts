
import { createClient } from "@/lib/supabase/server"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Satu client untuk semua
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Upload file ke bucket Supabase Storage
 * @param file File yang diupload
 * @param folder folder tujuan (misal: "history", "comment", "trusted")
 * @returns publicUrl string
 */
export const uploadImage = async (file: File, folder: string) => {
  const fileName = `${folder}/${Date.now()}-${file.name}`

  const { error } = await supabase.storage
    .from('assets')         // nama bucket
    .upload(fileName, file, { upsert: true })

  if (error) throw error

  const { data } = supabase.storage
    .from('assets')
    .getPublicUrl(fileName)

  return data.publicUrl
}