import { writable } from 'svelte-local-storage-store'
import { supabase } from "../supabase.js"

export const albums = writable('albums', [])

export const loadAlbums = async () => {
  const { data, error } = await supabase.from('albums').select()
  if (error) {
    return console.error(error)
  }
  albums.set(data)
}
