<script>
	import { createForm } from 'felte';
	import { loadAlbums, albums } from '../stores/albumStore.js';
	import { onMount } from 'svelte';

	export let initialValues;
	export let onSubmit;
	export let onBack;
	export let newSongs;

	const { form, data } = createForm({ onSubmit, initialValues });

	onMount(async () => {
		await loadAlbums();
	});
</script>

<form use:form>
	<h1>New Songs</h1>
	<p>make sure that each new song is correct before submitting</p>

	{#each newSongs as song, i}
		<div class="flex align-vertical">
			<label for="name">Doble check the name</label>
			<input type="text" name="song.{i}.name" value={song} placeholder={song} />
			<label for="cover">Is this a cover?</label>
			<input type="checkbox" name="song.{i}.cover" />
			<label for="album">What album is it on?</label>
			<select name="song.{i}.album_id">
				{#each $albums as album}
					<option value={album.id}>{album.name}</option>
					<option value={null}>Not on an album</option>
				{/each}
			</select>
		</div>
	{/each}

	<button type="button" on:click={() => onBack($data)}>Previous page</button>
	<button type="submit">Submit</button>
</form>
