<script>
	import { userEvents, eventLabel, loadUserEvents } from '../stores/eventStore.js';
	import { user } from '../stores/authStore.js';
	import { onMount } from 'svelte';
	import { titleize } from '../helpers/titleize.js';

	onMount(async () => {
		await loadUserEvents($user.id);
	});
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">My Shows</h1>
			<p class="mt-2 text-sm text-gray-700">All of the shows you've attended</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<a href="/events/edit">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
					>Update My Shows</button
				>
			</a>
		</div>
	</div>
	<div class="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg">
		<table class="min-w-full divide-y divide-gray-300">
			<thead>
				<tr>
					<th
						scope="col"
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 inline-flex"
						>Date
						<!-- Active: "bg-gray-200 text-gray-900 group-hover:bg-gray-300", Not Active: "invisible text-gray-400 group-hover:visible group-focus:visible" -->
						<!-- <span class="ml-7 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300"> -->
						<!-- Heroicon name: solid/chevron-down -->
						<!-- <svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</span> -->
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
				{#if $userEvents.length > 0}
					{#each $userEvents as userEvent}
						<tr>
							<td class="relative py-4 pl-4 sm:pl-6 pr-3 text-sm">
								<div class="font-medium text-gray-900">{userEvent.date.replaceAll('-', '.')}</div>
								<div class="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
									<span>{titleize(userEvent.venue)}</span>
								</div>
							</td>

							<td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
								>{titleize(userEvent.venue)}</td
							>

							<td class="hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
								>{titleize(userEvent.city)}</td
							>

							<td class="px-3 py-3.5 text-sm text-gray-500">
								<div class="lg:block hidden">
									{userEvent.state.toUpperCase()}
								</div>
								<div class="md:block lg:hidden">
									{titleize(userEvent.city)} · {userEvent.state.toUpperCase()}
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
