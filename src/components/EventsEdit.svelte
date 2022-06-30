<script>
	import { toggleBelongsToUser } from '../stores/eventStore.js';
	import { events } from '../stores/eventStore.js';
	import { loadEvents } from '../stores/eventStore.js';
	import { eventIdsBelongingToUser } from '../stores/eventStore.js';
	import { user } from '../stores/authStore.js';
	import { onMount } from 'svelte';
	import { eventLabel } from '../stores/eventStore.js';
	import { titleize } from '../helpers/titleize.js';

	const handleChecked = (event_id) => {
		toggleBelongsToUser(event_id, $user.id);
	};

	let shows = [];
	let userEventIds = [];

	onMount(async () => {
		await loadEvents();
		userEventIds = await eventIdsBelongingToUser($user.id);

		const checkboxes = document.querySelectorAll(['#event-checkbox']);
		checkboxes.forEach((checkbox) => {
			const eventId = parseInt(checkbox.dataset.eventId);
			if (userEventIds.includes(eventId)) {
				checkbox.checked = true;
			} else {
				checkbox.checked = false;
			}
		});
	});
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">My Shows</h1>
			<p class="mt-2 text-sm text-gray-700">All of the shows you've attended</p>
		</div>
	</div>
	<div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
		<table class="min-w-full divide-y divide-gray-300">
			<thead>
				<tr>
					<th
						scope="col"
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
					>
						Attended
					</th>
					<th
						scope="col"
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 inline-flex"
					>
						Date
					</th>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
						>Venue
					</th>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
						>City
					</th>
					<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>State</th
					>
				</tr>
			</thead>
			<tbody>
				{#if $events.length > 0}
					{#each $events as show}
						<tr>
							<td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
								<input
									class="mt-1 mr-1"
									id="event-checkbox"
									type="checkbox"
									bind:group={shows}
									on:click={handleChecked(show.id)}
									value={JSON.stringify(show)}
									data-event-id={show.id}
								/>
							</td>

							<td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
								<div class="font-medium text-gray-900">{show.date.replaceAll('-', '.')}</div>
								<div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
									<span>{titleize(show.venue)}</span>
								</div>
							</td>

							<td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
								>{titleize(show.venue)}</td
							>

							<td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
								>{titleize(show.city)}</td
							>

							<td class="px-3 py-3.5 text-sm text-gray-500">
								<div class="lg:block hidden">
									{show.state.toUpperCase()}
								</div>
								<div class="md:block lg:hidden">
									{titleize(show.city)} · {show.state.toUpperCase()}
								</div>
							</td>
						</tr>
					{/each}
				{:else}
					<p class="text-lg text-center text-gray-800 mt-4">
						Get started by selecting all of the shows you've attended 💃
					</p>
				{/if}
			</tbody>
		</table>
	</div>
</div>
