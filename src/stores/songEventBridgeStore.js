export const addSongEventBridge = async (song_id, event_id) => {
  const { _, error } = await supabase
    .from('song_event_bridges')
    .insert([{ song_id, event_id }])

  if (error) {
    return console.error(error)
  }
}