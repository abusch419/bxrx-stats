<script>
  import { onMount } from 'svelte';
  import { loadUserSongs, userSongs, songLabels, timesEachSongWasSeen } from '../stores/songStore.js'
  import { user } from '../stores/authStore.js'
  import Doughnut from "svelte-chartjs/src/Doughnut.svelte"
  import { maximallyDifferentHexCodes } from '../helpers/maximallyDifferentHexCodes.js'

  let data
  let options

  onMount(async () => {
    await loadUserSongs($user.id)

    data = {
      labels: [...$songLabels],
      datasets: [
        {
          data: [...$timesEachSongWasSeen],
          backgroundColor: maximallyDifferentHexCodes,
          hoverBackgroundColor: maximallyDifferentHexCodes
        }
      ]
    }

    options = {
      responsive: true
    }
  })
</script>

<div class="container mx-auto my-6 max-w-lg">
  {#if $userSongs.length > 0}
  <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">My songs ({$userSongs.length})</h1>
  <ul class="text-center mt-5">
    {#each $userSongs as userSong}
    <li class="mt-1" style="text-transform: capitalize;">{userSong.name}
      <span>{userSong.timesSeen}</span>
    </li>
    {/each}
  </ul>
  {:else}
  <p class="text-lg text-center text-gray-800 mt-4">
    Get started by selecting all of the shows you've attended 💃
  </p>
  {/if}
</div>


<div class="max-w-xl max-h-md ml-auto mr-auto">
  <Doughnut {data} {options} />
</div>