<script>
  import { checkForNewSongs, addEvent } from "../../stores/eventStore.js"
  import { addNewSongs } from "../../stores/songStore.js"
  import { addSongEventBridge } from "../../stores/songEventBridgeStore.js"
  import Page1 from '../../components/Page1.svelte';
  import Page2 from '../../components/Page2.svelte';

  const pages = [Page1, Page2];

  let page = 0;

  let pagesState = [];

  let newSongs = []

  async function onSubmit(values) {
    if (page === pages.length - 1) {
      // On our final page with POST our data somewhere
      pagesState[page] = values;
      pagesState = pagesState; // Triggering update

      const newEvent = await addEvent(pagesState[0].event)
      const newSongs = await addNewSongs(pagesState[1].song)
      console.log(newEvent)
      console.log(newSongs)
      window.location.href = '/'
    } else {
      // If we're not on the last page, store our data and increase a step
      pagesState[page] = values;
      pagesState = pagesState; // Triggering update

      newSongs = await checkForNewSongs(pagesState)
      // if there aren't any new songs to add just submit the event as is
      if (newSongs.length < 1) {
        await addEvent(pagesState[0].event)
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