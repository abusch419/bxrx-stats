// import { writable } from "svelte/store";
import { writable } from 'svelte-local-storage-store'
import { supabase } from "../supabase.js"
import { checkIfSongExists } from './songStore.js'
import { getArrayOfSongsFromSetlistString } from '../helpers/getSongArrayFromSetlist.js'

export const events = writable('events', [])
export const userEvents = writable('userEvents', [])

const compareDate = (a, b) => {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}

export const loadEvents = async () => {
  const { data, error } = await supabase.from('events').select()
  if (error) {
    return console.error(error)
  }
  data.sort(compareDate)
  events.set(data)
}

const userEventBridgeExistsForUserAndEvent = async (event_id, user_id) => {
  const { data, error } = await supabase
    .from('user_event_bridges')
    .select('event_id, user_id')
    .match({ event_id, user_id })

  if (error) {
    return console.error(error)
  }
  if (data.length > 0) {
    return true
  } else {
    return false
  }
}

export const toggleBelongsToUser = async (event_id, user_id) => {
  const userEventBridgeExists = await userEventBridgeExistsForUserAndEvent(event_id, user_id)
  if (userEventBridgeExists) {
    // delete the existing bridge
    await deleteUserEventBridge(event_id, user_id)
  } else {
    // create a new bridge
    const { data, error } = await supabase.from('user_event_bridges').insert([{ event_id, user_id }])
    if (error) {
      return console.error(error)
    }
    // don't add an event to the events store - we want to just create a join table record or we'll render the event twice. 
  }

  // don call this function which resets the userEvents writeable 
  await loadUserEvents(user_id)
}

const deleteUserEventBridge = async (event_id, user_id) => {
  const { error } = await supabase.from('user_event_bridges').delete().match({ event_id, user_id })

  if (error) {
    return console.error(error)
  }

  // don't delete the event to the events store - we want to just delete the join table
}

export const eventIdsBelongingToUser = async (user_id) => {
  // see if there's a userEventBridge that matches this event and user id
  const { data, error } = await supabase
    .from('user_event_bridges')
    .select('event_id, user_id')
    .match({ user_id })

  if (error) {
    return console.error(error)
  }
  // return an array of event Ids that belong to the user 
  return data.map((user_event_bridge) => user_event_bridge.event_id)
}

export const loadUserEvents = async (user_id) => {
  const userEventIds = await eventIdsBelongingToUser(user_id)

  const { data, error } = await supabase.from('events').select().in('id', userEventIds)
  if (error) {
    return console.error(error)
  }

  data.sort(compareDate)
  userEvents.set(data)
}


export const eventLabel = (event) => {
  return `${event.date} ${event.city}, ${event.state.toUpperCase()}`;
};

export const getAllSongsFromNewEvent = (newEvent) => {
  return getArrayOfSongsFromSetlistString(newEvent[0].setlist)
}

export const checkForNewSongs = async (newEvent) => {

  const arrayOfSongsFromSetlist = getArrayOfSongsFromSetlistString(newEvent.setlist)
  let songExists
  let newSongs = []
  for await (const song of arrayOfSongsFromSetlist) {
    songExists = await checkIfSongExists(song)
    if (songExists) {
      // refactor since we don't need this branch
    } else {
      newSongs.push(song)
    }
  }

  return newSongs
}

export const addEvent = async (newEvent) => {
  const { data, error } = await supabase.from('events').insert([{ ...newEvent }])
  if (error) {
    return console.error(error)
  }

  return data
}