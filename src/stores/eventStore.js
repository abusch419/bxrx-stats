// import { writable } from "svelte/store";
import { writable } from 'svelte-local-storage-store'
import { supabase } from "../supabase.js"


export const events = writable('events', [])
export const userEvents = writable('userEvents', [])

export const loadEvents = async () => {
  console.log("loading events.....")
  const { data, error } = await supabase.from('events').select()
  if (error) {
    return console.error(error)
  }
  console.log("done loading events.....")
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
    console.log(data)
    // don't add an event to the events store - we want to just create a join table record or we'll render the event twice. 
  }

  // don call this function which resets the userEvents writeable 
  await loadEventsBelongingToUser(user_id)
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

export const loadEventsBelongingToUser = async (user_id) => {
  const userEventIds = await eventIdsBelongingToUser(user_id)

  const { data, error } = await supabase.from('events').select().in('id', userEventIds)
  if (error) {
    return console.error(error)
  }

  userEvents.set(data)
}


export const eventLabel = (event) => {
  return `${event.date} ${event.city}, ${event.state.toUpperCase()}`;
};


export const addEvent = async (newEvent) => {
  const { data, error } = await supabase.from('events').insert([{ ...newEvent }])
  if (error) {
    return console.error(error)
  }

  // do some setlist parsing 
  const setlist = data[0].setlist
  // find set one 
  // everything between the string "set 1:" and "set 2:", "encore:", or "notes:"
  console.log(getFirstSetString(setlist.toLowerCase(), 'set 1: ', ' set 2:'))

  console.log("success!")
}

export const getFirstSetString = (str, start, end) => {
  const result = str.match(/(?<=set 1:\s+).*?(?=\s+set 2:)/gs);

  return result;
}

