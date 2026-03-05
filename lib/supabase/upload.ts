import { createClient } from './client' // import createClient

export const uploadImage = async (file: File, folder: string) => {
  const supabase = createClient() // instans Supabase baru
  const fileName = `${folder}/${Date.now()}-${file.name}`

  // Upload file
  const { error } = await supabase.storage.from('assets').upload(fileName, file, { upsert: true })
  if (error) throw error

  // Ambil URL publik
  const { data } = supabase.storage.from('assets').getPublicUrl(fileName)
  return data.publicUrl
}