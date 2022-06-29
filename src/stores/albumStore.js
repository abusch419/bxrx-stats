import { writable } from 'svelte-local-storage-store'
import { supabase } from "../supabase.js"

export const albums = writable('albums', [])

export const loadAlbums = async () => {
  console.log("loading albums.....")
  const { data, error } = await supabase.from('albums').select()
  if (error) {
    return console.error(error)
  }
  console.log("done loading albums.....")
  albums.set(data)
}
