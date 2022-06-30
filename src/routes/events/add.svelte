<script>
  import { checkForNewSongs, addEvent, getAllSongsFromNewEvent } from "../../stores/eventStore.js"
  import { addNewSongs, getIdFromExistingSongName } from "../../stores/songStore.js"
  import { addSongEventBridge } from "../../stores/songEventBridgeStore.js"
  import Page1 from '../../components/Page1.svelte';
  import Page2 from '../../components/Page2.svelte';

  const pages = [Page1, Page2];

  let page = 0;

  let pagesState = [];

  let newSongs = []

  async function onSubmit(values) {
    if (page === pages.length - 1) {
      // On the second page create the new songs and the event
      pagesState[page] = values;
      pagesState = pagesState; // Triggering update

      // create the new event and new songs
      const newEvent = await addEvent(pagesState[0].event)
      const newSongsResponse = await addNewSongs(pagesState[1].song)

      // create song_event_bridges for each new song
      for (const newSong of newSongsResponse) {
        const response = await addSongEventBridge(newSong[0].id, newEvent[0].id)
      }

      // create songEventBridges for any songs that previously existed 🉐
      const allSongNamesFromEvent = getAllSongsFromNewEvent(newEvent)
      const existingSongNamesFromEvent = allSongNamesFromEvent.filter(x => !newSongs.includes(x))
      for (const existingSongName of existingSongNamesFromEvent) {
        const songId = await getIdFromExistingSongName(existingSongName)
        const response = await addSongEventBridge(songId, newEvent[0].id)
      }
      // filter out new ones
      // create sEBs for all those
      window.location.href = '/'
    } else {
      // If we're not on the last page, store our data and increase a step
      pagesState[page] = values;
      pagesState = pagesState; // Triggering update

      newSongs = await checkForNewSongs(pagesState[0].event)
      // if there aren't any new songs to add just submit the event as is and create a songEventBridge for each song
      if (newSongs.length < 1) {
        const newEvent = await addEvent(pagesState[0].event)

        // create songEventBridges 🉐 for all songs
        const existingSongNamesFromEvent = getAllSongsFromNewEvent(newEvent)
        for (const existingSongName of existingSongNamesFromEvent) {
          const songId = await getIdFromExistingSongName(existingSongName)
          const response = await addSongEventBridge(songId, newEvent[0].id)
        }
        window.location.href = '/'
      }

      page += 1;
    }
  }

  function onBack(values) {
    if (page === 0) return;
    pagesState[page] = values;
    pagesState = pagesState; // Triggering update
    page -= 1;
  }
</script>

<svelte:component this={pages[page]} {onSubmit} {onBack} initialValues={pagesState[page]} {newSongs} />